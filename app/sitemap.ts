import type { MetadataRoute } from "next";
import { indexable, siteUrl } from "@/lib/seo";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return indexable && siteUrl ? [{ url: `${siteUrl}/` }] : [];
}
