/* Services: cursor-following image preview on hover */
(() => {
  const { $, $$, fine, reduce } = LZ;
  if (!fine && !reduce && 'IntersectionObserver' in window) { // touch: highlight the row in the middle of the screen
    const io = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('on', e.isIntersecting)), { rootMargin: '-40% 0px -40% 0px' });
    $$('.srow').forEach(r => io.observe(r));
  }
  if (!fine || reduce || typeof gsap === 'undefined') return;
  const peek = $('.peek'), img = $('img', peek);
  const x = gsap.quickTo(peek, 'x', { duration: .6, ease: 'power3' }), y = gsap.quickTo(peek, 'y', { duration: .6, ease: 'power3' });
  const rot = gsap.quickTo(peek, 'rotation', { duration: .6, ease: 'power3' });
  let last = 0;
  addEventListener('mousemove', e => { x(e.clientX + 30); y(e.clientY - 150); rot(Math.max(-8, Math.min(8, (e.clientX - last) * .3))); last = e.clientX; }, { passive: true });
  $$('.srow').forEach(r => {
    r.addEventListener('mouseenter', () => { img.src = LZ.U(r.dataset.peek, 500); gsap.to(peek, { opacity: 1, scale: 1, duration: .5, ease: 'expo.out' }); });
    r.addEventListener('mouseleave', () => gsap.to(peek, { opacity: 0, scale: .6, duration: .4, ease: 'power2.in' }));
  });
})();
