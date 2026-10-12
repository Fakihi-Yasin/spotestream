import type { Metadata } from "next";

// Static export: these settings are evaluated at BUILD time, never per request.
const rawUrl = process.env.SITE_URL?.trim();
function productionOrigin(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password ||
      url.pathname !== "/" || url.search || url.hash ||
      /^(localhost|127\.|\[::1\])/.test(url.hostname)) {
    throw new Error("SITE_URL must be a public HTTPS origin without path, credentials, query or fragment.");
  }
  return url.origin;
}
export const siteUrl = productionOrigin(rawUrl);
export const indexable = process.env.SITE_ENV === "production" && process.env.SEO_INDEXING === "true";
if (indexable && !siteUrl) throw new Error("Indexable production builds require SITE_URL.");

export const homeTitle = "IPTV i Norge – abonnement og oppsett | SpoteStream";
export const homeDescription = "Vurderer du TV over internett? Finn informasjon om abonnement, enheter og oppsett hos SpoteStream, og spørsmål du bør avklare før du bestiller.";

export const siteMetadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: homeTitle,
  description: homeDescription,
  robots: { index: indexable, follow: true },
  openGraph: {
    title: homeTitle, description: homeDescription, siteName: "SpoteStream",
    locale: "nb_NO", type: "website",
    ...(siteUrl ? { images: [{ url: `${siteUrl}/social-card.png`, width: 1200, height: 630, alt: "SpoteStream" }] } : {}),
  },
  twitter: { card: "summary_large_image", title: homeTitle, description: homeDescription,
    ...(siteUrl ? { images: [`${siteUrl}/social-card.png`] } : {}),
  },
  icons: { icon: "/logo/logo.png" },
};

export const homeMetadata: Metadata = {
  ...siteMetadata,
  ...(siteUrl ? { alternates: { canonical: `${siteUrl}/` },
    openGraph: { ...siteMetadata.openGraph, url: `${siteUrl}/` } } : {}),
};
