import { Cormorant_Garamond, Montserrat } from "next/font/google";
import P from "@/lib/postavke";
import Zaglavlje from "@/components/Zaglavlje";
import LightboxProvider from "@/components/Lightbox";
import WhatsAppGumb from "@/components/WhatsAppGumb";
import "./globals.css";

const cormorant = Cormorant_Garamond({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500", "600"], variable: "--font-montserrat", display: "swap" });

export const metadata = {
  title: { default: `${P.ime} — ${P.podnaslov}`, template: `%s — ${P.ime}` },
  description: `${P.ime}: fotografija svečanosti, proslava i portreta. ${P.grad}.`
};
export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#333333" };

export default function RootLayout({ children }) {
  return (
    <html lang="hr" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body>
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
