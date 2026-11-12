/* Home page: featured collection + horizontal scroll */
(() => {
  const { $, $$, reduce } = LZ;
  const card = p => `<article class="card tilt" data-cursor="View" data-open="${p.id}">
    <span class="badge">${p.cat}</span>
    <div class="card-img"><img src="${LZ.U(p.img, 700)}" srcset="${LZ.SRCSET(p.img)}" sizes="(max-width:899px) 78vw, 29vw" alt="${p.name}" width="700" height="875" loading="lazy" decoding="async"></div>
    <button class="add" data-add="${p.id}" aria-label="Add ${p.name} to cart">+</button>
    <div class="card-b"><div><h3>${p.name}</h3><p>${p.latin}</p></div><div class="price">${LZ.fmt(p.price)}</div></div></article>`;
  const featured = ['monstera', 'fiddle', 'calathea', 'bonsai', 'echeveria', 'peace', 'topiary'].map(LZ.byId);
  $('#feat-track').innerHTML = featured.map(card).join('') +
    `<a class="card" href="plants.html" data-cursor="Shop" style="display:grid;place-items:center;aspect-ratio:4/5;border-radius:20px;background:var(--lime);color:var(--ink);align-self:start"><span class="h3" style="text-align:center">See the<br><em style="color:var(--moss)">full collection</em> →</span></a>`;

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  const mm = gsap.matchMedia();
  mm.add('(min-width:900px)', () => {
    if (reduce) return;
    const track = $('#feat-track'), sec = $('.hs');
    const dist = () => track.scrollWidth - innerWidth;
    gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: () => '+=' + dist(), scrub: .8, pin: true, anticipatePin: 1, invalidateOnRefresh: true } });
  });
  document.addEventListener('lz:ready', () => {
    LZ.bindFX($('#feat-track')); LZ.scrollInit($('#feat-track'));
  });
})();

/* hero background parallax */
(() => {
  const bg = document.querySelector('.hero-bg');
  if (!bg || LZ.reduce || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.to(bg, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
})();
