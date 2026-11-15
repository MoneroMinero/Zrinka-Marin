import { readFileSync } from "node:fs";

// Glavna adresa weba upisuje se samo u lib/postavke.js (adresaWeba). Ovdje se ta datoteka čita kao
// tekst, jer se ova konfiguracija pokreće prije nego što Next.js složi ostatak stranice.
const postavke = readFileSync(new URL("./lib/postavke.js", import.meta.url), "utf8");
const navodnici = (tekst) => [...(tekst || "").matchAll(/"([^"]*)"/g)].map((m) => m[1]);
const adresaWeba = (postavke.match(/^\s*adresaWeba:\s*"([^"]*)"/m) || [])[1] || "";
const stareAdrese = navodnici((postavke.match(/^\s*stareAdrese:\s*\[([^\]]*)\]/m) || [])[1]);

const ADRESA = (adresaWeba || process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");
const glavniHost = ADRESA ? new URL(ADRESA).host.toLowerCase() : "";
// stare adrese (npr. zrinka-marin.vercel.app) trajno preusmjeravamo na glavnu adresu, uz istu podstranicu
const stariHostovi = stareAdrese
  .map((a) => a.replace(/^https?:\/\//, "").replace(/\/.*$/, "").toLowerCase())
  .filter((h) => h && h !== glavniHost);

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    // Vercel automatski smanjuje fotke i šalje ih kao AVIF/WebP prema veličini ekrana
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 640, 828, 1080, 1200, 1600, 1920],
    qualities: [75, 85],
    // smanjene fotke se pamte 31 dan (brže učitavanje, manja potrošnja Vercelove kvote za slike)
    minimumCacheTTL: 2678400
  },
  async redirects() {
    if (!glavniHost) return [];
    return stariHostovi.map((host) => ({
      source: "/:put*",
      has: [{ type: "host", value: host }],
      destination: `${ADRESA}/:put*`,
      permanent: true
    }));
  },
  async headers() {
    return [
      {
        source: "/:put*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
        ]
      },
      // originalne fotke: preglednik ih pamti tjedan dana, Vercelov CDN mjesec dana
      { source: "/fotke/:put*", headers: [{ key: "Cache-Control", value: "public, max-age=604800, s-maxage=2592000, stale-while-revalidate=86400" }] }
    ];
  }
};
export default nextConfig;
