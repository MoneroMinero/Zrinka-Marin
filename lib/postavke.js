// =====================================================
//  POSTAVKE STRANICE — ovdje mijenjaš tekstove.
//  Mijenjaj samo tekst unutar navodnika "...".
//  Ako nešto ne želiš prikazati, ostavi prazne navodnike "".
// =====================================================
const postavke = {
  ime: "Zrinka i Marin",
  podnaslov: "Svečanosti · Proslave · Portret",

  oMeni: [
    "Dva para očiju, četiri ruke i jedna cjelovita priča.",
    "Dok jedan od nas pažljivo prati ključne protokolarne trenutke – razmjenu prstenja, prvi ples, puhanje svjećica ili sam čin krštenja – drugi je neprimjetno u pozadini i lovi ono što se često ne vidi na prvi pogled: suzu radosnicu u kutu oka, iskreni smijeh kumova, zagrljaj bake i djeda ili spontanu igru djece.",
    "Kada radimo u paru, vi ne dobivate samo dvostruko više fotografija. Dobivate dvije različite perspektive istog trenutka i priču koja spaja svečanu tradiciju s iskrenim, neplaniranim emocijama."
  ],

  email: "sostaric.marin@gmail.com",
  telefon: "+385 99 445 4677",
  telefon2: "+385 91 557 3778",
  whatsapp: "+385 99 445 4677",
  // Grupni WhatsApp link (https://chat.whatsapp.com/...). Dok je prazno, gumb vodi na broj iznad.
  whatsappGrupa: "",
  grad: "Zagreb, Croatia",

  // ---------- GOOGLE / SEO ----------
  // ADRESA WEBA — JEDINO MJESTO gdje se upisuje domena.
  // Kad kupiš vlastitu domenu i spojiš je na Vercel, upiši je ovdje točno onako kako je
  // u Vercelu označena kao glavna (Primary), npr. "https://zrinkaimarin.hr" ili "https://www.zrinkaimarin.hr".
  // Iz ove adrese se sami slažu: Google adrese stranica (canonical), sitemap.xml, robots.txt,
  // slike za dijeljenje na Facebooku/WhatsAppu i preusmjeravanje sa starih adresa.
  adresaWeba: "https://multiframe.net",
  // Stare adrese weba. Čim gore upišeš novu domenu, posjetitelji i Google se s ovih adresa
  // automatski trajno preusmjeravaju na novu (ista podstranica), pa stari linkovi i dalje rade.
  stareAdrese: ["zrinka-marin.vercel.app"],
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
