// /manifest.webmanifest — ime i boje stranice kad je netko spremi na početni zaslon mobitela
import P from "@/lib/postavke";

export default function manifest() {
  return {
    name: `${P.ime} — ${P.podnaslov}`,
    short_name: P.ime,
    description: P.opis,
    start_url: "/",
    display: "standalone",
    background_color: "#333333",
    theme_color: "#333333",
    lang: "hr",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }]
  };
}
