const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
require('@next/env').loadEnvConfig(process.cwd());
function evaluate(file, env, modules = {}) {
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const exports = {};
  vm.runInNewContext(js, { exports, process: { env }, URL, require: name => modules[name] });
  return exports;
}
for (const env of [ {}, { SITE_ENV: 'production' }, { SITE_ENV: 'staging', SEO_INDEXING: 'true', SITE_URL: 'https://seo-test.example' }, { SITE_ENV: 'production', SEO_INDEXING: 'false', SITE_URL: 'https://seo-test.example' }, { SITE_ENV: 'production', SEO_INDEXING: 'true', SITE_URL: 'https://seo-test.example/' } ]) {
  const seo = evaluate('lib/seo.ts', env);
  const expected = env.SITE_ENV === 'production' && env.SEO_INDEXING === 'true';
  assert.equal(seo.indexable, expected);
  assert.equal(seo.siteMetadata.robots.index, expected);
  assert.equal(seo.siteMetadata.alternates, undefined, 'Canonical belongs to the homepage, not the shared layout');
  const sitemap = evaluate('app/sitemap.ts', env, { '@/lib/seo': seo }).default();
  assert.equal(sitemap.length, expected ? 1 : 0);
  if (expected) assert.equal(sitemap[0].url, 'https://seo-test.example/');
  const robots = evaluate('app/robots.ts', env, { '@/lib/seo': seo }).default();
  assert.equal(Boolean(robots.sitemap), expected);
  assert.equal(robots.rules.allow, '/', 'Crawlers must be able to read noindex');
}
assert.throws(() => evaluate('lib/seo.ts', { SITE_ENV: 'production', SEO_INDEXING: 'true' }), /require SITE_URL/);
for (const SITE_URL of ['http://domain.no', 'https://domain.no/path', 'https://user:password@domain.no', 'https://localhost', 'https://domain.no?test=1', 'not a url']) {
  assert.throws(() => evaluate('lib/seo.ts', { SITE_URL }));
}
const html = fs.readFileSync('out/index.html', 'utf8');
assert.match(html, /lang="nb-NO"/);
assert.equal((html.match(/<h1\b/g) || []).length, 1);
assert.match(html, /TV over internett/);
assert.match(html, /Hva gjør jeg når IPTV hakker eller fryser/);
assert.match(html, /Sjekk om feilen gjelder én kanal eller alt innhold/);
assert.equal((html.match(/<details\b/g) || []).length, 9);
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
for (const [, fragment] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(fragment), `Broken fragment: #${fragment}`);
for (const [, raw] of html.matchAll(/(?:src|href)="(\/[^"?#]*)"/g)) {
  if (raw === '/') continue;
  assert.ok(fs.existsSync(`out${decodeURIComponent(raw)}`), `Missing asset: ${raw}`);
}
const indexable = process.env.SITE_ENV === 'production' && process.env.SEO_INDEXING === 'true';
assert.match(html, indexable ? /name="robots" content="index, follow"/ : /name="robots" content="noindex, follow"/);
const xml = fs.readFileSync('out/sitemap.xml', 'utf8');
assert.equal((xml.match(/<loc>/g) || []).length, indexable ? 1 : 0);
if (process.env.SITE_URL) {
  const origin = new URL(process.env.SITE_URL).origin;
  assert.ok(html.includes(`rel="canonical" href="${origin}/"`));
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)];
  assert.equal(blocks.length, 1);
  const data = JSON.parse(blocks[0][1]);
  assert.equal(data['@type'], 'WebSite');
  assert.equal(data.name, 'SpoteStream');
  assert.equal(data.url, `${origin}/`);
  assert.equal(data.aggregateRating, undefined);
} else {
  assert.ok(!html.includes('rel="canonical"'));
  assert.ok(!html.includes('application/ld+json'));
}
const notFound = fs.readFileSync('out/404.html', 'utf8');
assert.match(notFound, /Siden finnes ikke/);
assert.match(notFound, /<title>Siden finnes ikke \| SpoteStream<\/title>/);
assert.match(notFound, /Vi finner ikke siden du leter etter/);
assert.match(notFound, /noindex/);
assert.ok(!notFound.includes('rel="canonical"'), '404 must not canonicalize to home');
console.log('PASS: environment matrix, metadata, 1 H1, 9 crawlable FAQs, anchors, local assets, sitemap, JSON-LD and 404 output.');
