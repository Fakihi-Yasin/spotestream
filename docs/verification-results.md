# Local verification — 12 October 2026

| Check | Result | Evidence / limits |
| --- | --- | --- |
| TypeScript | PASS | `npx.cmd tsc --noEmit` |
| Static production-mode build | PASS | `npm.cmd run build`, installed Next.js 16.2.7; exports `/`, `robots.txt`, `sitemap.xml`, `404.html`. This uses the default staging SEO settings; “production build” does not mean public deployment or indexing enabled |
| SEO regression checks | PASS | `node scripts/check-seo.cjs`: production/staging settings matrix, missing-domain and invalid-origin cases, rendered metadata/language, one H1, nine crawlable FAQ answers, internal fragments and local assets |
| 404 metadata | PASS | Norwegian title and description in `out/404.html`, noindex and no homepage canonical |
| Default indexing | PASS | Homepage `noindex, follow`, robots allows crawl to read noindex, sitemap is empty; no invented canonical/domain |
| Domain-dependent settings | PASS (configuration tests) | Reserved test origin used only in isolated module tests; self-canonical, WebSite metadata and production sitemap configuration validated. Actual production HTML/host verification waits for a domain |
| Mobile and desktop browser | PASS | Headless Chrome at 320/390/1280px; document scroll widths 320/390/1273px; no horizontal overflow or browser exceptions |
| Existing interactions | PASS | Mobile menu opens/closes; one/two-device prices update; FAQ expands; theme changes; invalid form does not open WhatsApp; valid form produces correct WhatsApp URL with mocked `window.open`; no message sent |
| Local HTTP recovery | PASS | Temporary test static server returned 404 and displayed exported Norwegian 404; production host behavior is not established |
| Image payload | Measured | Desktop hero originals: 18,755,905 bytes; WebP replacements: 737,050 bytes, approximately 96.1% smaller. Browser selected 640px images on 320/390px widths and 1280px on desktop. Original files retained; no timing/CWV claim |
| Source formatting | PASS | `git diff --check` |
| Existing test/lint suite | Not available | Package originally had only dev/build/start scripts; repeatable SEO/browser checks were added |
| Structured-data certification | Not performed | Minimal conditional WebSite JSON-LD parsed/shape-checked in local verification when configured; no domain means no JSON-LD emitted. Organization, Article, BreadcrumbList, ratings and product offers were not fabricated |
| Google Norway rankings/indexing/CWV | Not verified | Requires real domain, live crawl and measurement data; no ranking improvement claimed |

Screenshots are in ignored `.qa/home-{320,390,1280}.png` and `.qa/faq-{320,390,1280}.png`. Browser results are preserved in [browser-verification.json](browser-verification.json); byte measurements are in [image-measurements.json](image-measurements.json).

The existing Google-font downloads failed under restricted network access; the build passed with approved network access. PowerShell's npm/npx `.ps1` wrappers were disabled by execution policy; `.cmd` wrappers ran normally. No execution-policy changes or dependency installation were needed. SVG social-card rendering emitted nonfatal font-cache warnings but produced the image successfully.

No public deployment, purchase, support message, Search Console submission or live indexing change was performed. Existing user lockfile modifications were preserved.
