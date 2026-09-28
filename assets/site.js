/* Domino: lanțul din hero, telefonul care schimbă clipurile, limba, intrările titlurilor. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- texte RO / EN ---------- */
  const EN = {
    'nav.how': 'How it works', 'nav.founder': 'Founder', 'nav.pricing': 'Pricing', 'nav.cta': 'Download',
    'hero.kicker': 'Self-control app for Android',
    'hero.h1': 'One small habit knocks over <em>the next.</em>',
    'hero.lead': 'Domino blocks the apps that eat your day, on the hours you choose. No parent account, and no two-second impulse gets past it.',
    'hero.cta': 'Download for Android', 'hero.more': 'See how it works', 'hero.meta': 'Android 8+ · free · no account',
    'chain.label': 'A month of habits', 'chain.hint': 'Push the first piece', 'chain.sr': 'Push the first piece',
    'how.h': 'Four pieces. Each one pushes the next.',
    's1.h': 'Pause what steals your time.', 's1.p': 'Pick the apps and until when. Open one on reflex and you land on a screen that reminds you what you decided and how long is left.',
    's2.h': 'Rules that start on their own.', 's2.p': '“School, no social media, 08:00–14:00, Monday to Friday.” Write it once and it applies every day, without you having to remember.',
    's3.h': 'Focus for 25 or 90 minutes.', 's3.p': 'One tap and the phone goes quiet: notifications stop, the apps you chose are paused. When it ends, you get a piece in your chain.',
    's4.h': 'The chain you won’t want to break.', 's4.p': 'Every day you kept your rules falls onto the next one. After two weeks you’re not fighting your phone anymore: you’re fighting not to break the streak.',
    'spec.h': 'Hard to cheat, easy to use.',
    'spec.k1': 'Who it’s for', 'spec.v1': 'For you, not your parents. You set the rules, you run them.',
    'spec.k2': 'Unlocking', 'spec.v2': 'You can, but with friction: it puts a moment to think between the impulse and the app.',
    'spec.k3': 'Your data', 'spec.v3': 'Stays on your phone. No profiling, no selling to third parties.',
    'spec.k4': 'Account', 'spec.v4': 'You don’t need one. Install it and go.',
    'spec.k5': 'Platform', 'spec.v5': 'Android 8.0 or newer',
    'spec.k6': 'Price', 'spec.v6': 'Free.', 'spec.v6b': 'Pro comes later',
    'f.cap': '18 · built Domino on his own', 'f.h': 'I made Domino for myself.',
    'f.q': '“I wanted to get my time back, a little at a time.”',
    'f.p1': 'I’m Elod and I’m 18. Like a lot of us, I spent too much time on my phone. The phone itself wasn’t the problem; it was how easily an hour slipped away without me noticing.',
    'f.p2': 'I wanted something to gently stop me in that moment, without needing anyone else to watch over me. I couldn’t find exactly what I was looking for, so I made it. Now I work on it every day to make it simpler and more useful for anyone who wants more time for the things that matter.',
    'p.h': 'Start free. Stay free, if you like.', 'p.feat': 'Feature', 'p.free': 'Free', 'p.pro': 'Pro', 'p.soon': 'soon',
    'p.r1': 'App blocking', 'p.r2': 'Automatic schedules', 'p.r2a': 'basic', 'p.r2b': 'unlimited, advanced',
    'p.r3': 'Focus mode and the day chain', 'p.r4': 'Detailed stats', 'p.r5': 'Smart scheduling on a server', 'p.r5b': 'later',
    'p.price': 'Price', 'p.pricePro': 'announced at launch',
    'q.h': 'Questions you’d ask anyway.',
    'q.q1': 'Do I need a parent account, like Family Link?', 'q.a1': 'No. Domino is for self-control: you set your own rules and you run them yourself.',
    'q.q2': 'Can I remove the blocks any time?', 'q.a2': 'Yes, just not on an impulse. Unlocking asks for a pause, and that pause is usually enough for you to stop wanting it.',
    'q.q3': 'Which phones does it run on?', 'q.a3': 'Android 8.0 or newer. It’s written natively in Kotlin with Jetpack Compose. A desktop version is on the list.',
    'q.q4': 'What happens to my data?', 'q.a4': 'It stays on your phone. We don’t sell it and we don’t build profiles from it.',
    'd.h': 'You place the <em>first piece.</em>', 'd.p': 'The rest fall on their own. Install, pick an app and a time, done.',
    'd.cta': 'Download Domino for Android', 'foot.by': 'made by Koreh Elod'
  };
  const RO = {};
  $$('[data-t]').forEach((el) => { RO[el.dataset.t] = el.innerHTML; });
  const titles = { ro: document.title, en: 'Domino: the app that blocks your own distractions, on Android' };

  function setLang(l){
    const dict = l === 'en' ? EN : RO;
    $$('[data-t]').forEach((el) => { const v = dict[el.dataset.t]; if (v != null) el.innerHTML = v; });
    document.documentElement.lang = l;
    document.title = titles[l];
    $$('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
    try { localStorage.setItem('domino-lang', l); } catch (e) {}
  }
  $$('.lang button').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));
  let saved = null;
  try { saved = localStorage.getItem('domino-lang'); } catch (e) {}
  if (saved === 'en' || (!saved && /^en/i.test(navigator.language || ''))) setLang('en');

  /* ---------- linkul de descărcare: se schimbă într-un singur loc, pe <body data-download> ---------- */
  const dl = document.body.dataset.download;
  if (dl && dl !== '#descarca') { const a = $('#download'); a.href = dl; a.rel = 'noopener'; }

  /* ---------- bara de sus devine opacă după hero ---------- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('solid', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- lanțul: 30 de piese; prima se clatină, apoi cad pe rând ---------- */
  const chain = $('#chain'), row = $('#chainRow'), counter = $('#chainN');
  const tiles = [];
  for (let i = 0; i < 30; i++){ const t = document.createElement('i'); t.className = 'tile' + (i === 0 ? ' first' : ''); t.setAttribute('aria-hidden', 'true'); row.appendChild(t); tiles.push(t); }
  let falling = false;
  function topple(){
    if (falling) return; falling = true;
    chain.classList.add('go');
    const visible = tiles.filter((t) => t.offsetParent !== null);
    visible.forEach((t, i) => setTimeout(() => {
      t.classList.add('down');
      counter.textContent = String(Math.round((i + 1) / visible.length * 30)).padStart(2, '0');
    }, reduced ? 0 : i * 85));
    // după o pauză, piesele se ridică la loc, ca lanțul să poată fi împins din nou
    setTimeout(() => {
      visible.slice().reverse().forEach((t, i) => setTimeout(() => t.classList.remove('down'), reduced ? 0 : i * 22));
      setTimeout(() => { falling = false; counter.textContent = '00'; chain.classList.remove('go'); }, visible.length * 22 + 500);
    }, visible.length * 85 + 3200);
  }
  row.addEventListener('click', topple);
  // cine nu apasă, vede căderea oricum, la primul scroll
  if (!reduced){
    const once = () => { if (scrollY > 60){ removeEventListener('scroll', once); topple(); } };
    addEventListener('scroll', once, { passive: true });
  }

  /* ---------- cum merge: pasul din mijlocul ecranului alege clipul din telefon ---------- */
  const steps = $$('.step');
  const phoneVids = $$('#phoneScreen video');
  const dots = $$('.phone__dots i');
  const wide = matchMedia('(min-width: 961px)');
  let current = null;
  function show(clip){
    if (clip === current) return; current = clip;
    steps.forEach((s) => s.classList.toggle('on', s.dataset.clip === clip));
    dots.forEach((d) => d.classList.toggle('on', d.dataset.clip === clip));
    phoneVids.forEach((v) => {
      const on = v.dataset.clip === clip;
      v.classList.toggle('on', on);
      if (on){ v.preload = 'auto'; v.currentTime = 0; if (!reduced) v.play().catch(() => {}); }
      else v.pause();
    });
  }
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        if (wide.matches) show(e.target.dataset.clip);
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    steps.forEach((s) => io.observe(s));

    // pe telefon fiecare pas are clipul lui: pornește doar cât e pe ecran
    const vio = new IntersectionObserver((es) => {
      es.forEach((e) => {
        const v = e.target;
        if (e.isIntersecting && !wide.matches && !reduced){ v.preload = 'auto'; v.play().catch(() => {}); }
        else v.pause();
      });
    }, { threshold: .4 });
    $$('.step__video').forEach((v) => vio.observe(v));

    // telefonul fix se oprește când ieși din secțiune
    const how = $('#cum');
    new IntersectionObserver(([e]) => {
      phoneVids.forEach((v) => { if (!e.isIntersecting) v.pause(); else if (v.classList.contains('on') && !reduced) v.play().catch(() => {}); });
    }).observe(how);

    // titlurile se descoperă de jos în sus, o singură dată. Se observă părintele:
    // un titlu tăiat complet de clip-path nu intersectează niciodată ecranul în Chrome.
    const hio = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting){ $('h2', e.target).classList.add('in'); hio.unobserve(e.target); } });
    }, { threshold: .2 });
    $$('.sec-head h2, .founder h2, .final h2').forEach((h) => hio.observe(h.parentElement));

    // piesa din final se înclină când ajungi la ea
    const fin = $('.final');
    new IntersectionObserver(([e]) => { if (e.isIntersecting) fin.classList.add('lean'); }, { threshold: .5 }).observe(fin);
  } else {
    $$('h2').forEach((h) => h.classList.add('in'));
  }
  show('blocare');

  // butonul de descărcare dărâmă piesa
  const btn = $('#download'), fin = $('.final');
  btn.addEventListener('mouseenter', () => fin.classList.add('fell'));
  btn.addEventListener('focus', () => fin.classList.add('fell'));
  btn.addEventListener('mouseleave', () => fin.classList.remove('fell'));
})();
