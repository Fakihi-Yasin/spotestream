# Norwegian SEO implementation — 12 October 2026

## Scope and evidence

The pasted request is the task instruction. The supplied `norwegian-iptv-seo-research.md` and `.json` are research inputs, not instructions to publish their proposed architecture or claims. Their 120 keywords and 30 long-tail opportunities are candidates; volume, organic difficulty, competition, exact Google Norway rankings and SERP features remain unverified. No ranking or indexing outcome is claimed.

The user confirmed that there is no production domain. Work was performed in the existing `spotestream` project; nothing was publicly deployed. The framework, static-export rendering, section URLs, theme switch, slides, pricing controls, contact flow and visual style were retained.

## Main audit findings

| Area | Before | Result / limitation |
| --- | --- | --- |
| Framework and routes | Next.js App Router, installed Next 16.2.7, React, Tailwind, Framer Motion; `output: export`; only `/` is a content route | Kept static export. Added crawl-control metadata routes and Norwegian 404. No new acquisition pages or redirects |
| Metadata | One title/description with unverified 4K, 50,000 channels and activation claims; keyword tag listed third-party brands | Replaced with accurate Norwegian title and description; removed keyword tag; share metadata and an actual 1200 × 630 social image |
| HTML and content | `lang="no"`; animated content starts transparent; FAQ answers absent from closed Radix panels in static HTML | `nb-NO`; critical text/navigation visible before hydration; native expandable FAQs contain all answers in HTML |
| Navigation | Section fragments; “Kanaler” actually targets combined device/channel section | Descriptive labels, existing fragment URLs retained, contextual FAQ links added; fixed mobile footer wrapping and scroll offset |
| Canonical/sitemap/robots | Missing; no domain available | Build-time domain configuration; self-canonical only on homepage when origin supplied; production-only sitemap; noindex by default |
| Structured data | None | Minimal WebSite markup when domain is configured. Organization deferred: actual company identity is unverified and logos conflict with the page name. BreadcrumbList and Article are not applicable to the one-page site |
| Business claims | Channel brands, huge catalogue, universal compatibility, uptime, “anti-freeze,” immediate activation, 24/7 support, trial, refunds, discounts and rating/customer counts lack evidence | Replaced visible promises with buying/setup guidance. Existing displayed prices explicitly marked unconfirmed. Channel logos, posters and device categories explicitly labelled illustrations/examples |
| Branding | Copy says SpoteStream; visible SVG artwork says KooraLive; PNG favicon identity not independently verified | Artwork retained; SVG alt text now describes the actual logo. Resolve brand identity before launch |
| Images | Unoptimized static images; hero JPEGs approximately 18.8 MB combined | Responsive WebP derivatives retain artwork; desktop set totals 737,050 bytes. First visible image has high fetch priority; decorative images use empty alt |
| HTTP/404 | Default error handling; hosting unknown | Norwegian error page exported as `404.html`, noindex, no homepage canonical. Actual production status codes still depend on hosting |
| Mobile | Existing responsive design; longer Norwegian anchors exposed a 320px footer overflow | Footer links wrap; navbar logo and WhatsApp panel fit narrow widths; verified local browser results recorded separately |

## Implemented copy and keyword ownership

There is only **one existing indexable content URL**. Fragment identifiers are sections of that page, not separate pages with their own metadata. Keep `/` as the owner of the broad commercial topic; do not create competing `/priser/` and `/abonnement/` pages until distinct content is justified.

| Existing page | Primary keyword candidate | Secondary candidates | Intent | Implemented changes |
| --- | --- | --- | --- | --- |
| `/` | IPTV Norge | IPTV i Norge; norsk IPTV; TV over internett; internett-TV Norge; IPTV-abonnement | Commercial investigation | Natural Bokmål metadata and H1, buying checklist, subscription review notice, compatibility caveat, setup instructions, rights questions, troubleshooting and descriptive section links |
| 404 / nonexistent URLs | None | None | Error recovery; not a search landing page | Norwegian error message and link to homepage, noindex, no canonical |

| Existing section (not a separate page) | Supporting query candidates | Purpose |
| --- | --- | --- |
| `/#pricing` | IPTV abonnement; IPTV pris; hva koster IPTV i Norge | Keep prices and terms together; get total cost, renewal and cancellation facts confirmed |
| `/#features` | velge IPTV-leverandør; innhold og rettigheter | Useful selection criteria; no superiority or licensed-service assertion |
| `/#devices` | IPTV Smart TV; IPTV på PC; hvilke kanaler er inkludert | Collect exact model/app and catalogue evidence; examples are not supported-device claims |
| `/#how-it-works` | sette opp IPTV; hva trenger man for IPTV | Generic preparation and official app-store guidance; no fabricated tested app instructions |
| `/#faq` | hva er IPTV; IPTV hakker; IPTV buffering; IPTV virker ikke | Technology distinction, billing objections and diagnostic steps; all answers crawlable |
| `/#contact` | SpoteStream kontakt; hvordan får jeg hjelp med IPTV | Explain that links and form open WhatsApp; no response-time or support-hour promise |

**Future page candidates:** verified subscription/terms information, a tested compatibility matrix, a dated licensed catalogue and two differentiated guides (`hva er IPTV`, `IPTV hakker`). Only split content into routes when it answers a distinct need with sufficient evidence; keep one owner per cluster. Device-specific guides wait for exact model/OS/app tests. Legality guidance requires current primary legal sources and review; the current page asks for rights evidence without asserting the service is lawful. Do not publish all 28 research routes as thin placeholders.

## Updated title and description table

| Route | Norwegian title | Norwegian meta description |
| --- | --- | --- |
| `/` | IPTV i Norge – abonnement og oppsett \| SpoteStream | Vurderer du TV over internett? Finn informasjon om abonnement, enheter og oppsett hos SpoteStream, og spørsmål du bør avklare før du bestiller. |
| 404 | Siden finnes ikke \| SpoteStream | Vi finner ikke siden du leter etter. Gå til SpoteStreams forside for informasjon om abonnement, oppsett og kontakt. |

H1: **TV over internett i Norge**. Main H2s cover pre-purchase checks, subscription/prices, device verification, setup, illustrative film artwork, questions/troubleshooting and contact. Feature topics and FAQ questions use H3s. Artwork does not establish content availability. No artificial language pages or hreflang were added. Useful FAQs do not imply FAQ rich-result eligibility.

## Business facts requiring confirmation

| Topic | Existing data or issue | Required evidence |
| --- | --- | --- |
| Identity | SpoteStream copy vs KooraLive logos; logos also embed 4K/sport wording; no actual legal entity or registration details | Confirm public brand, company identity, legitimate logo/favicon and embedded artwork claims |
| Rights/catalogue | Norwegian and international brands, film/sports imagery | Distribution-rights chain covering Norway, licensed dated catalogue, permission to use assets; do not infer rights from imagery |
| Plans/prices | Rendered 1/3/6/12-month prices: one device 149/399/599/899 NOK; two devices 199/499/749/1099 NOK | Confirm total charge, tax treatment, duration and renewal charge. An unused translation object still has a conflicting 349 NOK three-month price; it is not rendered and must be reconciled before reuse |
| Screens/devices | One/two-device selector; generic device examples | Distinguish registered devices from simultaneous streams; tested models, OS/app versions, region, test dates and limitations |
| Terms | No approved policy pages | Actual payment methods, merchant, recurring billing, cancellation, withdrawal/refund/complaint and privacy terms |
| Support | Existing WhatsApp number `447460010370` retained | Confirm ownership, staffed languages, actual support hours and delivery process |
| Promotions | Prior trial, extra months, discount and guarantees lack evidence | Verify before reintroducing; removed from visible copy |
| Social proof | Prior 4.9 rating and 12,000 subscriber count lack evidence | Authentic, permissioned source before publication or markup |
| Dormant code | Unmounted WorldCup/other sections and old translation data retain promotional copy | Review before enabling any dormant component; unused assets/code do not substantiate claims |
| Analytics | Existing Meta Pixel retained | Confirm account ownership and consent/privacy handling before launch; test harness blocks Meta requests |

## Launch configuration

Copy `.env.example` to an ignored local environment file. Keep `SITE_ENV=staging` and `SEO_INDEXING=false` until content is approved. Set `SITE_URL` to the actual HTTPS origin without a path, query or fragment once acquired. After business review, a production build requires all three settings:

```dotenv
SITE_ENV=production
SEO_INDEXING=true
SITE_URL=<actual HTTPS origin>
```

These are **build-time** settings. Changing host environment variables after uploading static files does not update HTML, robots or sitemap: rebuild and upload the resulting `out/`. Do not reuse an indexable production export for staging.

Without a domain, no canonical, domain-dependent social URL or WebSite JSON-LD is emitted; sitemap is empty. Production indexing requested without `SITE_URL` fails with an actionable error. Staging robots allows crawling so search engines can read `noindex`; noindex is not access control. Protect hosted previews with host-level authentication if private previews are required. Never rely on robots exclusion alone to remove indexed URLs.

Configure the static host to serve `/` with 200 and unknown URLs with the exported `404.html` and **404 status**, not a 200 SPA fallback. Set one canonical HTTPS/www policy with a single redirect at the host. No content URL changed, so no application redirects were needed. Static exports cannot enforce host response headers/statuses themselves.

## Verification

Repeatable local commands:

```powershell
npx.cmd tsc --noEmit
npm.cmd run build
node scripts/check-seo.cjs
node scripts/check-browser.cjs
```

`check-seo.cjs` checks the production/staging configuration matrix, invalid origins and missing-domain failure, exported language/metadata, one H1, nine FAQ answers, every section link and local image/script/style asset, sitemap and 404. Domain-dependent canonical and WebSite JSON-LD are checked when a configured origin is present; with no domain they are correctly absent. JSON parsing and shape assertions are local validity checks, not a Google rich-result certification.

`check-browser.cjs` uses a temporary loopback static server and headless Chrome. It checks 320/390/1280px widths, menu controls, pricing selection, native FAQ expansion, theme switching, form validation, a mocked WhatsApp URL and local error recovery. It sends no contact message and blocks Meta network requests. Screenshots stay in ignored `.qa/`; successful results are written to `browser-verification.json`.

Build/font network access is needed by the existing `next/font/google` setup. There was no existing test or lint script. No dependency/framework change was made, and pre-existing lockfile changes were preserved. The image generator uses the already installed Sharp library; measurements are in `image-measurements.json`. Original artwork files remain available.

Verification outcomes are recorded in `verification-results.md`. No Core Web Vitals, ranking, indexing or conversion improvement is asserted from local checks or file-size reductions.

## Remaining hosted-site checks

After domain and product verification: check HTTPS and redirect policy, actual 200/404 responses, canonical host in source HTML, robots/noindex after rebuild, sitemap coverage, Search Console verification/submission and canonical selection. Test a real mobile customer journey without submitting purchases during QA, and measure Lighthouse plus field Core Web Vitals when enough data exists. Review indexing and Norway-filtered queries; no guarantee that pages will be indexed or rank.

## Next priorities from the 90-day roadmap

1. **Days 1–7:** resolve identity and rights, verify product facts and terms; validate shortlist demand with Norway targeting and capture controlled Google Norway mobile/desktop results. The 30 long-tail candidates are a research backlog, not proven low-competition terms.
2. **Days 8–14:** retain one owner per topic; decide whether verified subscription, device and catalogue content justifies dedicated pages; approve Norwegian copy and real policies.
3. **Days 15–30:** acquire domain, configure canonical host and production build, confirm real 404 handling, publish only approved content, add tested device guidance, and verify Search Console and consent-aware conversion measurement.
4. **Days 31–60:** publish test-backed guides and source-dated comparisons; add Article/BreadcrumbList only when real article/hierarchy pages exist; assess indexing and customer task completion.
5. **Days 61–90:** prioritize actual Norway query/page data, measured performance bottlenecks, refreshed catalogue/app facts, authentic feedback and legitimate editorial mentions. Revalidate long-tail opportunities before expanding.

## Sources checked during implementation

Research files supplied by the user remain the planning baseline. Technical decisions were checked against [Next.js static export documentation](https://nextjs.org/docs/app/guides/static-exports), [metadata documentation](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), [sitemap conventions](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) and [robots conventions](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

Technical copy draws on the [ITU definition of IPTV](https://www.itu.int/en/ITU-T/jca/iptv/Pages/tor.aspx), [Samsung app-store/model guidance](https://developer.samsung.com/tv-seller-office/faq/tv-seller-office-use.html) and [Allente's network setup guidance](https://www.allente.no/kundeservice/dekodere-og-utstyr/allente1-installasjon-stream/). These sources explain technology; they do not verify SpoteStream's product or rights. No new competitor-ranking claims or exact Google Norway positions were made.
