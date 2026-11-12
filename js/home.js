/* Home page: featured collection + horizontal scroll */
(() => {
  const { $, $$, reduce } = LZ;
  const card = p => `<article class="card tilt" data-cursor="View" data-open="${p.id}">
    <span class="badge">${p.cat}</span>
    <div class="card-img"><img src="${LZ.U(p.img, 700)}" srcset="${LZ.SRCSET(p.img)}" sizes="(max-width:800px) 68vw, 29vw" alt="${p.name}" width="700" height="875" loading="eager" decoding="async"></div>
    <button class="add" data-add="${p.id}" aria-label="Add ${p.name} to cart">+</button>
    <div class="card-b"><div><h3>${p.name}</h3><p>${p.latin}</p></div><div class="price">${LZ.fmt(p.price)}</div></div></article>`;
  const featured = ['monstera', 'fiddle', 'calathea', 'bonsai', 'echeveria', 'peace', 'topiary'].map(LZ.byId);
  $('#feat-track').innerHTML = featured.map(card).join('') +
    `<a class="card" href="plants.html" data-cursor="Shop" style="display:grid;place-items:center;aspect-ratio:4/5;border-radius:20px;background:var(--lime);color:var(--ink);align-self:start"><span class="h3" style="text-align:center">See the<br><em style="color:var(--moss)">full collection</em> →</span></a>`;

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  const mm = gsap.matchMedia();
  mm.add('(min-width:1px)', () => {
    if (reduce) return;
    const track = $('#feat-track'), sec = $('.hs');
    const dist = () => Math.max(0, track.scrollWidth - innerWidth);
    gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: () => '+=' + dist(), scrub: .8, pin: true, anticipatePin: 1, invalidateOnRefresh: true } });
  });
  document.addEventListener('lz:ready', () => {
    LZ.bindFX($('#feat-track')); LZ.scrollInit($('#feat-track'));
  });
})();

/* stacked process cards: previous card scales back as the next slides over it */
(() => {
  if (LZ.reduce || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  const steps = LZ.$$('.step');
  steps.forEach((st, i) => {
    const next = steps[i + 1]; if (!next) return;
    gsap.to(st, { scale: .92, opacity: .55, ease: 'none', scrollTrigger: { trigger: next, start: 'top 85%', end: 'top 25%', scrub: true } });
  });
})();

/* touch: category panels expand as they reach the middle of the screen */
(() => {
  if (!matchMedia('(hover:none)').matches || LZ.reduce || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('on', e.isIntersecting)), { rootMargin: '-38% 0px -38% 0px' });
  LZ.$$('.cat').forEach(c => io.observe(c));
})();

/* hero background parallax */
(() => {
  const bg = document.querySelector('.hero-bg');
  if (!bg || LZ.reduce || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.to(bg, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
})();
