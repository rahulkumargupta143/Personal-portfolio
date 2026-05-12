// CUSTOM CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function animCursor() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top = my - 6 + 'px';
  ring.style.left = rx - 18 + 'px';
  ring.style.top = ry - 18 + 'px';
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => { ring.style.transform = 'scale(1.6)'; ring.style.opacity = '1'; });
  el.addEventListener('mouseleave', () => { ring.style.transform = 'scale(1)'; ring.style.opacity = '0.5'; });
});

// SCROLL PROGRESS
const scrollInd = document.getElementById('scrollIndicator');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  scrollInd.style.width = pct + '%';
});

// STAR CANVAS
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', resize);
for (let i = 0; i < 180; i++) {
  stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.2 + 0.2, a: Math.random(), da: (Math.random() - 0.5) * 0.005, dy: Math.random() * 0.08 + 0.02 });
}
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,240,255,${s.a})`; ctx.fill();
    s.a += s.da; if (s.a < 0.1 || s.a > 0.9) s.da *= -1;
    s.y -= s.dy; if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width; }
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// FLOATING PARTICLES
const pw = document.getElementById('particles');
for (let i = 0; i < 20; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');
  p.style.left = Math.random() * 100 + 'vw';
  p.style.animationDuration = (8 + Math.random() * 12) + 's';
  p.style.animationDelay = (Math.random() * 10) + 's';
  p.style.width = p.style.height = (1 + Math.random() * 2) + 'px';
  pw.appendChild(p);
}

// SCROLL REVEAL
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(r => obs.observe(r));

// COUNTER ANIMATION
function animateCounter(el, target) {
  let current = 0;
  const step = Math.ceil(target / 40);
  const interval = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(interval); }
    el.textContent = current + '+';
  }, 40);
}
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('[data-target]').forEach(el => animateCounter(el, parseInt(el.dataset.target)));
      counterObs.disconnect();
    }
  });
}, { threshold: 0.5 });
counterObs.observe(document.querySelector('.stats-strip'));