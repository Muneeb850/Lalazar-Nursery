/* Lalazar Nursery – shared engine: chrome, smooth scroll, motion, cart */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  /* always start pages from the top (also when coming back) */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (!location.hash) scrollTo(0, 0);
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const hasGSAP = typeof gsap !== 'undefined';
  if (hasGSAP && typeof ScrollTrigger !== 'undefined') { gsap.registerPlugin(ScrollTrigger); ScrollTrigger.config({ ignoreMobileResize: true }); }
  const store = {
    get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } },
    set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  LZ.$ = $; LZ.$$ = $$; LZ.reduce = reduce; LZ.fine = fine; LZ.store = store;

  const leafPath = 'M12 52C12 26 28 10 54 8c-1 26-14 44-38 46M12 52c10-14 20-24 32-34';
  const leafSvg = c => `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="${c || ''}"><path d="${leafPath}"/></svg>`;
  const pages = [['index.html', 'Home'], ['plants.html', 'Plants'], ['services.html', 'Services'], ['care.html', 'Care Guide'], ['about.html', 'About'], ['contact.html', 'Contact']];
  const here = (location.pathname.split('/').pop() || 'index.html');

  /* ---------- inject chrome ---------- */
  const firstVisit = !sessionStorage.getItem('lz-seen');
  document.body.insertAdjacentHTML('afterbegin', `
  ${firstVisit ? `<div class="pre" aria-hidden="true"><div class="pre-in">
    <img class="pre-logo" src="images/logo-mark-192.png" width="120" height="120" alt="">
    <div class="pre-name"><span>Lalazar Nursery</span></div>
    <div class="pre-bar"><i></i></div><div class="pre-n"><span>Growing</span><span class="pre-c">000</span></div></div></div>` : ''}
  <div class="wipe" aria-hidden="true"><span>Lalazar</span></div>
  <header class="hdr"><a class="logo" href="index.html" aria-label="Lalazar Nursery home"><i class="logo-gap"></i>Lalazar<small>Nursery</small></a>
    <nav class="nav" aria-label="Primary">${pages.map(p => `<a href="${p[0]}" class="${p[0] === here ? 'on' : ''}">${p[1]}</a>`).join('')}</nav>
    <div class="hdr-r"><button class="cart-btn" aria-label="Open cart">Cart <b class="cart-n">0</b></button><button class="burger" aria-label="Menu">Menu</button></div></header>
  <a class="logo-mark" href="index.html" aria-label="Lalazar Nursery home"><img src="images/logo-mark-192.png" width="48" height="48" alt="Lalazar Nursery logo"></a>
  <div class="mnav" aria-hidden="true"><nav>${pages.map(p => `<a href="${p[0]}">${p[1]}</a>`).join('')}</nav>
    <div class="muted"><a href="tel:${LZ.BIZ.tel}">${LZ.BIZ.phone}</a><br><a href="mailto:${LZ.BIZ.email}">${LZ.BIZ.email}</a></div></div>
  <div class="drawer-bg"></div>
  <aside class="drawer" aria-label="Shopping cart"><div class="drawer-h"><h3 class="h3">Your <em>cart</em></h3><button class="close-cart" aria-label="Close cart">Close ✕</button></div>
    <div class="drawer-b"></div><div class="drawer-f"><div class="tot"><span>Total</span><b class="cart-total">Rs 0</b></div><button class="btn checkout">Checkout <span class="arr">→</span></button></div></aside>
  <div class="progress" aria-hidden="true"><i></i></div>
  <button class="totop" aria-label="Back to top"><svg viewBox="0 0 48 48" aria-hidden="true"><circle class="tr-bg" cx="24" cy="24" r="21"/><circle class="tr-fg" cx="24" cy="24" r="21" pathLength="1"/></svg><span aria-hidden="true">&uarr;</span></button>
  <div class="toast" role="status"></div>
`);

  document.body.insertAdjacentHTML('beforeend', `
  <footer class="ftr"><div class="ftr-grid">
    <div><a href="index.html" aria-label="Lalazar Nursery home"><img class="ftr-logo" src="images/logo.webp" width="150" height="150" alt="Lalazar Nursery — nursery, cut flowers and landscaping services" loading="lazy"></a><p class="muted" style="margin-top:18px;max-width:34ch">Nursery, cut flowers &amp; landscaping services. Healthy plants, honest advice and a little everyday green.</p></div>
    <div><h4>Explore</h4><ul>${pages.map(p => `<li><a href="${p[0]}">${p[1]}</a></li>`).join('')}</ul></div>
    <div><h4>Visit &amp; contact</h4><ul class="muted"><li>${LZ.BIZ.addr[0]}</li><li>${LZ.BIZ.addr[1]}</li><li><a href="tel:${LZ.BIZ.tel}">${LZ.BIZ.phone}</a> · <a href="${LZ.waLink('Assalam o Alaikum, I would like to ask about your plants.')}" target="_blank" rel="noopener">WhatsApp</a></li><li><a href="mailto:${LZ.BIZ.email}">${LZ.BIZ.email}</a></li><li><a href="${LZ.BIZ.maps}" target="_blank" rel="noopener">Get directions ↗</a></li></ul></div>
    <div><h4>Garden notes</h4><p class="muted">Seasonal tips and new arrivals, once a month.</p>
      <form class="news"><input type="email" placeholder="Your email" aria-label="Email" required><button aria-label="Subscribe">Join →</button></form><p class="news-msg"></p></div>
  </div><div class="mega" aria-hidden="true">Lalazar</div>
  <div class="ftr-bot"><span>© ${new Date().getFullYear()} Lalazar Nursery</span><span>Rooted in nature. Built to stay fresh.</span></div></footer>
  <div class="modal" id="qv" role="dialog" aria-modal="true" aria-label="Plant details"></div>
  <div class="modal" id="co" role="dialog" aria-modal="true" aria-label="Checkout"></div>`);

  /* ---------- back button (inner pages) ---------- */
  // Keep our own trail of visited pages so "Back" always returns to the previous page.
  const cur = location.pathname.split('/').pop() + location.search || 'index.html';
  let trail = []; try { trail = JSON.parse(sessionStorage.getItem('lz-trail')) || []; } catch (e) {}
  if (!Array.isArray(trail)) trail = [];
  const at = trail.lastIndexOf(cur);
  trail = at >= 0 ? trail.slice(0, at + 1) : [...trail, cur];
  try { sessionStorage.setItem('lz-trail', JSON.stringify(trail)); } catch (e) {}
  const phero = $('.phero');
  if (phero) {
    const b = document.createElement('button');
    b.className = 'back-btn'; b.type = 'button'; b.setAttribute('aria-label', 'Go back');
    b.innerHTML = '<span aria-hidden="true">←</span> Back';
    b.addEventListener('click', () => {
      const prev = trail.length > 1 ? trail[trail.length - 2] : 'index.html';
      const a = document.createElement('a'); a.href = prev; a.hidden = true; document.body.append(a); a.click();
    });
    phero.prepend(b);
  }

  /* ---------- lazy image hydration ---------- */
  $$('img[data-img]').forEach(img => {
    const k = img.dataset.img;
    img.src = LZ.U(k, +img.dataset.w || 900);
    img.srcset = LZ.SRCSET(k);
    img.sizes = img.dataset.sizes || '100vw';
    img.decoding = 'async';
    if (!img.hasAttribute('loading') && !img.dataset.eager) img.loading = 'lazy';
    if (!img.alt) img.alt = '';
  });

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  if (typeof Lenis !== 'undefined' && !reduce) {
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true });
    if (hasGSAP) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else { const raf = t => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf); }
  }
  LZ.lenis = lenis;
  const lock = on => { on ? (lenis ? lenis.stop() : document.body.style.overflow = 'hidden') : (lenis ? lenis.start() : document.body.style.overflow = ''); };
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const t = $(a.getAttribute('href')); if (!t) return; e.preventDefault();
    lenis ? lenis.scrollTo(t, { offset: -40 }) : t.scrollIntoView({ behavior: 'smooth' });
  }));

  /* hide header on scroll down */
  const hdr = $('.hdr'); let lastY = 0;
  addEventListener('scroll', () => {
    const y = scrollY;
    if (!menuOpen) { const h = y > lastY && y > 300; hdr.classList.toggle('hide', h); document.body.classList.toggle('hdr-off', h); }
    lastY = y;
  }, { passive: true });

  /* ---------- scroll progress bar + back-to-top ring ---------- */
  const barEl = $('.progress i'), topBtn = $('.totop'), topFg = $('.tr-fg');
  let progTick = false;
  const prog = () => {
    progTick = false;
    const max = document.documentElement.scrollHeight - innerHeight, p = max > 0 ? Math.min(1, scrollY / max) : 0;
    barEl.style.transform = 'scaleX(' + p + ')'; topFg.style.strokeDashoffset = 1 - p;
    topBtn.classList.toggle('on', scrollY > 700);
  };
  addEventListener('scroll', () => { if (!progTick) { progTick = true; requestAnimationFrame(prog); } }, { passive: true });
  addEventListener('resize', prog); prog();
  topBtn.addEventListener('click', () => { lenis ? lenis.scrollTo(0, { duration: 1.6 }) : scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ---------- mobile menu ---------- */
  let menuOpen = false;
  const mnav = $('.mnav'), burger = $('.burger');
  burger.addEventListener('click', () => {
    menuOpen = !menuOpen; burger.textContent = menuOpen ? 'Close' : 'Menu'; lock(menuOpen);
    hdr.classList.remove('hide');
    if (hasGSAP) {
      if (menuOpen) { gsap.set(mnav, { visibility: 'visible' }); gsap.to(mnav, { clipPath: 'inset(0 0 0% 0)', duration: .8, ease: 'expo.out' }); gsap.from('.mnav a', { y: 60, opacity: 0, stagger: .06, duration: .9, ease: 'expo.out', delay: .15 }); }
      else gsap.to(mnav, { clipPath: 'inset(0 0 100% 0)', duration: .6, ease: 'expo.inOut', onComplete: () => gsap.set(mnav, { visibility: 'hidden' }) });
    } else { mnav.style.visibility = menuOpen ? 'visible' : 'hidden'; mnav.style.clipPath = 'none'; }
  });

  /* ---------- page transitions ---------- */
  const wipe = $('.wipe');
  const dot = (x, y) => `circle(0px at ${x}px ${y}px)`, full = (x, y) => `circle(150vmax at ${x}px ${y}px)`;
  document.addEventListener('click', e => {
    const a = e.target.closest('a'); if (!a || e.defaultPrevented) return;
    const h = a.getAttribute('href');
    if (!h || h.startsWith('#') || h.startsWith('mailto:') || h.startsWith('tel:') || a.target === '_blank' || e.metaKey || e.ctrlKey || a.origin !== location.origin) return;
    if (a.pathname === location.pathname && !a.hash) return;
    e.preventDefault();
    if (!hasGSAP || reduce) { location.href = a.href; return; }
    // iris transition: a circle of colour grows from the exact spot that was clicked
    let x = e.clientX, y = e.clientY;
    if (!x && !y) { const r = a.getBoundingClientRect(); x = r.left + r.width / 2; y = r.top + r.height / 2; }
    sessionStorage.setItem('lz-trans', Math.round(x) + ',' + Math.round(y));
    gsap.fromTo(wipe, { clipPath: dot(x, y) }, { clipPath: full(x, y), duration: .85, ease: 'power3.inOut' });
    gsap.to('.wipe span', { opacity: 1, duration: .4, delay: .35 });
    setTimeout(() => { location.href = a.href; }, 820);
  });
  addEventListener('pageshow', e => { if (e.persisted) { if (hasGSAP) { gsap.set(wipe, { clipPath: dot(innerWidth / 2, innerHeight / 2) }); gsap.set('.wipe span', { opacity: 0 }); } lenis ? lenis.scrollTo(0, { immediate: true, force: true }) : scrollTo(0, 0); } });
  const transSaved = sessionStorage.getItem('lz-trans');
  const arrivedViaWipe = !!transSaved;
  const [trX, trY] = (transSaved || '').split(',').map(Number);
  sessionStorage.removeItem('lz-trans');
  if (hasGSAP) gsap.set(wipe, { clipPath: arrivedViaWipe && !firstVisit ? full(trX || innerWidth / 2, trY || innerHeight / 2) : dot(innerWidth / 2, innerHeight / 2) });

  /* ---------- split text ---------- */
  const split = (el, mask) => {
    const walk = n => {
      [...n.childNodes].forEach(c => {
        if (c.nodeType === 3) {
          const frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(t => {
            if (!t) return;
            if (/^\s+$/.test(t)) { frag.append(' '); return; }
            const o = document.createElement('span'); o.className = mask ? 'w' : 'pw';
            const i = document.createElement('span'); i.className = 'wi'; i.textContent = t;
            o.append(i); frag.append(o);
          });
          c.replaceWith(frag);
        } else if (c.nodeType === 1 && c.tagName !== 'BR') walk(c);
      });
    };
    walk(el); return $$('.wi', el);
  };
  LZ.split = split;

  /* ---------- cart ---------- */
  let cart = store.get('lz-cart', {});
  const drawer = $('.drawer'), dbg = $('.drawer-bg'), toast = $('.toast');
  const cartCount = () => Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = () => Object.entries(cart).reduce((s, [id, q]) => s + (LZ.byId(id)?.price || 0) * q, 0);
  let toastT;
  let drawerOpen = false;
  const say = msg => {
    if (drawerOpen) return;
    toast.textContent = msg;
    toast.style.transform = 'translate(-50%,0)';
    clearTimeout(toastT); toastT = setTimeout(() => { toast.style.transform = 'translate(-50%,200%)'; }, 2200);
  };
  const saveCart = () => { store.set('lz-cart', cart); renderCart(); };
  const renderCart = () => {
    $$('.cart-n').forEach(n => n.textContent = cartCount());
    $('.cart-total').textContent = LZ.fmt(cartTotal());
    const ids = Object.keys(cart).filter(id => LZ.byId(id));
    $('.drawer-b').innerHTML = ids.length ? ids.map(id => {
      const p = LZ.byId(id);
      return `<div class="ci"><img src="${LZ.U(p.img, 200)}" alt="" width="76" height="92"><div><h4>${p.name}</h4><small>${LZ.fmt(p.price)}</small>
      <div class="qty"><button data-q="-1" data-id="${id}" aria-label="Less">−</button><span>${cart[id]}</span><button data-q="1" data-id="${id}" aria-label="More">+</button></div></div>
      <button class="rm" data-rm="${id}">Remove</button></div>`;
    }).join('') : '<p class="dempty">Your cart is empty.<br><a href="plants.html" style="color:var(--lime);font-size:1rem">Browse plants →</a></p>';
    $('.checkout').disabled = !ids.length;
  };
  LZ.addToCart = (id, n = 1, src) => {
    cart[id] = (cart[id] || 0) + n; saveCart(); say(`${LZ.byId(id).name} added to cart`);
    if (!flyToCart(id, src)) bump();
  };
  const bump = () => {
    if (!hasGSAP) return;
    $$('.cart-btn b').forEach(b => gsap.fromTo(b, { scale: 1.7 }, { scale: 1, duration: .7, ease: 'elastic.out(1,.45)' }));
    const cb = $('.cart-btn'); if (cb) gsap.fromTo(cb, { scale: 1.18 }, { scale: 1, duration: .6, ease: 'elastic.out(1,.5)' });
    // expanding ring so the cart is easy to spot
    const r = $('.cart-btn b').getBoundingClientRect(), ring = document.createElement('i');
    ring.style.cssText = `position:fixed;z-index:262;left:${r.left + r.width / 2}px;top:${r.top + r.height / 2}px;width:${r.width}px;height:${r.width}px;margin:${-r.width / 2}px 0 0 ${-r.width / 2}px;border-radius:50%;border:2px solid #c9f26b;pointer-events:none`;
    document.body.append(ring);
    gsap.to(ring, { scale: 3.2, opacity: 0, duration: .8, ease: 'power2.out', onComplete: () => ring.remove() });
    if (reduce) return;
    // burst of petals from the cart
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2, cols = ['#c9f26b', '#f4b6c8', '#f3efe4', '#e07a4f'];
    for (let i = 0; i < 16; i++) {
      const p = document.createElement('i');
      p.style.cssText = `position:fixed;z-index:262;left:${cx}px;top:${cy}px;width:9px;height:13px;margin:-6px 0 0 -4px;border-radius:60% 0 60% 40%;background:${cols[i % 4]};pointer-events:none`;
      document.body.append(p);
      const ang = Math.random() * 6.283, dist = 50 + Math.random() * 90;
      gsap.fromTo(p, { scale: .4, opacity: 1, rotation: Math.random() * 180 }, { x: Math.cos(ang) * dist, y: Math.sin(ang) * dist + 34, rotation: '+=320', scale: 1, opacity: 0, duration: 1.1 + Math.random() * .5, ease: 'power2.out', onComplete: () => p.remove() });
    }
  };
  /* fly a copy of the plant photo into the cart button */
  const flyToCart = (id, src) => {
    if (!hasGSAP || reduce) return false;
    const target = $('.cart-btn'); if (!target) return false;
    if (hdr.classList.contains('hide')) {               // make sure the cart is on screen before measuring it
      hdr.style.transition = 'none'; hdr.classList.remove('hide'); document.body.classList.remove('hdr-off'); void hdr.offsetHeight;
      requestAnimationFrame(() => { hdr.style.transition = ''; });
    }
    const from = (src && (src.closest('.card')?.querySelector('.card-img') || src.closest('.modal-box')?.querySelector('.modal-img') || src)) || target;
    const a = from.getBoundingClientRect(), t = target.getBoundingClientRect();
    const size = Math.min(150, Math.max(70, a.width * .5));
    const fly = document.createElement('div');
    fly.style.cssText = `position:fixed;z-index:261;left:0;top:0;width:${size}px;height:${size}px;border-radius:18px;overflow:hidden;pointer-events:none;box-shadow:0 18px 50px rgba(0,0,0,.45);background:#1d4630 url("${LZ.U(LZ.byId(id).img, 240)}") center/cover`;
    document.body.append(fly);
    const sx = a.left + a.width / 2 - size / 2, sy = a.top + a.height / 2 - size / 2;
    const ex = t.left + t.width / 2 - size / 2, ey = t.top + t.height / 2 - size / 2;
    gsap.set(fly, { x: sx, y: sy, scale: .6, opacity: 0 });
    const tl = gsap.timeline({ onComplete: () => { fly.remove(); bump(); } });
    tl.to(fly, { scale: 1, opacity: 1, duration: .25, ease: 'back.out(2)' })
      .to(fly, { x: ex, duration: .95, ease: 'power1.in' }, '>')
      .to(fly, { y: ey, duration: .95, ease: 'power3.inOut' }, '<')   // different eases on x/y bend the path into an arc
      .to(fly, { scale: .12, borderRadius: 40, duration: .95, ease: 'power2.in' }, '<')
      .to(fly, { opacity: 0, duration: .12 }, '-=.1');
    return true;
  };
  const openCart = on => {
    drawerOpen = on; lock(on);
    if (hasGSAP) {
      if (on) { gsap.set([drawer, dbg], { visibility: 'visible' }); gsap.to(dbg, { opacity: 1, duration: .4 }); gsap.to(drawer, { xPercent: 0, duration: .7, ease: 'expo.out' }); }
      else { gsap.to(dbg, { opacity: 0, duration: .4 }); gsap.to(drawer, { xPercent: 100, duration: .6, ease: 'expo.inOut', onComplete: () => gsap.set([drawer, dbg], { visibility: 'hidden' }) }); }
    } else { drawer.style.visibility = dbg.style.visibility = on ? 'visible' : 'hidden'; drawer.style.transform = on ? 'none' : ''; dbg.style.opacity = on ? 1 : 0; }
  };
  if (hasGSAP) gsap.set(drawer, { xPercent: 100 });
  $('.cart-btn').addEventListener('click', () => openCart(true));
  $('.close-cart').addEventListener('click', () => openCart(false));
  dbg.addEventListener('click', () => openCart(false));
  drawer.addEventListener('click', e => {
    const q = e.target.closest('[data-q]'), r = e.target.closest('[data-rm]');
    if (q) { const id = q.dataset.id; cart[id] = Math.max(0, cart[id] + +q.dataset.q); if (!cart[id]) delete cart[id]; saveCart(); }
    if (r) { delete cart[r.dataset.rm]; saveCart(); }
  });
  renderCart();
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-add]'); if (!b) return;
    e.stopPropagation(); LZ.addToCart(b.dataset.add, 1, b);
  }, true);

  /* ---------- modals ---------- */
  const modals = {};
  const showModal = (el, on) => {
    lock(on);
    if (hasGSAP) {
      if (on) { gsap.set(el, { visibility: 'visible' }); gsap.to(el, { opacity: 1, duration: .35 }); gsap.fromTo(el.firstElementChild, { y: 60, scale: .96 }, { y: 0, scale: 1, duration: .8, ease: 'expo.out' }); }
      else gsap.to(el, { opacity: 0, duration: .3, onComplete: () => gsap.set(el, { visibility: 'hidden' }) });
    } else { el.style.visibility = on ? 'visible' : 'hidden'; el.style.opacity = on ? 1 : 0; }
  };
  ['qv', 'co'].forEach(id => {
    const el = modals[id] = document.getElementById(id);
    el.addEventListener('click', e => { if (e.target === el || e.target.closest('.modal-x')) showModal(el, false); });
  });
  addEventListener('keydown', e => { if (e.key === 'Escape') { Object.values(modals).forEach(m => showModal(m, false)); openCart(false); } });

  LZ.openProduct = id => {
    const p = LZ.byId(id); if (!p) return;
    modals.qv.innerHTML = `<div class="modal-box"><button class="modal-x" aria-label="Close">✕</button>
      <div class="modal-img"><img src="${LZ.U(p.img, 1000)}" srcset="${LZ.SRCSET(p.img)}" sizes="(max-width:760px) 100vw, 490px" alt="${p.name}"></div>
      <div class="modal-body"><span class="eyebrow">${p.cat}</span><h2 class="h2" style="font-size:clamp(2rem,4vw,3.2rem)">${p.name}</h2>
      <p class="muted" style="font-style:italic">${p.latin}</p><p>${p.desc}</p>
      <div class="facts"><div><small>Light</small>${p.light[0].toUpperCase() + p.light.slice(1)}</div><div><small>Water</small>${p.water}</div>
      <div><small>Care level</small>${p.care[0].toUpperCase() + p.care.slice(1)}</div><div><small>Pets</small>${p.pet ? 'Pet-safe' : 'Keep away from pets'}</div></div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:auto;gap:14px;flex-wrap:wrap"><b style="font-family:var(--serif);font-size:1.8rem;font-weight:400">${LZ.fmt(p.price)}</b>
      <button class="btn dark" data-add="${p.id}">Add to cart <span class="arr">+</span></button></div></div></div>`;
    showModal(modals.qv, true);
  };
  document.addEventListener('click', e => {
    const c = e.target.closest('[data-open]'); if (c && !e.target.closest('[data-add]')) LZ.openProduct(c.dataset.open);
  });

  /* checkout (stored locally – connect to a backend/WhatsApp/payment later) */
  $('.checkout').addEventListener('click', () => {
    openCart(false);
    modals.co.innerHTML = `<div class="modal-box sm"><button class="modal-x" aria-label="Close">✕</button>
      <h2 class="h2" style="font-size:2.4rem;margin-bottom:6px">Checkout</h2><p style="opacity:.65;margin-bottom:22px">${cartCount()} item(s) · ${LZ.fmt(cartTotal())} · pay on delivery</p>
      <form class="form" novalidate><div class="f"><label for="cn">Full name</label><input id="cn" name="name" required autocomplete="name"><span class="err"></span></div>
      <div class="f"><label for="cp">Phone</label><input id="cp" name="phone" type="tel" required autocomplete="tel"><span class="err"></span></div>
      <div class="f"><label for="ca">Delivery address</label><textarea id="ca" name="addr" required autocomplete="street-address"></textarea><span class="err"></span></div>
      <button class="btn dark" style="justify-content:center">Place order <span class="arr">→</span></button></form></div>`;
    showModal(modals.co, true);
    const f = $('form', modals.co);
    f.addEventListener('submit', ev => {
      ev.preventDefault();
      let ok = true;
      $$('input,textarea', f).forEach(i => {
        const v = i.value.trim(), bad = !v || (i.name === 'phone' && v.replace(/\D/g, '').length < 7);
        i.parentElement.querySelector('.err').textContent = bad ? (i.name === 'phone' ? 'Enter a valid phone number' : 'Required') : ''; if (bad) ok = false;
      });
      if (!ok) return;
      const no = 'LZ-' + Date.now().toString().slice(-6);
      const orders = store.get('lz-orders', []);
      const lines = Object.entries(cart).filter(([id]) => LZ.byId(id)).map(([id, q]) => `• ${LZ.byId(id).name} × ${q} — ${LZ.fmt(LZ.byId(id).price * q)}`);
      const msg = `Assalam o Alaikum! New order ${no} from the Lalazar Nursery website.\n\n${lines.join('\n')}\n\nTotal: ${LZ.fmt(cartTotal())} (pay on delivery)\n\nName: ${f.name.value}\nPhone: ${f.phone.value}\nAddress: ${f.addr.value}`;
      orders.push({ no, items: cart, total: cartTotal(), name: f.name.value, phone: f.phone.value, addr: f.addr.value, at: new Date().toISOString() });
      store.set('lz-orders', orders); cart = {}; saveCart();
      $('.modal-box', modals.co).innerHTML = `<button class="modal-x" aria-label="Close">✕</button><span class="eyebrow">Almost done</span><h2 class="h2" style="font-size:2.4rem;margin:14px 0">Thank you, <em>${f.name.value.split(' ')[0]}</em>.</h2>
        <p style="opacity:.7;margin-bottom:22px">Your order <b>${no}</b> is saved. Tap below to send it to ${LZ.BIZ.name} on WhatsApp so we can confirm delivery with you.</p>
        <a class="btn dark" style="justify-content:center;width:100%" href="${LZ.waLink(msg)}" target="_blank" rel="noopener">Send order on WhatsApp <span class="arr">→</span></a>
        <p style="opacity:.55;font-size:.85rem;margin-top:14px;text-align:center">or call <a href="tel:${LZ.BIZ.tel}" style="text-decoration:underline">${LZ.BIZ.phone}</a></p>`;
    });
  });

  /* newsletter */
  $('.news').addEventListener('submit', e => {
    e.preventDefault(); const i = $('input', e.target);
    const l = store.get('lz-news', []); l.push(i.value); store.set('lz-news', l);
    $('.news-msg').textContent = 'Welcome to the garden — thank you!'; i.value = '';
  });

  /* ---------- magnetic + tilt ---------- */
  const bindFX = (root = document) => {
    if (!fine || reduce || !hasGSAP) return;
    $$('.magnetic:not([data-fx])', root).forEach(el => {
      el.dataset.fx = 1;
      const x = gsap.quickTo(el, 'x', { duration: .6, ease: 'elastic.out(1,.5)' }), y = gsap.quickTo(el, 'y', { duration: .6, ease: 'elastic.out(1,.5)' });
      el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * .3); y((e.clientY - r.top - r.height / 2) * .3); });
      el.addEventListener('mouseleave', () => { x(0); y(0); });
    });
    $$('.tilt:not([data-fx])', root).forEach(el => {
      el.dataset.fx = 1;
      const rx = gsap.quickTo(el, 'rotationX', { duration: .6, ease: 'power3' }), ry = gsap.quickTo(el, 'rotationY', { duration: .6, ease: 'power3' });
      gsap.set(el, { transformPerspective: 900 });
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        ry((px - .5) * 12); rx((.5 - py) * 10); el.style.setProperty('--mx', px * 100 + '%'); el.style.setProperty('--my', py * 100 + '%');
      });
      el.addEventListener('mouseleave', () => { rx(0); ry(0); });
    });
  };
  LZ.bindFX = bindFX;

  /* ---------- scroll animations ---------- */
  LZ.scrollInit = (root = document) => {
    if (!hasGSAP || typeof ScrollTrigger === 'undefined') return;
    const st = (el, extra) => ({ trigger: el, start: 'top 88%', once: true, ...extra });
    $$('[data-split]:not([data-done])', root).forEach(el => {
      el.dataset.done = 1;
      const words = split(el, true);
      if (el.hasAttribute('data-hero')) return;       // played by hero intro
      if (reduce) return;
      gsap.from(words, { yPercent: 115, duration: 1.1, ease: 'expo.out', stagger: .045, scrollTrigger: st(el) });
    });
    $$('[data-scrub]:not([data-done])', root).forEach(el => {
      el.dataset.done = 1;
      const words = split(el, false);
      if (reduce) return;
      gsap.fromTo(words, { opacity: .14 }, { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true } });
    });
    $$('[data-reveal]:not([data-done])', root).forEach(el => {
      el.dataset.done = 1;
      if (reduce) return;
      gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', delay: +el.dataset.delay || 0, scrollTrigger: st(el, { start: 'top 92%' }) });
    });
    $$('[data-clip]:not([data-done])', root).forEach(el => {
      el.dataset.done = 1;
      if (reduce) return;
      gsap.to(el, { clipPath: 'inset(0 0 0% 0)', duration: 1.4, ease: 'expo.out', scrollTrigger: st(el) });
      const im = $('img', el); if (im) gsap.from(im, { scale: 1.3, duration: 1.8, ease: 'expo.out', scrollTrigger: st(el) });
    });
    $$('[data-parallax]:not([data-done])', root).forEach(el => {
      el.dataset.done = 1; if (reduce) return;
      const amt = +el.dataset.parallax || 10;
      gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    $$('[data-count]:not([data-done])', root).forEach(el => {
      el.dataset.done = 1; const end = +el.dataset.count, suf = el.dataset.suffix || '';
      if (reduce) { el.textContent = end + suf; return; }
      const o = { v: 0 };
      gsap.to(o, { v: end, duration: 2.2, ease: 'expo.out', onUpdate: () => el.textContent = Math.round(o.v).toLocaleString() + suf, scrollTrigger: st(el) });
    });
    // card image parallax inside cards
    $$('.card-img img:not([data-done])', root).forEach(im => {
      im.dataset.done = 1; if (reduce) return;
      gsap.fromTo(im, { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: im.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    bindFX(root);
  };

  /* ---------- intro sequence ---------- */
  let readyFired = false;
  const fireReady = () => {
    if (readyFired) return; readyFired = true;
    setTimeout(() => { document.dispatchEvent(new CustomEvent('lz:ready')); LZ.scrollInit(); }, 0); // after page scripts registered
    if (hasGSAP && typeof ScrollTrigger !== 'undefined') setTimeout(() => ScrollTrigger.refresh(), 600);
    addEventListener('load', () => { if (hasGSAP && typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh(); });
  };
  const heroIntro = () => {
    const hero = $('[data-hero]'); if (!hasGSAP || reduce) return;
    $$('[data-hero]').forEach((el, i) => { if (el.dataset.split !== undefined && !el.dataset.done) { el.dataset.done = 1; const w = split(el, true); gsap.from(w, { yPercent: 115, duration: 1.4, ease: 'expo.out', stagger: .06, delay: .1 + i * .15 }); } });
    gsap.from('.hero-in', { opacity: 0, y: 30, duration: 1.2, ease: 'expo.out', stagger: .12, delay: .6 });
  };
  document.addEventListener('lz:ready', heroIntro);

  if (hasGSAP) {
    lock(true);
    if (firstVisit) {
      sessionStorage.setItem('lz-seen', '1');
      const c = $('.pre-c'), o = { v: 0 };
      const tl = gsap.timeline();
      tl.from('.pre-name span', { yPercent: 110, duration: 1, ease: 'expo.out' })
        .from('.pre-logo', { scale: .6, opacity: 0, rotation: -12, duration: 1.4, ease: 'expo.out' }, 0)
        .to('.pre-bar i', { scaleX: 1, duration: 1.8, ease: 'power2.inOut' }, 0)
        .to(o, { v: 100, duration: 1.8, ease: 'power2.inOut', onUpdate: () => c.textContent = String(Math.round(o.v)).padStart(3, '0') }, 0)
        .to('.pre-in', { opacity: 0, y: -30, duration: .5, ease: 'power2.in' }, '+=.15')
        .to('.pre', { yPercent: -100, duration: 1, ease: 'expo.inOut', onComplete: () => { $('.pre').remove(); lock(false); } }, '-=.1')
        .add(fireReady, '-=.55');
    } else {
      lock(false);
      if (arrivedViaWipe) { gsap.to(wipe, { clipPath: dot(trX || innerWidth / 2, trY || innerHeight / 2), duration: .95, ease: 'power3.inOut', delay: .05 }); gsap.to('.wipe span', { opacity: 0, duration: .3 }); setTimeout(fireReady, 380); }
      else fireReady();
    }
  } else { $$('.pre').forEach(p => p.remove()); fireReady(); }
})();
