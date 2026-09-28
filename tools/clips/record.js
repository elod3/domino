// Înregistrează fiecare clip din clip.html și îl convertește în assets/media/clip-*.mp4.
// Rulează din rădăcina repo-ului: node tools/clips/record.js (cere playwright + ffmpeg).
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs'); const path = require('path');
const root = path.resolve(__dirname, '..', '..');
const ff = process.env.FFMPEG || 'ffmpeg';
(async () => {
  const b = await chromium.launch();
  for (const c of ['blocare', 'program', 'focus', 'streak']) {
    const dir = fs.mkdtempSync('/tmp/clip-');
    const ctx = await b.newContext({ viewport: { width: 780, height: 1688 },
      recordVideo: { dir, size: { width: 780, height: 1688 } } });
    const p = await ctx.newPage();
    const t0 = Date.now();
    await p.goto('http://localhost:' + (process.env.PORT || 8770) + '/tools/clips/clip.html?z=2&c=' + c);
    await p.waitForFunction(() => document.fonts.status === 'loaded');
    const start = (Date.now() - t0) / 1000 + 0.15;
    await p.waitForFunction(() => window.__done, null, { timeout: 30000 });
    await p.waitForTimeout(200);
    const vid = await p.video().path(); await ctx.close();
    const out = path.join(root, 'assets/media/clip-' + c + '.mp4');
    execFileSync(ff, ['-loglevel', 'error', '-y', '-ss', String(start), '-i', vid, '-vf', 'scale=540:-2,fps=30',
      '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '30', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out]);
    execFileSync(ff, ['-loglevel', 'error', '-y', '-sseof', '-0.4', '-i', out, '-frames:v', '1', '-q:v', '4',
      path.join(root, 'assets/media/clip-' + c + '.jpg')]);
    console.log(c, (fs.statSync(out).size / 1024).toFixed(0) + ' KB');
  }
  await b.close();
})();
