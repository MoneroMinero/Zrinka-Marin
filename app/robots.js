// /robots.txt — dopušta Googleu sve i pokazuje mu gdje je sitemap
import { puna } from "@/lib/seo";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: puna("/sitemap.xml")
  };
}
