// Pokreni: npm run fotke
// Pročita mape public/fotke/svecanosti, proslave i portret i složi lib/fotke.json.
// Fotke koje su već bile na popisu zadržavaju redoslijed (prva fotka = naslovna slika kategorije),
// nove se dodaju na kraj po imenu. Fotke koje si obrisao iz mape nestaju s popisa.
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

const korijen = path.resolve(import.meta.dirname, "..");
const json = path.join(korijen, "lib/fotke.json");
const staro = fs.existsSync(json) ? JSON.parse(fs.readFileSync(json, "utf8")) : {};
const novo = {};

for (const kat of ["svecanosti", "proslave", "portret"]) {
  const mapa = path.join(korijen, "public/fotke", kat);
  fs.mkdirSync(mapa, { recursive: true });
  const datoteke = fs.readdirSync(mapa).filter((d) => /\.(jpe?g|png|webp|avif)$/i.test(d));
  const redoslijed = (staro[kat] || []).map((f) => f.src.split("/").pop());
  datoteke.sort((a, b) => {
    const ia = redoslijed.indexOf(a), ib = redoslijed.indexOf(b);
    if (ia >= 0 && ib >= 0) return ia - ib;
    if (ia >= 0) return -1;
    if (ib >= 0) return 1;
    return a.localeCompare(b);
  });
  novo[kat] = datoteke.map((d) => {
    const { width, height, orientation } = imageSize(fs.readFileSync(path.join(mapa, d)));
    const okrenuto = orientation && orientation >= 5;
    return { src: `/fotke/${kat}/${d}`, w: okrenuto ? height : width, h: okrenuto ? width : height };
  });
  console.log(`${kat}: ${novo[kat].length} fotki`);
}
fs.writeFileSync(json, JSON.stringify(novo, null, 1) + "\n");
console.log("Spremljeno u lib/fotke.json");
