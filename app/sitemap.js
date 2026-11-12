// /sitemap.xml — popis svih stranica i fotki za Google (slaže se sam)
import { KATEGORIJE, fotke, sveFotke } from "@/lib/fotke";
import { puna } from "@/lib/seo";

export default function sitemap() {
  const sad = new Date();
  const s = (put, prioritet, slike = []) => ({
    url: puna(put), lastModified: sad, changeFrequency: "monthly", priority: prioritet,
    images: slike.map((f) => puna(f.src))
  });
  return [
    s("/", 1, sveFotke().slice(0, 20)),
    s("/work", 0.9, KATEGORIJE.map((k) => fotke(k.id)[0]).filter(Boolean)),
    ...KATEGORIJE.map((k) => s(`/work/${k.id}`, 0.8, fotke(k.id))),
    s("/about", 0.6, fotke("portret").slice(0, 1)),
    s("/contact", 0.7)
  ];
}
