import { Cormorant_Garamond, Montserrat } from "next/font/google";
import P from "@/lib/postavke";
import Zaglavlje from "@/components/Zaglavlje";
import LightboxProvider from "@/components/Lightbox";
import WhatsAppGumb from "@/components/WhatsAppGumb";
import { ADRESA, JsonLd, jsonLdPosao, jsonLdWeb, ogSlika } from "@/lib/seo";
import { fotke } from "@/lib/fotke";
import "./globals.css";

const cormorant = Cormorant_Garamond({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500", "600"], variable: "--font-montserrat", display: "swap" });

const naslovna = fotke("svecanosti")[0] || fotke("portret")[0];

export const metadata = {
  metadataBase: new URL(ADRESA),
  title: { default: `${P.ime} — fotograf vjenčanja, proslava i portreta | Zagreb`, template: `%s — ${P.ime}` },
  description: P.opis,
  applicationName: P.ime,
  authors: [{ name: P.ime }],
  creator: P.ime,
  keywords: ["fotograf Zagreb", "fotograf vjenčanja", "fotografiranje vjenčanja", "fotograf krštenje", "fotograf pričest", "fotograf krizma", "fotograf rođendan", "portretna fotografija", "obiteljsko fotografiranje", "Zrinka i Marin"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "hr_HR", siteName: P.ime, url: "/",
    title: `${P.ime} — ${P.podnaslov}`, description: P.opis, images: ogSlika(naslovna)
  },
  twitter: { card: "summary_large_image", title: `${P.ime} — ${P.podnaslov}`, description: P.opis },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: false },
  ...(P.googleVerifikacija || process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: P.googleVerifikacija || process.env.GOOGLE_SITE_VERIFICATION } } : {})
};
export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#333333" };

export default function RootLayout({ children }) {
  return (
    <html lang="hr" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body>
        <JsonLd podaci={[jsonLdPosao(), jsonLdWeb()]} />
        <LightboxProvider>
          <Zaglavlje />
          <main>{children}</main>
          <WhatsAppGumb />
          <footer className="podnozje">
            <span>© {new Date().getFullYear()} {P.ime}</span>
            <span>{P.podnaslov}</span>
          </footer>
        </LightboxProvider>
      </body>
    </html>
  );
}
