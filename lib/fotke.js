// Popis fotki se slaže automatski naredbom "npm run fotke" iz mapa u public/fotke/.
import podaci from "./fotke.json";

export const KATEGORIJE = [
  { id: "svecanosti", naziv: "Svečanosti" },
  { id: "proslave", naziv: "Proslave" },
  { id: "portret", naziv: "Portret" }
];

export const fotke = (id) => podaci[id] || [];
export const naziv = (id) => (KATEGORIJE.find((k) => k.id === id) || {}).naziv || "";

// naslovnica: sve fotke iz svih kategorija, po imenu datoteke
export const sveFotke = () =>
  KATEGORIJE.flatMap((k) => fotke(k.id))
    .filter((f, i, a) => a.findIndex((x) => x.src === f.src) === i)
    .sort((a, b) => a.src.split("/").pop().localeCompare(b.src.split("/").pop()));
