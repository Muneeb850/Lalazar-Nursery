/* Falling petals in the hero. Light 2D canvas: pauses off-screen / hidden tab, reacts to the cursor. */
(() => {
  const cv = document.getElementById('petals');
  if (!cv || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = cv.getContext('2d');
  if (!ctx) return;
  const small = innerWidth < 800;
  const dpr = Math.min(devicePixelRatio || 1, 1.5);
  const N = small ? 16 : 34;
  const cols = ['244,182,200', '243,239,228', '201,242,107', '232,122,90'];
  let W = 0, H = 0, mx = -999, my = -999, visible = true, raf = 0;

  const make = init => ({
    x: Math.random() * (W || innerWidth), y: init ? Math.random() * (H || innerHeight) : -24,
    s: 6 + Math.random() * 10, vy: .35 + Math.random() * .85, sw: Math.random() * 6.28, sws: .008 + Math.random() * .02,
    amp: .35 + Math.random() * .9, rot: Math.random() * 6.28, vr: (Math.random() - .5) * .03,
    c: cols[(Math.random() * cols.length) | 0], a: .3 + Math.random() * .5
  });
  let ps = [];
  const resize = () => {
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!ps.length) ps = Array.from({ length: N }, () => make(true));
  };
  resize(); addEventListener('resize', resize);
  addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; }, { passive: true });

  const draw = p => {
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = `rgba(${p.c},${p.a})`;
    const s = p.s; ctx.beginPath(); ctx.moveTo(0, -s);
    ctx.bezierCurveTo(s * .9, -s * .6, s * .7, s * .6, 0, s); ctx.bezierCurveTo(-s * .7, s * .6, -s * .9, -s * .6, 0, -s);
    ctx.fill(); ctx.restore();
  };
  const frame = () => {
    raf = 0; if (!visible || document.hidden) return;
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      p.sw += p.sws; p.x += Math.sin(p.sw) * p.amp; p.y += p.vy; p.rot += p.vr;
      const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;           // petals drift away from the cursor
      if (d2 < 16000) { const f = (1 - d2 / 16000) * 3; p.x += (dx / (Math.sqrt(d2) || 1)) * f; p.y += (dy / (Math.sqrt(d2) || 1)) * f; p.rot += .05; }
      if (p.y > H + 24 || p.x < -40 || p.x > W + 40) ps[i] = make(false);
      draw(p);
    }
    raf = requestAnimationFrame(frame);
  };
  const start = () => { if (!raf && visible) raf = requestAnimationFrame(frame); };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }, { threshold: 0 }).observe(cv);
  document.addEventListener('visibilitychange', start);
  start();
})();
