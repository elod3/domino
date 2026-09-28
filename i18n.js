/* ============================================================
   DOMINO — i18n (RO / EN)
   Traduce orice element cu [data-i18n="cheie"] și titlul paginii.
   Limba se salvează în localStorage; sliderul din navbar o schimbă.
   ============================================================ */
(function(){
  const DICT = {
    ro: {
      /* --- NAV --- */
      "nav.home":"Acasă",
      "nav.product":"Produs",
      "nav.founder":"Fondator",
      "nav.pricing":"Prețuri",
      "nav.cta":"Descarcă gratuit",

      /* --- FOOTER --- */
      "foot.tagline":"Aplicația de auto-control pentru Android. Preia controlul asupra timpului tău, o piesă pe rând.",
      "foot.h.product":"Produs",
      "foot.h.company":"Companie",
      "foot.h.legal":"Legal",
      "foot.about":"Despre",
      "foot.blog":"Blog",
      "foot.contact":"Contact",
      "foot.terms":"Termeni",
      "foot.privacy":"Confidențialitate",
      "foot.rights":"© 2026 Domino. Toate drepturile rezervate.",
      "foot.madeby":'Realizat de <b style="color:var(--text)">KOREH.</b>',

      /* --- HOME --- */
      "home.title":"Domino — Preia controlul asupra timpului tău",
      "hero.h1":'Rupe lanțul și <span class="accent">preia controlul</span> asupra timpului tău.',
      "cine.q":'Ai auzit de <span class="accent">efectul domino</span>?',
      "cine.s1":'Pui un domino mic lângă unul puțin mai mare — <span class="accent">cel mic îl împinge pe cel mare.</span>',
      "cine.s2":'Și dacă <span class="accent">continui tot așa…</span>',
      "cine.s3":"Peste un timp…",
      "cine.s4":'O să ajungi la <span class="accent">Lună</span>.',
      "cine.s5":'Fiecare lucru mic e un pas spre <span class="accent">visul tău.</span>',
      "finale.eyebrow":"Începe azi",
      "finale.h2":'Prima piesă<br>o pui <span class="accent">tu.</span>',
      "finale.lead":"Restul cad la locul lor. Descarcă Domino gratuit și pune prima piesă din lanțul obiceiurilor tale bune.",
      "finale.btn":"Descarcă pe Android",
      "finale.note":"Android 8+ · 0 lei · fără cont",

      /* --- PRODUS (funcții + aplicația) --- */
      "prod.title":"Domino — Produsul",
      "prod.eyebrow":"Produsul",
      "prod.h1":"Tot ce ai nevoie ca să rămâi pe drumul tău.",
      "prod.lead":"Instrumente simple, dar greu de păcălit — exact ca să nu te sabotezi singur într-un moment de slăbiciune.",
      "prod.f1.h":"Blocare aplicații","prod.f1.p":"Alege aplicațiile care îți fură timpul și Domino le închide când trebuie. Fără scuze.",
      "prod.f2.h":"Programe automate","prod.f2.p":"Setează orare pentru muncă, somn sau studiu. Regulile pornesc singure, la ora stabilită.",
      "prod.f3.h":"Mod focus","prod.f3.p":"Un singur tap și intri într-o sesiune de concentrare. Restul lumii digitale așteaptă.",
      "prod.f4.h":"Streak-uri & obiceiuri","prod.f4.p":"Vezi câte zile la rând ți-ai respectat regulile. Efectul domino, dar în favoarea ta.",
      "prod.f5.h":"Greu de dezactivat","prod.f5.p":"Blocajele sunt intenționat greu de scos într-un impuls — ăsta e chiar rostul auto-controlului.",
      "prod.f6.h":"Statistici clare","prod.f6.p":"Înțelege unde îți dispare timpul, cu rapoarte simple și onest de citit.",
      "prod.how.eyebrow":"Cum funcționează",
      "prod.how.h":"Trei pași până la primul tău streak.",
      "prod.s1.h":"Alege-ți regulile","prod.s1.p":"Selectezi aplicațiile de blocat și intervalele orare. Tu ești „părintele” propriei tale discipline.",
      "prod.s2.h":"Domino le păzește","prod.s2.p":"Aplicația aplică regulile în fundal și te oprește exact în momentul în care ai fi cedat.",
      "prod.s3.h":"Construiește lanțul","prod.s3.p":"Fiecare zi respectată se adaugă la streak. Un obicei bun declanșează următorul.",
      "prod.show.eyebrow":"Aplicația în acțiune",
      "prod.show.h":"Vezi Domino la lucru.",
      "prod.show.lead":"Fiecare card e pregătit pentru un clip scurt dedicat unei funcții.",
      "prod.v1.tag":"CLIP — Blocare aplicații","prod.v1.h":"Blochezi din 2 secunde","prod.v1.p":"Alegi aplicația, apeși, gata. Domino se ocupă de restul cât timp ești ocupat cu ce contează.",
      "prod.v2.tag":"CLIP — Programe automate","prod.v2.h":"Orare care se aplică singure","prod.v2.p":"„Fără social media 22:00–07:00.” O setezi o dată, funcționează în fiecare zi.",
      "prod.v3.tag":"CLIP — Mod focus","prod.v3.h":"Sesiuni de concentrare","prod.v3.p":"Pornești un focus de 25 sau 90 de minute și telefonul devine, în sfârșit, tăcut.",
      "prod.v4.tag":"CLIP — Streak-uri","prod.v4.h":"Vezi-ți progresul","prod.v4.p":"Un lanț vizual al zilelor reușite care te motivează să nu îl rupi.",
      "prod.cta.h":"Gata să încerci?","prod.cta.btn":"Descarcă gratuit",

      /* --- FONDATOR --- */
      "found.title":"Domino — Fondator: Koreh Elod",
      "found.eyebrow":"Fondator",
      "found.name":"Koreh Elod",
      "found.role":"Creatorul Domino",
      "found.lead":"Am 18 ani și am făcut Domino pentru mine, ca să stau mai puțin pe telefon. Acum îl împart cu oricine are nevoie de el.",
      "found.m1.n":"18","found.m1.l":"Ani",
      "found.m2.n":"Solo","found.m2.l":"Construit de unul singur",
      "found.m3.n":"2026","found.m3.l":"A pornit Domino",
      "found.story.eyebrow":"Povestea",
      "found.story.h":"De ce am construit Domino.",
      "found.pull":'„Voiam să-mi recapăt <span class="accent">timpul</span>, puțin câte puțin. Așa s-a născut Domino.”',
      "found.p1":"Sunt Elod și am 18 ani. Ca mulți dintre noi, îmi petreceam prea mult timp pe telefon. Nu mă deranja telefonul în sine, ci cât de ușor pierdeam o oră fără să-mi dau seama. Voiam ceva care să mă oprească blând în momentul ăla, fără să am nevoie de altcineva care să mă supravegheze. Nu am găsit exact ce căutam, așa că l-am făcut singur.",
      "found.p2":"Domino a început ca un proiect mic, doar pentru mine. Acum lucrez la el în fiecare zi ca să-l fac mai simplu și mai util pentru oricine vrea să aibă mai mult timp pentru lucrurile care contează.",
      "found.cta.h":"Hai să construim lanțul împreună.","found.cta.btn":"Descarcă Domino",

      /* --- PREȚURI --- */
      "price.title":"Domino — Prețuri",
      "price.eyebrow":"Prețuri",
      "price.h1":"Începe gratuit. Treci la Pro când ești gata.",
      "price.free.name":"Gratuit","price.free.desc":"Tot ce îți trebuie ca să începi să-ți controlezi timpul.",
      "price.free.f1":"Blocare aplicații","price.free.f2":"Programe de bază","price.free.f3":"Mod focus & streak-uri",
      "price.free.btn":"Descarcă gratuit",
      "price.pro.badge":"Recomandat","price.pro.name":"Pro","price.pro.desc":"Pentru control avansat și automatizări inteligente.",
      "price.pro.f1":"Tot ce include Gratuit","price.pro.f2":"Programe nelimitate & avansate","price.pro.f3":"Statistici detaliate","price.pro.f4":"Server de programare inteligent (în curând)",
      "price.pro.btn":"Încearcă Pro",
      "price.faq.eyebrow":"Întrebări frecvente","price.faq.h":"Bine de știut înainte să începi.",
      "price.q1":"Am nevoie de un cont de părinte ca la Family Link?","price.a1":"Nu. Domino e gândit pentru auto-control: tu îți setezi și îți administrezi singur regulile, fără să depinzi de altcineva.",
      "price.q2":"Pot să dezactivez blocajele oricând?","price.a2":"Da, dar intenționat cu puțină „frecare”, ca să nu renunți la un impuls. Exact asta te ajută să-ți respecți deciziile.",
      "price.q3":"Pe ce dispozitive funcționează?","price.a3":"Momentan pe Android (nativ, Kotlin/Compose). Versiuni pentru desktop sunt pe foaia de parcurs.",
      "price.q4":"Îmi sunt datele în siguranță?","price.a4":"Da. Datele tale de utilizare rămân la tine — fără profilare și fără vânzare către terți.",
      "price.cta.eyebrow":"Începe azi","price.cta.h":"Prima piesă o pui tu.","price.cta.btn":"Descarcă pe Android"
    },

    en: {
      /* --- NAV --- */
      "nav.home":"Home",
      "nav.product":"Product",
      "nav.founder":"Founder",
      "nav.pricing":"Pricing",
      "nav.cta":"Download free",

      /* --- FOOTER --- */
      "foot.tagline":"The self-control app for Android. Take control of your time, one piece at a time.",
      "foot.h.product":"Product",
      "foot.h.company":"Company",
      "foot.h.legal":"Legal",
      "foot.about":"About",
      "foot.blog":"Blog",
      "foot.contact":"Contact",
      "foot.terms":"Terms",
      "foot.privacy":"Privacy",
      "foot.rights":"© 2026 Domino. All rights reserved.",
      "foot.madeby":'Made by <b style="color:var(--text)">KOREH.</b>',

      /* --- HOME --- */
      "home.title":"Domino — Take control of your time",
      "hero.h1":'Break the chain and <span class="accent">take control</span> of your time.',
      "cine.q":'Have you heard of the <span class="accent">domino effect</span>?',
      "cine.s1":'Place a small domino next to a slightly bigger one — <span class="accent">the small one topples the big one.</span>',
      "cine.s2":'And if you <span class="accent">keep going…</span>',
      "cine.s3":"After a while…",
      "cine.s4":"You'll reach the <span class=\"accent\">Moon</span>.",
      "cine.s5":'Every small thing is a step toward <span class="accent">your dream.</span>',
      "finale.eyebrow":"Start today",
      "finale.h2":'The first piece<br>is <span class="accent">yours.</span>',
      "finale.lead":"The rest fall into place. Download Domino for free and set the first piece of your good-habit chain.",
      "finale.btn":"Download for Android",
      "finale.note":"Android 8+ · free · no account",

      /* --- PRODUCT --- */
      "prod.title":"Domino — The product",
      "prod.eyebrow":"The product",
      "prod.h1":"Everything you need to stay on your path.",
      "prod.lead":"Simple tools that are hard to trick — so you can't sabotage yourself in a weak moment.",
      "prod.f1.h":"App blocking","prod.f1.p":"Pick the apps that steal your time and Domino shuts them when it matters. No excuses.",
      "prod.f2.h":"Automatic schedules","prod.f2.p":"Set schedules for work, sleep or study. Rules start on their own, right on time.",
      "prod.f3.h":"Focus mode","prod.f3.p":"One tap and you're in a focus session. The rest of the digital world can wait.",
      "prod.f4.h":"Streaks & habits","prod.f4.p":"See how many days in a row you kept your rules. The domino effect, but in your favor.",
      "prod.f5.h":"Hard to disable","prod.f5.p":"Blocks are intentionally hard to remove on impulse — that's the whole point of self-control.",
      "prod.f6.h":"Clear stats","prod.f6.p":"Understand where your time goes, with simple, honest reports.",
      "prod.how.eyebrow":"How it works",
      "prod.how.h":"Three steps to your first streak.",
      "prod.s1.h":"Choose your rules","prod.s1.p":"Pick the apps to block and the time windows. You're the “parent” of your own discipline.",
      "prod.s2.h":"Domino guards them","prod.s2.p":"The app enforces the rules in the background and stops you right when you'd have caved.",
      "prod.s3.h":"Build the chain","prod.s3.p":"Every kept day adds to your streak. One good habit triggers the next.",
      "prod.show.eyebrow":"The app in action",
      "prod.show.h":"See Domino at work.",
      "prod.show.lead":"Each card is ready for a short clip dedicated to a feature.",
      "prod.v1.tag":"CLIP — App blocking","prod.v1.h":"Block in 2 seconds","prod.v1.p":"Pick the app, tap, done. Domino handles the rest while you focus on what matters.",
      "prod.v2.tag":"CLIP — Auto schedules","prod.v2.h":"Schedules that run themselves","prod.v2.p":"“No social media 10pm–7am.” Set it once, it works every day.",
      "prod.v3.tag":"CLIP — Focus mode","prod.v3.h":"Focus sessions","prod.v3.p":"Start a 25 or 90-minute focus and your phone finally goes quiet.",
      "prod.v4.tag":"CLIP — Streaks","prod.v4.h":"See your progress","prod.v4.p":"A visual chain of successful days that keeps you from breaking it.",
      "prod.cta.h":"Ready to try?","prod.cta.btn":"Download free",

      /* --- FOUNDER --- */
      "found.title":"Domino — Founder: Koreh Elod",
      "found.eyebrow":"Founder",
      "found.name":"Koreh Elod",
      "found.role":"The person behind Domino",
      "found.lead":"I'm 18 and I made Domino for myself, to spend less time on my phone. Now I'm sharing it with anyone who needs it.",
      "found.m1.n":"18","found.m1.l":"Years old",
      "found.m2.n":"Solo","found.m2.l":"Built on my own",
      "found.m3.n":"2026","found.m3.l":"Started Domino",
      "found.story.eyebrow":"The story",
      "found.story.h":"Why I built Domino.",
      "found.pull":'“I wanted to get my <span class="accent">time</span> back, a little at a time. That’s how Domino was born.”',
      "found.p1":"I'm Elod and I'm 18. Like a lot of us, I spent too much time on my phone. The phone itself wasn't the problem; it was how easily an hour slipped away without me noticing. I wanted something to gently stop me in that moment, without needing anyone else to watch over me. I couldn't find exactly what I was looking for, so I made it myself.",
      "found.p2":"Domino started as a small project, just for me. Now I work on it every day to make it simpler and more useful for anyone who wants more time for the things that matter.",
      "found.cta.h":"Let's build the chain together.","found.cta.btn":"Download Domino",

      /* --- PRICING --- */
      "price.title":"Domino — Pricing",
      "price.eyebrow":"Pricing",
      "price.h1":"Start free. Go Pro when you're ready.",
      "price.free.name":"Free","price.free.desc":"Everything you need to start controlling your time.",
      "price.free.f1":"App blocking","price.free.f2":"Basic schedules","price.free.f3":"Focus mode & streaks",
      "price.free.btn":"Download free",
      "price.pro.badge":"Recommended","price.pro.name":"Pro","price.pro.desc":"For advanced control and smart automation.",
      "price.pro.f1":"Everything in Free","price.pro.f2":"Unlimited & advanced schedules","price.pro.f3":"Detailed stats","price.pro.f4":"Smart scheduling server (soon)",
      "price.pro.btn":"Try Pro",
      "price.faq.eyebrow":"FAQ","price.faq.h":"Good to know before you start.",
      "price.q1":"Do I need a parent account like Family Link?","price.a1":"No. Domino is built for self-control: you set and manage your own rules, without depending on anyone.",
      "price.q2":"Can I disable the blocks anytime?","price.a2":"Yes, but intentionally with a little “friction”, so you don't quit on impulse. That's exactly what helps you keep your decisions.",
      "price.q3":"What devices does it work on?","price.a3":"Android for now (native, Kotlin/Compose). Desktop versions are on the roadmap.",
      "price.q4":"Is my data safe?","price.a4":"Yes. Your usage data stays with you — no profiling, no selling to third parties.",
      "price.cta.eyebrow":"Start today","price.cta.h":"The first piece is yours.","price.cta.btn":"Download for Android"
    }
  };

  const KEY = "domino_lang";
  function initialLang(){
    const saved = localStorage.getItem(KEY);
    if(saved === "ro" || saved === "en") return saved;
    return (navigator.language || "ro").toLowerCase().startsWith("en") ? "en" : "ro";
  }

  function apply(lang){
    if(!DICT[lang]) lang = "ro";
    const d = DICT[lang];
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const v = d[el.getAttribute("data-i18n")];
      if(v != null) el.innerHTML = v;
    });
    document.querySelectorAll(".lang-switch").forEach(s => s.setAttribute("data-lang", lang));
    try{ localStorage.setItem(KEY, lang); }catch(e){}
  }

  function wire(){
    document.querySelectorAll(".lang-switch").forEach(sw => {
      sw.addEventListener("click", (e) => {
        const opt = e.target.closest("[data-set]");
        const lang = opt ? opt.getAttribute("data-set")
                         : (sw.getAttribute("data-lang") === "ro" ? "en" : "ro");
        apply(lang);
      });
    });
    apply(initialLang());
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", wire);
  } else { wire(); }
})();
