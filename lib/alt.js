import P from "./postavke";

// tekst za alt atribut fotke (Google Slike + čitači ekrana)
const vrsta = { svecanosti: "Fotografija svečanosti", proslave: "Fotografija proslave", portret: "Portretna fotografija" };
export const altFotke = (f, i) => {
  const kat = f?.src?.split("/")[2];
  return `${vrsta[kat] || "Fotografija"}${i != null ? ` ${i + 1}` : ""} — ${P.ime}, ${P.grad.split(",")[0]}`;
};
