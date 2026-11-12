/* Care page: plant finder + accordion */
(() => {
  const { $, $$, reduce } = LZ;
  const sel = { light: 'any', pet: 'any', care: 'any' };
  const careRank = { easy: 0, moderate: 1, expert: 2 };
  const render = () => {
    const list = LZ.PRODUCTS.filter(p => p.cat !== 'Supplies' &&
      (sel.light === 'any' || p.light === sel.light || (sel.light === 'medium' && p.light === 'low')) &&
      (sel.pet === 'any' || p.pet) &&
      (sel.care === 'any' || careRank[p.care] <= careRank[sel.care]));
    $('#rcount').textContent = `${list.length} match${list.length === 1 ? '' : 'es'} for your space`;
    $('#results').innerHTML = list.length ? list.map(p => `<div class="res" data-open="${p.id}" data-cursor="View" role="button" tabindex="0">
      <img src="${LZ.U(p.img, 160)}" alt="" width="70" height="70" loading="lazy"><div><h4>${p.name}</h4><small>${p.light} light · ${p.water}</small></div></div>`).join('')
      : '<p class="muted" style="grid-column:1/-1">No exact matches — try loosening a filter.</p>';
    if (typeof gsap !== 'undefined' && !reduce) gsap.from('.res', { opacity: 0, y: 24, duration: .7, stagger: .04, ease: 'expo.out' });
  };
  $$('.opts').forEach(g => g.addEventListener('click', e => {
    const b = e.target.closest('.opt'); if (!b) return;
    $$('.opt', g).forEach(o => o.classList.toggle('on', o === b)); sel[g.dataset.key] = b.dataset.v; render();
  }));
  $('#results').addEventListener('keydown', e => { if (e.key === 'Enter') { const r = e.target.closest('.res'); r && LZ.openProduct(r.dataset.open); } });
  render();

  $$('.acc-i').forEach(item => {
    const q = $('.acc-q', item), a = $('.acc-a', item);
    q.addEventListener('click', () => {
      const open = !item.classList.contains('open');
      item.classList.toggle('open', open); q.setAttribute('aria-expanded', open);
      if (typeof gsap !== 'undefined' && !reduce) gsap.to(a, { height: open ? 'auto' : 0, duration: .7, ease: 'expo.out', onComplete: () => typeof ScrollTrigger !== 'undefined' && ScrollTrigger.refresh() });
      else a.style.height = open ? 'auto' : 0;
    });
  });
})();
