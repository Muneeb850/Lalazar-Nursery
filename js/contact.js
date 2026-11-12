/* Contact form: validation + local save (swap for a real endpoint/EmailJS/Formspree when ready) */
(() => {
  const { $, $$ } = LZ;
  const f = $('#cform');
  const topic = new URLSearchParams(location.search).get('topic');
  if (topic) { const s = $('#t'); [...s.options].forEach(o => { if (o.text.toLowerCase().includes(topic.toLowerCase().split(' ')[0])) s.value = o.value; }); }
  f.addEventListener('submit', e => {
    e.preventDefault(); let ok = true;
    $$('[required]', f).forEach(i => {
      const v = i.value.trim(); let msg = '';
      if (!v) msg = 'Required'; else if (i.type === 'email' && !/^\S+@\S+\.\S+$/.test(v)) msg = 'Enter a valid email';
      i.parentElement.querySelector('.err').textContent = msg; if (msg) ok = false;
    });
    if (!ok) return;
    const all = LZ.store.get('lz-messages', []);
    all.push({ ...Object.fromEntries(new FormData(f)), at: new Date().toISOString() }); LZ.store.set('lz-messages', all);
    f.reset(); const s = $('#ok'); s.classList.add('show');
    if (typeof gsap !== 'undefined') gsap.from(s, { y: 24, opacity: 0, duration: .8, ease: 'expo.out' });
  });
})();
