/* Home page: featured collection + horizontal scroll */
(() => {
  const { $, $$, reduce } = LZ;
  const card = p => `<article class="card tilt" data-cursor="View" data-open="${p.id}">
    <span class="badge">${p.cat}</span>
    <div class="card-img"><img src="${LZ.U(p.img, 700)}" srcset="${LZ.SRCSET(p.img)}" sizes="(max-width:800px) 68vw, 29vw" alt="${p.name}" width="700" height="875" loading="eager" decoding="async">
      <div class="card-chips" aria-hidden="true"><span>${p.light} light</span><span>${p.water}</span><span>${p.care}</span></div>
      <button class="add" data-add="${p.id}" aria-label="Add ${p.name} to cart">+</button></div>
    <div class="card-b"><div><h3>${p.name}</h3><p>${p.latin}</p></div><div class="price">${LZ.fmt(p.price)}</div></div></article>`;
  const featured = ['chrysanthemum', 'dahlia', 'gerbera', 'bougainvillea', 'adenium', 'fittonia', 'jade'].map(LZ.byId);
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

/* marquee that reacts to scroll speed and direction */
(() => {
  const rows = LZ.$$('.mrow'); if (!rows.length) return;
  if (LZ.reduce || typeof gsap === 'undefined') { rows.forEach(r => r.classList.add('static')); return; }
  const st = rows.map(r => ({ el: r.firstElementChild, dir: +r.dataset.dir, x: 0, w: 0 }));
  const measure = () => st.forEach(s => { s.w = s.el.scrollWidth / 2; }); measure(); addEventListener('resize', measure); addEventListener('load', measure);
  let v = 0, last = scrollY, visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { rootMargin: '200px' }).observe(rows[0].parentElement);
  gsap.ticker.add(() => {
    const y = scrollY, dv = y - last; last = y; v += (dv - v) * .12;
    if (!visible) return;
    const sk = Math.max(-14, Math.min(14, -v * .35));
    st.forEach(s => {
      s.x -= s.dir * (1.2 + v * .45);
      if (s.w) { if (s.x <= -s.w) s.x += s.w; if (s.x > 0) s.x -= s.w; }
      s.el.style.transform = 'translate3d(' + s.x + 'px,0,0) skewX(' + sk + 'deg)';
    });
  });
})();

/* iris reveal: the greenhouse photo grows out of a small circle as you scroll */
(() => {
  const s = LZ.$('.iris');
  if (!s || LZ.reduce || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  const img = LZ.$('.iris-img', s), im = LZ.$('img', img), txt = LZ.$('.iris-txt', s), hint = LZ.$('.iris-hint', s);
  gsap.timeline({ scrollTrigger: { trigger: s, start: 'top top', end: 'bottom bottom', scrub: .6 } })
    .fromTo(img, { clipPath: 'circle(7% at 50% 50%)' }, { clipPath: 'circle(78% at 50% 50%)', ease: 'power2.in', duration: 1 }, 0)
    .fromTo(im, { scale: 1.5 }, { scale: 1, ease: 'none', duration: 1 }, 0)
    .to(hint, { opacity: 0, duration: .2 }, 0)
    .fromTo(txt, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: .4 }, .7);
})();

/* "Pick your mood": choose a colour, the section recolours and shows matching plants */
(() => {
  const sec = LZ.$('#mood'), grid = LZ.$('#mood-grid'); if (!sec || !grid) return;
  const count = LZ.$('#mood-count');
  const tile = p => '<article class="mc" data-open="' + p.id + '" tabindex="0" role="button" aria-label="' + p.name + ', ' + LZ.fmt(p.price) + '">' +
    '<div class="im"><img src="' + LZ.U(p.img, 480) + '" alt="' + p.name + '" width="480" height="600" loading="lazy" decoding="async"></div>' +
    '<h3>' + p.name + '</h3><p>' + LZ.fmt(p.price) + '</p></article>';
  const show = (tone, animate) => {
    const list = (LZ.TONES[tone] || []).map(LZ.byId).filter(Boolean);
    sec.dataset.tone = tone;
    count.textContent = list.length + ' plants in ' + LZ.TONE_NAMES[tone];
    grid.innerHTML = list.map(tile).join('');
    if (animate && !LZ.reduce && typeof gsap !== 'undefined') gsap.from(LZ.$$('.mc', grid), { y: 50, opacity: 0, rotate: 5, scale: .92, duration: .9, ease: 'expo.out', stagger: .07, clearProps: 'all' });
  };
  LZ.$$('.sw', sec).forEach(b => b.addEventListener('click', () => {
    LZ.$$('.sw', sec).forEach(x => x.classList.toggle('on', x === b)); show(b.dataset.tone, true);
  }));
  grid.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { const c = e.target.closest('.mc'); if (c) { e.preventDefault(); LZ.openProduct(c.dataset.open); } } });
  show('blush', false);
})();

/* hero background parallax */
(() => {
  const bg = document.querySelector('.hero-bg');
  if (!bg || LZ.reduce || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.to(bg, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
})();
