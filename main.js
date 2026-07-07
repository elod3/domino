/* ============================================================
   DOMINO — JS partajat
   1) Preloader: punctele domino se rotesc, se opresc și se
      așază în forma unui telefon; după ~2s, fade-in la pagină.
   2) Meniu mobil
   3) Reveal la scroll
   ============================================================ */
document.documentElement.classList.remove('no-js');

/* ---------- 1. PRELOADER ---------- */
(function preloader(){
  const pl = document.getElementById('preloader');
  const page = document.querySelector('.page-fade');
  if(!pl){ page && page.classList.add('in'); return; }

  // Se arată o singură dată per sesiune (nu la fiecare navigare)
  if(sessionStorage.getItem('domino_seen')){
    pl.remove();
    page && page.classList.add('in');
    return;
  }

  const svg = pl.querySelector('svg');
  const N = 16;                    // număr de puncte
  const cx = 75, cy = 75;          // centru
  const R  = 46;                   // raza cercului (rotire)
  const dots = [];
  for(let i=0;i<N;i++){
    const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('r','5');
    c.setAttribute('class','pl-dot');
    // gradient de culoare albastru→magenta, exact ca în video
    const t = i/(N-1);
    c.setAttribute('fill', mix([106,75,234],[198,74,214], t));
    svg.appendChild(c);
    dots.push(c);
  }

  // Poziții pe cerc
  function ringPos(i){
    const a = (i/N)*Math.PI*2;
    return [cx + R*Math.cos(a), cy + R*Math.sin(a)];
  }
  // Poziții pe conturul unui telefon (dreptunghi vertical)
  function phonePos(i){
    const w = 52, h = 108;                 // dimensiune telefon
    const x0 = cx - w/2, y0 = cy - h/2;
    const per = 2*(w+h);
    let d = (i/N)*per;                      // distanță pe perimetru
    if(d < w)            return [x0 + d,        y0];
    d -= w;
    if(d < h)            return [x0 + w,        y0 + d];
    d -= h;
    if(d < w)            return [x0 + w - d,    y0 + h];
    d -= w;
    return [x0, y0 + h - d];
  }

  function mix(a,b,t){
    const r=Math.round(a[0]+(b[0]-a[0])*t);
    const g=Math.round(a[1]+(b[1]-a[1])*t);
    const bl=Math.round(a[2]+(b[2]-a[2])*t);
    return `rgb(${r},${g},${bl})`;
  }
  const easeInOut = t => t<.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2;

  // Cronologie (ms): rotire → morph în telefon → hold → fade
  const T_SPIN = 950, T_MORPH = 550, T_HOLD = 550;
  const total = T_SPIN + T_MORPH + T_HOLD;   // ~2050ms
  const start = performance.now();

  function frame(now){
    const t = now - start;
    let rot = 0, morph = 0;
    if(t < T_SPIN){
      rot = easeInOut(Math.min(t/T_SPIN,1)) * Math.PI*2 * 1.5;  // 1.5 ture
    } else if(t < T_SPIN + T_MORPH){
      rot = Math.PI*2*1.5;
      morph = easeInOut((t - T_SPIN)/T_MORPH);
    } else {
      rot = Math.PI*2*1.5;
      morph = 1;
    }
    const pulse = t > T_SPIN+T_MORPH ? 1 + Math.sin((t-(T_SPIN+T_MORPH))/T_HOLD*Math.PI)*0.04 : 1;

    for(let i=0;i<N;i++){
      const a = (i/N)*Math.PI*2 + rot;
      const rx = cx + R*Math.cos(a), ry = cy + R*Math.sin(a);
      const [px,py] = phonePos(i);
      const x = rx + (px-rx)*morph;
      const y = ry + (py-ry)*morph;
      dots[i].setAttribute('cx', ((x-cx)*pulse+cx).toFixed(2));
      dots[i].setAttribute('cy', ((y-cy)*pulse+cy).toFixed(2));
    }

    if(t < total){
      requestAnimationFrame(frame);
    } else {
      sessionStorage.setItem('domino_seen','1');
      pl.classList.add('done');
      page && page.classList.add('in');
      setTimeout(()=>pl.remove(), 950);
    }
  }
  requestAnimationFrame(frame);
})();

/* ---------- 2. MENIU MOBIL ---------- */
(function(){
  const toggle = document.getElementById('toggle');
  const menu = document.getElementById('menu');
  if(!toggle || !menu) return;
  toggle.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
})();

/* ---------- 3. REVEAL LA SCROLL ---------- */
(function(){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal, .pop').forEach(el => io.observe(el));
})();

/* ---------- 4. CINEMA — secvență condusă de scroll ---------- */
(function(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const video  = document.querySelector('.hero-video');

  // -- 4a. Paralax discret pe clipul din hero (adâncime) --
  if(video && !reduce){
    let t1 = false;
    const heroFx = () => {
      if(t1) return; t1 = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0, vh = window.innerHeight || 1;
        const p = Math.min(y / vh, 1);
        video.style.transform =
          `translateY(${(y*0.08).toFixed(1)}px) scale(${(1.04 + p*0.06).toFixed(3)})`;
        t1 = false;
      });
    };
    window.addEventListener('scroll', heroFx, { passive:true }); heroFx();
  }

  // -- 4b. Regia secvenței cinema --
  const cinema = document.getElementById('cinema');
  const world  = document.getElementById('cineWorld');
  const svg    = document.getElementById('cineSvg');
  const lines  = Array.from(document.querySelectorAll('#cineText .cine-line'));
  if(!cinema || !svg || reduce) return;

  // Cadre pentru viewBox: [x, y, w, h] (h = w * 0.625, ca lumea 2400×1500)
  const K0  = [0,    0, 2400, 1500];  // tot ansamblul
  const Kd0 = [15, 1148,  470,  294];  // zoom pe dominoul mic
  const Kd3 = [340, 728, 1000,  625];  // zoom pe dominourile mari
  const Kd5 = [1000,131, 1500,  938];  // zoom pe cel care ajunge la lună

  // Opriri de zoom pe parcursul progresului (p: 0→1)
  const VB = [
    [0.16, K0], [0.24, K0],
    [0.34, Kd0],[0.40, Kd0],
    [0.50, Kd3],[0.55, Kd3],
    [0.65, Kd5],[0.90, Kd5],
  ];

  // Benzile fiecărei replici: [fadeIn, plinStart, plinEnd, fadeOut]
  const BANDS = {
    q:  [0.015,0.05,0.10,0.13],
    s1: [0.25, 0.29,0.37,0.40],
    s2: [0.41, 0.45,0.52,0.55],
    s3: [0.56, 0.60,0.65,0.68],
    s4: [0.70, 0.74,0.81,0.84],
    s5: [0.86, 0.90,0.99,1.01],
  };

  const clamp = (v,a,b)=>Math.max(a,Math.min(b,v));
  const smooth = t => t*t*(3-2*t);
  const lerp = (a,b,t)=>a+(b-a)*t;

  function viewBoxAt(p){
    if(p<=VB[0][0]) return VB[0][1];
    if(p>=VB[VB.length-1][0]) return VB[VB.length-1][1];
    for(let i=0;i<VB.length-1;i++){
      const [pa,ka]=VB[i], [pb,kb]=VB[i+1];
      if(p>=pa && p<=pb){
        const t = smooth((p-pa)/(pb-pa || 1));
        return ka.map((v,j)=>lerp(v,kb[j],t));
      }
    }
    return VB[VB.length-1][1];
  }

  function worldOpacity(p){
    if(p < 0.14) return 0;
    if(p < 0.18) return (p-0.14)/0.04;
    if(p < 0.74) return 1;
    if(p < 0.84) return 1-(p-0.74)/0.10;
    return 0;
  }

  let ticking = false;
  function render(){
    const rangeTop = cinema.offsetTop;
    const range = cinema.offsetHeight - window.innerHeight;
    const p = clamp((window.scrollY - rangeTop) / (range || 1), 0, 1);

    // ecran negru + navbar ascunsă cât timp suntem în secvență
    const active = window.scrollY > rangeTop - 2 &&
                   window.scrollY < rangeTop + range + window.innerHeight*0.15;
    document.body.classList.toggle('cinema-active', active);

    // zoom/pan
    const vb = viewBoxAt(p);
    svg.setAttribute('viewBox', vb.map(n=>n.toFixed(1)).join(' '));
    world.style.opacity = worldOpacity(p).toFixed(3);

    // replicile care „sar" în față
    for(const el of lines){
      const b = BANDS[el.dataset.scene];
      if(!b){ continue; }
      const [a,fs,fe,d] = b;
      let op=0, s=1, y=0;
      if(p<a || p>d){ op=0; }
      else if(p<fs){ const t=smooth((p-a)/(fs-a)); op=t; s=0.86+0.14*t; y=48*(1-t); }
      else if(p<=fe){ op=1; s=1; y=0; }
      else { const t=smooth((p-fe)/(d-fe)); op=1-t; s=1+0.06*t; y=-32*t; }
      el.style.opacity = op.toFixed(3);
      el.style.transform = `translate(-50%, calc(-50% + ${y.toFixed(1)}px)) scale(${s.toFixed(3)})`;
    }
    ticking = false;
  }
  function onScroll(){ if(!ticking){ ticking = true; requestAnimationFrame(render); } }
  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', onScroll);
  render();
})();
