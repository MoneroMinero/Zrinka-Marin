// =====================================================
//  POSTAVKE STRANICE — ovdje mijenjaš tekstove.
//  Mijenjaj samo tekst unutar navodnika "...".
//  Ako nešto ne želiš prikazati, ostavi prazne navodnike "".
// =====================================================
const postavke = {
  ime: "Zrinka i Marin",
  podnaslov: "Svečanosti · Proslave · Portret",

  oMeni: [
    "A short introduction goes here: who you are, where you are based, what you photograph.",
    "Second paragraph: who you have worked with, what kind of events you shoot, how to get in touch."
  ],

  email: "sostaric.marin@gmail.com",
  telefon: "+385 99 445 4677",
  telefon2: "+385 91 557 3778",
  whatsapp: "+385 99 445 4677",
  // Grupni WhatsApp link (https://chat.whatsapp.com/...). Dok je prazno, gumb vodi na broj iznad.
  whatsappGrupa: "",
  grad: "Zagreb, Croatia",

  // ---------- GOOGLE / SEO ----------
  // Glavna adresa weba, npr. "https://zrinkaimarin.hr". Kad je prazno, na Vercelu se
  // automatski koristi adresa projekta (xxx.vercel.app). Upiši čim dobiješ vlastitu domenu.
  adresaWeba: "",
  // Kod iz Google Search Console (metoda "HTML tag": samo vrijednost iz content="...").
  googleVerifikacija: "",
  // Opis koji Google prikazuje ispod naslova (do ~155 znakova).
  opis: "Zrinka i Marin — fotografi iz Zagreba. Fotografiranje vjenčanja, krštenja, pričesti i krizmi, rođendana i proslava te portreta diljem Hrvatske.",
  // Kratki opisi pojedinih galerija (za Google i dijeljenje na mrežama).
  opisKategorija: {
    svecanosti: "Fotografije svečanosti: vjenčanja, krštenja, pričesti i krizme. Zrinka i Marin, fotografi iz Zagreba.",
    proslave: "Fotografije proslava: rođendani, obljetnice i obiteljska okupljanja. Zrinka i Marin, fotografi iz Zagreba.",
    portret: "Portretna fotografija: obiteljski, osobni i poslovni portreti. Zrinka i Marin, fotografi iz Zagreba."
  },

  // Društvene mreže: cijela adresa profila. Dok je prazno, na Contact piše "Coming soon".
  facebook: "",
  instagram: "",

  // Koliko brzo se fotke vrte na naslovnici (sekunde za jedan krug; više = sporije)
  brzinaNaslovnice: 210
};

export default postavke;

export const WHATSAPP = /^https:\/\/chat\.whatsapp\.com\//.test(postavke.whatsappGrupa)
  ? postavke.whatsappGrupa
  : postavke.whatsapp ? "https://wa.me/" + postavke.whatsapp.replace(/\D/g, "") : "";
