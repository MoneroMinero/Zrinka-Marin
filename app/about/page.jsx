import Image from "next/image";
import P from "@/lib/postavke";
import { fotke } from "@/lib/fotke";
import { altFotke, meta } from "@/lib/seo";

export const metadata = meta({
  naslov: "About",
  opis: `O nama: ${P.ime}, fotografi iz Zagreba. Fotografiramo svečanosti, proslave i portrete diljem Hrvatske.`,
  put: "/about",
  slika: fotke("portret")[0]
});

export default function About() {
  const slika = fotke("portret")[0];
  return (
    <section className="stranica">
      <h1 className="naslov-stranice">About</h1>
      <p className="broj">{P.podnaslov}</p>
      <div className="dvostupac">
        <div className="prozni">{P.oMeni.map((p, i) => <p key={i}>{p}</p>)}</div>
        {slika && <Image src={slika.src} alt={`${P.ime} — ${altFotke(slika)}`} width={slika.w} height={slika.h} loading="lazy" sizes="(max-width: 760px) 100vw, 50vw" />}
      </div>
    </section>
  );
}
