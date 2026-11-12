/* Plants page: filter / search / sort / render */
(() => {
  const { $, $$ } = LZ;
  const cats = ['All', ...new Set(LZ.PRODUCTS.map(p => p.cat))];
  const params = new URLSearchParams(location.search);
  let cat = cats.includes(params.get('cat')) ? params.get('cat') : 'All';
  let q = '', sort = 'feat';

  const chips = $('#chips');
  chips.innerHTML = cats.map(c => `<button class="chip ${c === cat ? 'on' : ''}" data-c="${c}" aria-pressed="${c === cat}">${c}</button>`).join('');

  const card = p => `<article class="card tilt" data-cursor="View" data-open="${p.id}">
    <span class="badge">${p.cat}${p.pet ? ' · Pet-safe' : ''}</span>
    <div class="card-img"><img src="${LZ.U(p.img, 600)}" srcset="${LZ.SRCSET(p.img)}" sizes="(max-width:760px) 50vw, (max-width:1100px) 33vw, 25vw" alt="${p.name}" width="600" height="750" loading="lazy" decoding="async"></div>
    <button class="add" data-add="${p.id}" aria-label="Add ${p.name} to cart">+</button>
    <div class="card-b"><div><h3>${p.name}</h3><p>${p.latin}</p></div><div class="price">${LZ.fmt(p.price)}</div></div></article>`;

  const grid = $('#grid');
  const render = (animate = true) => {
    let list = LZ.PRODUCTS.filter(p => (cat === 'All' || p.cat === cat) && (p.name + ' ' + p.latin + ' ' + p.cat).toLowerCase().includes(q));
    if (sort === 'lo') list.sort((a, b) => a.price - b.price);
    if (sort === 'hi') list.sort((a, b) => b.price - a.price);
    if (sort === 'az') list.sort((a, b) => a.name.localeCompare(b.name));
    $('#count').textContent = `${list.length} plant${list.length === 1 ? '' : 's'}`;
    grid.innerHTML = list.length ? list.map(card).join('') : '<p class="empty">No plants match — try another search.</p>';
    LZ.bindFX(grid);
    if (typeof gsap !== 'undefined' && !LZ.reduce && animate) {
      gsap.from($$('.card', grid), { opacity: 0, y: 50, duration: .9, ease: 'expo.out', stagger: .05, clearProps: 'opacity,transform' });
    }
    if (typeof ScrollTrigger !== 'undefined') { LZ.scrollInit(grid); ScrollTrigger.refresh(); }
  };

  chips.addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    cat = b.dataset.c; $$('.chip', chips).forEach(c => { const on = c === b; c.classList.toggle('on', on); c.setAttribute('aria-pressed', on); });
    render();
  });
  let t; $('#q').addEventListener('input', e => { clearTimeout(t); t = setTimeout(() => { q = e.target.value.trim().toLowerCase(); render(false); }, 160); });
  $('#sort').addEventListener('change', e => { sort = e.target.value; render(); });
  render(false);
})();
