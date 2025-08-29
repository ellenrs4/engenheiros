// ============ NAV MOBILE ============
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('.nav');
navToggle?.addEventListener('click', () => nav.classList.toggle('open'));

// ============ MODAL LOGIN ============
const loginModal = document.getElementById('loginModal');
const openLogin = document.getElementById('openLogin');
const floatingCta = document.getElementById('floatingCta');
const ctaComecar = document.getElementById('ctaComecar');
const btnFecharLogin = document.getElementById('btnFecharLogin');
const loginForm = document.getElementById('loginForm');

function openLoginModal(){
  loginModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLoginModal(){
  loginModal.classList.remove('open');
  document.body.style.overflow = '';
}

openLogin?.addEventListener('click', openLoginModal);
floatingCta?.addEventListener('click', openLoginModal);
ctaComecar?.addEventListener('click', openLoginModal);
btnFecharLogin?.addEventListener('click', closeLoginModal);
loginModal?.addEventListener('click', (e) => { if (e.target === loginModal) closeLoginModal(); });

// ============ AUTH (LocalStorage DEMO) ============
function saveUsers(arr){ localStorage.setItem('usuarios', JSON.stringify(arr)); }
function loadUsers(){ return JSON.parse(localStorage.getItem('usuarios') || '[]'); }
function setSession(user){ localStorage.setItem('sessionUser', JSON.stringify(user)); }
function clearSession(){ localStorage.removeItem('sessionUser'); }

loginForm?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();
  const tipo = document.getElementById('tipo').value;
  const novo = document.getElementById('novoUsuario').checked;

  let users = loadUsers();

  if (novo) {
    if (users.some(u=>u.email===email)) { alert('Este e-mail já está cadastrado.'); return; }
    users.push({ email, senha, tipo });
    saveUsers(users);
    alert('Cadastro realizado com sucesso!');
  } else {
    const user = users.find(u=>u.email===email && u.senha===senha && u.tipo===tipo);
    if (!user) { alert('Credenciais inválidas.'); return; }
  }

  // Login efetivo
  const current = users.find(u=>u.email===email) || { email, senha, tipo };
  setSession(current);
  closeLoginModal();


  const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
let numStars = 150;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.alpha = Math.random();
    this.speed = 0.2 + Math.random() * 0.3;
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.reset();
      this.y = 0;
    }
    this.alpha += (Math.random() - 0.5) * 0.05;
    this.alpha = Math.max(0.2, Math.min(1, this.alpha));
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.fill();
  }
}

function initStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animate);
}

initStars();
animate();

  // Redireciona por perfil
  if (current.tipo === 'Aluno') window.location.href = 'dashboard-aluno.html';
  else if (current.tipo === 'Professor') window.location.href = 'dashboard-professor.html';
  else window.location.href = 'dashboard-pai.html';
});

// ===== Hero Stars Canvas =====
(function () {
  const canvas = document.getElementById('heroStars');
  if (!canvas) return; // se não existir, sai sem erro

  const ctx = canvas.getContext('2d', { alpha: true });
  const DPR = window.devicePixelRatio || 1;

  let cssW = 0, cssH = 0;
  let stars = [];

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    cssW = Math.max(0, rect.width);
    cssH = Math.max(0, rect.height);
    if (cssW === 0 || cssH === 0) return;

    canvas.width = Math.round(cssW * DPR);
    canvas.height = Math.round(cssH * DPR);
    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';

    // escala de desenho para lidar com devicePixelRatio
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    initStars();
  }

  function createStar() {
    return {
      x: Math.random() * cssW,
      y: Math.random() * cssH,
      r: (Math.random() * 1.6) + 0.3,           // radius base (px)
      alpha: Math.random() * 0.8 + 0.15,        // brilho inicial
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      driftX: (Math.random() - 0.5) * 0.2,      // leve movimento horizontal
      driftY: (Math.random() - 0.5) * 0.25,     // leve movimento vertical
      hueType: Math.random() < 0.09 ? 'gold' : 'white' // alguns dourados
    };
  }

  function initStars() {
    stars = [];
    // densidade por área: ajuste para mais/menos estrelas
    const density = 0.00012; // estrelas por pixel (ajuste se quiser)
    const count = Math.max(28, Math.round(cssW * cssH * density));
    for (let i = 0; i < count; i++) stars.push(createStar());
  }

  let lastTs = 0;
  function draw(ts) {
    if (!cssW || !cssH) {
      requestAnimationFrame(draw);
      return;
    }

    const dt = lastTs ? (ts - lastTs) / 1000 : 0;
    lastTs = ts;

    // limpa (em coordenadas CSS, pois usamos setTransform para DPR)
    ctx.clearRect(0, 0, cssW, cssH);

    for (let s of stars) {
      // movimento lento
      s.x += s.driftX * (dt * 60);
      s.y += s.driftY * (dt * 60);

      // twinkle (pulsação)
      const tw = Math.sin(ts * s.twinkleSpeed + s.x * 0.01) * 0.5 + 0.5;
      const alpha = Math.max(0.06, Math.min(1, s.alpha * (0.6 + 0.8 * tw)));

      // wrap quando sai da tela
      if (s.x < -10) s.x = cssW + 10;
      if (s.x > cssW + 10) s.x = -10;
      if (s.y < -10) s.y = cssH + 10;
      if (s.y > cssH + 10) s.y = -10;

      // cria gradiente suave para cada estrela
      const radius = s.r;
      const gx = s.x;
      const gy = s.y;
      const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius * 6);
      if (s.hueType === 'gold') {
        g.addColorStop(0, `rgba(242,178,58,${alpha})`);
        g.addColorStop(0.4, `rgba(242,178,58,${alpha * 0.5})`);
      } else {
        g.addColorStop(0, `rgba(255,255,255,${alpha})`);
        g.addColorStop(0.4, `rgba(255,255,255,${alpha * 0.35})`);
      }
      g.addColorStop(1, 'rgba(255,255,255,0)');

      ctx.beginPath();
      ctx.fillStyle = g;
      ctx.arc(gx, gy, Math.max(1, radius * 3), 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  

  // Responsivo: inicializa
  window.addEventListener('resize', () => {
    // debounce pequeno
    clearTimeout(window._heroStarsResize);
    window._heroStarsResize = setTimeout(resizeCanvas, 80);
  });

  // inicia quando DOM pronto (caso script carregue antes)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      resizeCanvas();
      requestAnimationFrame(draw);
    });
  } else {
    resizeCanvas();
    requestAnimationFrame(draw);
  }
})();

// === Stars per section - injeta canvas em cada section/header/footer ===
(function () {
  const targets = document.querySelectorAll('section, header.site-header, footer.site-footer');

  function createCanvasFor(el) {
    if (el.querySelector('.section-stars')) return; // evita duplicar

    const canvas = document.createElement('canvas');
    canvas.className = 'section-stars';
    canvas.setAttribute('aria-hidden', 'true');
    // inserir primeiro para ficar abaixo do conteúdo (conteúdo tem z-index maior)
    el.prepend(canvas);

    const ctx = canvas.getContext('2d');

    // responsivo: ajusta tamanho do canvas para a caixa da section
    function resizeCanvas() {
      const rect = el.getBoundingClientRect();
      // use devicePixelRatio para ficar nítido em telas hiDPI
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // corrige escala de desenho
    }

    // cria estrela com propriedades básicas
    function makeStar(w, h) {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.9 + 0.1,
        speed: Math.random() * 0.6 + 0.05,
        drift: (Math.random() - 0.5) * 0.15
      };
    }

    let stars = [];

    function buildStars() {
      // densidade: quanto menor o divisor, mais estrelas
      const DENSITY_DIVISOR = 12000; // ajuste se quiser mais/menos
      const w = canvas.width;
      const h = canvas.height;
      const count = Math.max(8, Math.round((w * h) / DENSITY_DIVISOR));
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push(makeStar(w, h));
      }
    }

    let lastTime = performance.now();
    function animate(now) {
      const dt = now - lastTime;
      lastTime = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const viewW = canvas.width / (window.devicePixelRatio || 1);
      const viewH = canvas.height / (window.devicePixelRatio || 1);

      for (let s of stars) {
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // movimentação suave
        s.y += s.speed * (dt * 0.06);
        s.x += s.drift * (dt * 0.06);
        // loop
        if (s.y > viewH + 10) s.y = -10;
        if (s.x > viewW + 10) s.x = -10;
        if (s.x < -10) s.x = viewW + 10;
      }

      requestAnimationFrame(animate);
    }

    // observers / resize handling
    resizeCanvas();
    buildStars();
    requestAnimationFrame(animate);

    // atualiza quando a section muda de tamanho
    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => {
        resizeCanvas();
        buildStars();
      });
      ro.observe(el);
    } else {
      // fallback
      window.addEventListener('resize', () => {
        resizeCanvas();
        buildStars();
      });
    }
  }

  // cria para todos os alvos
  targets.forEach(createCanvasFor);

  // se for conteúdo dinâmico que adiciona sections depois, observe body para novos nodes
  if (window.MutationObserver) {
    const mo = new MutationObserver(muts => {
      muts.forEach(m => {
        m.addedNodes.forEach(node => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches && (node.matches('section') || node.matches('header.site-header') || node.matches('footer.site-footer'))) {
            createCanvasFor(node);
          }
          // se inseriram container com sections internas, cria também
          node.querySelectorAll && node.querySelectorAll('section, header.site-header, footer.site-footer').forEach(createCanvasFor);
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }
})();

