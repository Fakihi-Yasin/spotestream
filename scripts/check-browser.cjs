const fs = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');
const { spawn } = require('node:child_process');
const assert = require('node:assert/strict');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const root = path.resolve('out');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
const server = http.createServer(async (req, res) => {
  let target = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (target !== root && !target.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  if (target === root) target = path.join(root, 'index.html');
  try { const data = await fs.readFile(target); res.writeHead(200, { 'Content-Type': mime[path.extname(target)] || 'application/octet-stream' }); res.end(data); }
  catch { res.writeHead(404, { 'Content-Type': mime['.html'] }); res.end(await fs.readFile(path.join(root, '404.html'))); }
});
let chrome, ws;
(async () => {
  await fs.mkdir('.qa', { recursive: true });
  await new Promise(resolve => server.listen(4173, '127.0.0.1', resolve));
  chrome = spawn(process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--remote-debugging-port=9223', '--remote-allow-origins=http://localhost:9223',
    `--user-data-dir=${path.resolve('.qa/chrome-profile')}`, 'about:blank',
  ], { windowsHide: true, stdio: 'ignore' });
  chrome.on('error', e => { console.error(e); process.exitCode = 1; });
  let tabs;
  for (let i = 0; i < 60; i++) {
    try { tabs = await (await fetch('http://127.0.0.1:9223/json', { signal: AbortSignal.timeout(1000) })).json(); break; } catch { await sleep(250); }
  }
  assert.ok(tabs, 'Chrome remote debugger unavailable');
  ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let seq = 0; const pending = new Map(); const errors = [];
  ws.onmessage = e => { const msg = JSON.parse(e.data); if (msg.id) { const p = pending.get(msg.id); pending.delete(msg.id); msg.error ? p.reject(msg.error) : p.resolve(msg.result); } else if (msg.method === 'Runtime.exceptionThrown') errors.push(msg.params.exceptionDetails.text); };
  function call(method, params = {}) { return new Promise((resolve, reject) => { const id = ++seq; const timer = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 10000); pending.set(id, { resolve: result => { clearTimeout(timer); resolve(result); }, reject: error => { clearTimeout(timer); reject(error); } }); ws.send(JSON.stringify({ id, method, params })); }); }
  async function run(expression) { const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails)); return result.result.value; }
  await call('Page.enable'); await call('Runtime.enable'); await call('Network.enable');
  // Preserve existing analytics implementation but prevent test PageViews reaching Meta.
  await call('Network.setBlockedURLs', { urls: ['*facebook.com*', '*facebook.net*'] });
  const results = [];
  for (const width of [320, 390, 1280]) {
    await call('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
    await call('Page.navigate', { url: 'http://127.0.0.1:4173/' });
    await sleep(1800);
    await run(`document.documentElement.style.setProperty('scroll-behavior','auto','important'); document.body.style.setProperty('scroll-behavior','auto','important')`);
    const state = await run(`({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, h1: document.querySelectorAll('h1').length, heading: document.querySelector('h1').innerText, image: document.querySelector('picture img').currentSrc, faqAnswers: document.querySelectorAll('details p').length })`);
    assert.equal(state.h1, 1); assert.equal(state.faqAnswers, 9);
    await fs.writeFile(`.qa/home-${width}.png`, Buffer.from((await call('Page.captureScreenshot', { format: 'png' })).data, 'base64'));
    if (state.scrollWidth > width + 1) console.log(await run(`Array.from(document.querySelectorAll('h1,h2,h3,button,nav,a,p')).map(el => ({tag:el.tagName,text:el.innerText.slice(0,70),left:el.getBoundingClientRect().left,right:el.getBoundingClientRect().right})).filter(el=>el.left < -1 || el.right > innerWidth+1)`));
    assert.ok(state.scrollWidth <= width + 1, `Horizontal overflow at ${width}: ${state.scrollWidth}`);
    if (width < 768) {
      assert.equal(await run(`document.querySelector('[aria-controls="mobile-menu"]').getAttribute('aria-expanded')`), 'false');
      await run(`document.querySelector('[aria-controls="mobile-menu"]').click()`); await sleep(300);
      assert.equal(await run(`document.querySelector('[aria-controls="mobile-menu"]').getAttribute('aria-expanded')`), 'true');
      await run(`document.querySelector('#mobile-menu a[href="#pricing"]').click()`); await sleep(300);
      assert.equal(await run(`document.querySelector('[aria-controls="mobile-menu"]').getAttribute('aria-expanded')`), 'false');
    }
    await run(`document.querySelector('#pricing').scrollIntoView(); document.querySelector('#pricing button:last-child').click()`); await sleep(350);
    assert.equal(await run(`document.querySelector('#pricing button:last-child').getAttribute('aria-pressed')`), 'true');
    assert.ok(await run(`document.querySelector('#pricing').innerText.includes('1099')`));
    await run(`document.querySelector('#pricing button').click()`); await sleep(350);
    assert.ok(await run(`document.querySelector('#pricing').innerText.includes('899')`));
    await run(`document.querySelector('#faq').scrollIntoView(); document.querySelector('details summary').click()`);
    assert.equal(await run(`document.querySelector('details').open`), true);
    assert.ok(await run(`document.querySelector('details p').getBoundingClientRect().height > 0`));
    await run(`document.querySelector('button[aria-label="Lukk"]')?.click()`);
    await sleep(350);
    await fs.writeFile(`.qa/faq-${width}.png`, Buffer.from((await call('Page.captureScreenshot', { format: 'png' })).data, 'base64'));
    const themeBefore = await run(`document.documentElement.classList.contains('dark')`);
    await run(`document.querySelector('button[aria-label*="tema"]').click()`); await sleep(300);
    assert.equal(await run(`document.documentElement.classList.contains('dark')`), !themeBefore);
    await run(`document.querySelector('#contact').scrollIntoView(); window.__opened = ''; window.open = url => { window.__opened = url; }; document.querySelector('#contact form').requestSubmit()`);
    assert.equal(await run(`window.__opened`), '', 'Invalid form must not open WhatsApp');
    // Use the native setter so React receives real input changes.
    await run(`for(const [id,value] of [['contact-name','SEO Test'],['contact-email','test@example.test'],['contact-message','Local verification only']]) { const el=document.getElementById(id); Object.getOwnPropertyDescriptor(el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,'value').set.call(el,value); el.dispatchEvent(new Event('input',{bubbles:true})); }`);
    await sleep(100);
    await run(`document.querySelector('#contact form').requestSubmit()`);
    const opened = await run(`window.__opened`);
    assert.match(opened, /^https:\/\/wa\.me\/447460010370\?text=/);
    assert.ok(decodeURIComponent(opened).includes('Local verification only'));
    results.push({ ...state, checks: 'menu, pricing toggle, FAQ, theme, form validation, WhatsApp URL (mocked)' });
  }
  await call('Page.navigate', { url: 'http://127.0.0.1:4173/no-such-page' }); await sleep(800);
  assert.equal((await fetch('http://127.0.0.1:4173/no-such-page')).status, 404);
  assert.equal(await run(`document.querySelector('h1').innerText`), 'Siden finnes ikke');
  assert.deepEqual(errors, [], 'Browser exceptions');
  await fs.writeFile('docs/browser-verification.json', JSON.stringify({ date: new Date().toISOString(), localOnly: true, results, browserExceptions: errors, notFoundStatus: 404 }, null, 2));
  console.log('PASS: 320/390/1280px layout, menu, pricing, FAQs, theme, contact form, local 404; screenshots in .qa.');
})().catch(e => { console.error(e); process.exitCode = 1; }).finally(() => { ws?.close(); chrome?.kill(); server.close(); });
