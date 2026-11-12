/* Contact form: validate, save a copy locally, then hand the message to WhatsApp / email (no server needed) */
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
    const d = Object.fromEntries(new FormData(f));
    const all = LZ.store.get('lz-messages', []); all.push({ ...d, at: new Date().toISOString() }); LZ.store.set('lz-messages', all);
    const text = `Assalam o Alaikum! I am ${d.name} (${d.email}).\nInterested in: ${d.topic}\n\n${d.message}`;
    $('#wa-send').href = LZ.waLink(text);
    $('#mail-send').href = `mailto:${LZ.BIZ.email}?subject=${encodeURIComponent('Website enquiry: ' + d.topic)}&body=${encodeURIComponent(text)}`;
    f.reset(); const s = $('#ok'); s.classList.add('show');
    if (typeof gsap !== 'undefined') gsap.from(s, { y: 24, opacity: 0, duration: .8, ease: 'expo.out' });
    s.scrollIntoView({ block: 'center', behavior: 'smooth' });
  });
})();
