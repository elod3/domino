# Domino — site de prezentare

Aplicația de auto-control pentru Android a lui Koreh Elod. O singură pagină (`index.html`),
în română și engleză. `produs.html`, `fondator.html` și `preturi.html` trimit la secțiunile noi.

Se publică automat pe GitHub Pages la fiecare push pe `main`: https://elod3.github.io/domino/

## De completat

- **Linkul de descărcare.** E într-un singur loc: `<body data-download="#descarca">` din
  `index.html`. Pune acolo linkul de Google Play sau de APK; butonul din final îl ia de acolo.
- **Clipurile din telefon sunt mockup-uri**, nu capturi din aplicație. Le-am desenat în
  `tools/clips/clip.html` după funcțiile descrise pe site. Când ai înregistrări reale de ecran
  (vertical, ~7 s, fără sunet), pune-le peste `assets/media/clip-*.mp4` și `clip-*.jpg`.
- **Prețul Pro** apare ca „anunțat la lansare”.

## Decizia estetică

- **Public:** tineri de 16–25 de ani, cu Android, care pierd ore pe TikTok și Instagram și vor
  să scape singuri, fără un cont de părinte.
- **Ton:** direct, la persoana a doua, fără limbaj de startup. Cifrele și faptele sunt cele din
  aplicație: Android 8+, gratuit, fără cont, Kotlin + Jetpack Compose.
- **Paleta vine din obiect:** un domino adevărat are piesa de os, puncte negre și, la unele
  seturi, un punct roșu. De aici: cerneală, os (`#efe8da`), un singur roșu (`#ff4524`) folosit
  doar unde se apasă sau unde cade ceva.
- **Tipografie:** Bricolage Grotesque (variabil, cu axa de mărime optică) pentru titluri și
  text, JetBrains Mono doar pentru cifre și etichete. Ambele găzduite local, latin + latin-ext.
- **Elementul memorabil:** lanțul de 30 de piese din hero, câte una pentru fiecare zi a unei
  luni. Prima se clatină până o împingi (sau până dai scroll), apoi cad pe rând și contorul
  urcă la 30. E exact ideea aplicației: un obicei mic îl dărâmă pe următorul.
- **Video cu motiv:** fundalul din hero e randarea 3D a inelului de domino, regradată
  monocrom ca să se potrivească cu paleta. În „Cum merge”, telefonul stă fix și schimbă
  clipul după funcția de pe ecran; pe mobil, fiecare funcție are clipul ei.
- **Formă de document:** fișa tehnică e o listă de definiții, prețurile un tabel de
  comparație, fără carduri egale și fără un „Recomandat” fals.

Verificat cu `slop_scan.py` din `elod3/fara-ai-slop`: P0=0, P1=0, P2=0.

## Structură

```
index.html            pagina
assets/site.css       stilul
assets/site.js        lanțul, telefonul, limba RO/EN (textele EN sunt în site.js)
assets/fonts.css      fonturile locale
assets/media/         lant.mp4 (hero), clip-*.mp4 (telefon)
assets/img/           logo, favicon, og.jpg
tools/clips/          ecranele din clipuri + record.js (Playwright + ffmpeg)
```

Refacerea clipurilor: `python3 -m http.server 8770` în rădăcină, apoi
`node tools/clips/record.js`.
