# Purchased domain configuration — 14 October 2026

The owner confirmed purchase of **besteiptvinorge.com**. The canonical origin is **https://besteiptvinorge.com**, without `www`.

`.env.production` records the public origin for production builds. The ignored `.env.local` also configures local development and keeps `SITE_ENV=staging` and `SEO_INDEXING=false`. `.env.example` now includes the purchased origin.

The existing SEO code uses this setting for homepage canonical, Open Graph page/image URLs, Twitter image URL and WebSite JSON-LD. When indexing is enabled for launch, the sitemap homepage URL and robots sitemap reference use the same origin automatically. The current noindex build intentionally has an empty sitemap.

Purchasing a domain does not resolve the previous business-fact review or publish the site. Indexing remains disabled. To launch after review, explicitly set `SITE_ENV=production` and `SEO_INDEXING=true`, rebuild, and publish `out/`. Local `.env.local` settings override `.env.production`; update them or use explicit build environment variables when preparing the launch build.

DNS, hosting, HTTPS certificates and a `www` → canonical-host redirect must be configured at the registrar/host. No DNS changes or public deployment were performed. The owner subsequently requested replacing the old branding: the website now uses **Beste IPTV i Norge**, matching the domain, in its logos, customer-facing copy, metadata and sharing image. The play icon and existing colors were retained. This branding update resolves the previous SpoteStream/KooraLive mismatch; it does not assert a legal company identity or verified service claims.

This update supersedes the “no domain available” status in the earlier SEO audit, while its outstanding product/rights/branding tasks remain applicable.

Verification: static build and TypeScript passed. The SEO check confirms the purchased origin in rendered canonical, Open Graph URL/image, Twitter image and WebSite JSON-LD; default noindex/empty sitemap and 404 checks also pass. Next.js serializes root canonical/OG URLs without a trailing slash, which resolves to the same homepage URL.
