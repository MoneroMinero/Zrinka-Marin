// Pomoćne stvari za Google (SEO): adresa weba, opisi, strukturirani podaci.
import P from "./postavke";
import { KATEGORIJE, fotke, naziv } from "./fotke";
import { altFotke } from "./alt";
export { altFotke };

// Redoslijed: postavke.js → varijabla NEXT_PUBLIC_SITE_URL → Vercel produkcijska adresa → localhost
export const ADRESA = (
  P.adresaWeba ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  "http://localhost:3000"
).replace(/\/+$/, "");

export const puna = (put = "/") => ADRESA + put;


// Open Graph slika (dijeljenje na Facebooku, WhatsAppu…)
export const ogSlika = (f) => (f ? [{ url: f.src, width: f.w, height: f.h, alt: altFotke(f) }] : undefined);

// metapodaci za pojedinu stranicu
export function meta({ naslov, opis = P.opis, put, slika = fotke("svecanosti")[0] }) {
  return {
    title: naslov,
    description: opis,
    alternates: { canonical: put },
    openGraph: { type: "website", locale: "hr_HR", siteName: P.ime, title: naslov ? `${naslov} — ${P.ime}` : P.ime, description: opis, url: put, images: ogSlika(slika) },
    twitter: { card: "summary_large_image", title: naslov ? `${naslov} — ${P.ime}` : P.ime, description: opis }
  };
}

// Strukturirani podaci (schema.org) — Google iz ovoga zna da je ovo fotografski obrt, gdje radi i kako ga dobiti.
export function jsonLdPosao() {
  const sameAs = [P.instagram, P.facebook].filter(Boolean);
  const slika = fotke("svecanosti")[0] || fotke("portret")[0];
  const [mjesto, drzava] = P.grad.split(",").map((s) => s.trim());
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": puna("/#posao"),
    name: P.ime,
    description: P.opis,
    url: puna("/"),
    image: slika ? puna(slika.src) : undefined,
    email: P.email || undefined,
    telephone: P.telefon || undefined,
    contactPoint: [P.telefon, P.telefon2].filter(Boolean).map((t) => ({
      "@type": "ContactPoint", telephone: t.replace(/\s/g, ""), contactType: "customer service",
      availableLanguage: ["hr", "en"]
    })),
    address: { "@type": "PostalAddress", addressLocality: mjesto, addressCountry: drzava === "Croatia" ? "HR" : drzava },
    areaServed: { "@type": "Country", name: "Hrvatska" },
    knowsAbout: ["fotografija vjenčanja", "fotografija krštenja", "fotografija proslava", "portretna fotografija"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Fotografske usluge",
      itemListElement: KATEGORIJE.map((k) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: `Fotografija — ${naziv(k.id)}`, description: P.opisKategorija?.[k.id], url: puna(`/work/${k.id}`) }
      }))
    },
    sameAs: sameAs.length ? sameAs : undefined
  };
}

export function jsonLdWeb() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": puna("/#web"),
    name: P.ime,
    url: puna("/"),
    inLanguage: "hr",
    publisher: { "@id": puna("/#posao") }
  };
}

export function jsonLdGalerija(id) {
  const lista = fotke(id);
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${naziv(id)} — ${P.ime}`,
    description: P.opisKategorija?.[id],
    url: puna(`/work/${id}`),
    inLanguage: "hr",
    author: { "@id": puna("/#posao") },
    image: lista.map((f, i) => ({
      "@type": "ImageObject", contentUrl: puna(f.src), width: f.w, height: f.h,
      caption: altFotke(f, i), creator: { "@type": "Organization", name: P.ime },
      copyrightNotice: `© ${P.ime}`, creditText: P.ime
    }))
  };
}

export function jsonLdMrvice(stavke) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: stavke.map(([ime, put], i) => ({ "@type": "ListItem", position: i + 1, name: ime, item: puna(put) }))
  };
}

// <script type="application/ld+json"> — "<" se escapea da tekst ne može zatvoriti skriptu
export function JsonLd({ podaci }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(podaci).replace(/</g, "\\u003c") }} />;
}
