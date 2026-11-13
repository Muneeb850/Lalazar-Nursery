/* Contact page: topic pills, live counter, copy buttons, validation, hand-off to WhatsApp / email (no server needed) */
(() => {
  const { $, $$ } = LZ;
  const f = $('#cform');

  /* pre-select topic from ?topic=... (links from the Services page) */
  const topic = new URLSearchParams(location.search).get('topic');
  if (topic) {
    const want = topic.toLowerCase().split(' ')[0];
    const hit = $$('.topics input').find(r => r.value.toLowerCase().includes(want));
    if (hit) hit.checked = true;
  }

  /* character counter */
  const m = $('#m'), cnt = $('#cnt');
  const count = () => { cnt.textContent = m.value.length + ' / ' + m.maxLength; };
  m.addEventListener('input', count); count();

  /* clear a field's error as soon as the user fixes it */
  $$('.ff input, .ff textarea', f).forEach(i => i.addEventListener('input', () => { const e = i.parentElement.querySelector('.err'); if (e) e.textContent = ''; i.parentElement.classList.remove('bad'); }));

  /* copy buttons */
  $$('.copy').forEach(b => b.addEventListener('click', async () => {
    const text = b.dataset.copy;
    try { await navigator.clipboard.writeText(text); }
    catch (e) { const t = document.createElement('textarea'); t.value = text; document.body.append(t); t.select(); try { document.execCommand('copy'); } catch (_) {} t.remove(); }
    b.textContent = 'Copied ✓'; b.classList.add('done');
    if (LZ.say) LZ.say(b.dataset.what + ' copied');
    setTimeout(() => { b.textContent = 'Copy'; b.classList.remove('done'); }, 1800);
  }));

  f.addEventListener('submit', e => {
    e.preventDefault(); let ok = true, first = null;
    $$('[required]', f).forEach(i => {
      const v = i.value.trim(); let msg = '';
      if (!v) msg = 'Please fill this in'; else if (i.type === 'email' && !/^\S+@\S+\.\S+$/.test(v)) msg = 'Enter a valid email address';
      i.parentElement.querySelector('.err').textContent = msg;
      i.parentElement.classList.toggle('bad', !!msg);
      if (msg) { ok = false; first = first || i; }
    });
    if (!ok) { first.focus(); return; }
    const d = Object.fromEntries(new FormData(f));
    const all = LZ.store.get('lz-messages', []); all.push({ ...d, at: new Date().toISOString() }); LZ.store.set('lz-messages', all);
    const text = 'Assalam o Alaikum! I am ' + d.name + ' (' + d.email + ').\nInterested in: ' + d.topic + '\n\n' + d.message;
    $('#wa-send').href = LZ.waLink(text);
    $('#mail-send').href = 'mailto:' + LZ.BIZ.email + '?subject=' + encodeURIComponent('Website enquiry: ' + d.topic) + '&body=' + encodeURIComponent(text);
    f.reset(); count();
    const s = $('#ok'); s.classList.add('show');
    if (typeof gsap !== 'undefined') gsap.from(s, { y: 24, opacity: 0, duration: .8, ease: 'expo.out' });
    s.scrollIntoView({ block: 'center', behavior: 'smooth' });
  });
})();
