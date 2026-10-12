const sharp = require('sharp');
const fs = require('node:fs/promises');
const path = require('node:path');
(async () => {
  await fs.mkdir('public/optimized', { recursive: true });
  const measurements = [];
  for (const name of ['slide1', 'slide2', 'slide3']) {
    const source = `public/${name}.jpg`;
    for (const width of [640, 1280, 1920]) {
      const target = `public/optimized/${name}-${width}.webp`;
      await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(target);
      measurements.push({ source, target, beforeBytes: (await fs.stat(source)).size, afterBytes: (await fs.stat(target)).size });
    }
  }
  // Existing SVG logo says KooraLive; do not assert it is SpoteStream's logo.
  const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="760" height="140"><text x="10" y="100" font-size="94" font-family="Arial" font-weight="bold" fill="#00205B">SpoteStream</text></svg>');
  const logo = await sharp(svg).resize({ width: 760 }).png().toBuffer();
  const meta = await sharp(logo).metadata();
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#f8fafc' } })
    .composite([{ input: logo, left: 220, top: Math.round((630 - meta.height) / 2) }])
    .png().toFile('public/social-card.png');
  await fs.mkdir('docs', { recursive: true });
  await fs.writeFile('docs/image-measurements.json', JSON.stringify(measurements, null, 2));
  console.log(JSON.stringify(measurements.filter(m => m.target.endsWith('1920.webp')), null, 2));
})().catch(e => { console.error(e); process.exitCode = 1; });
