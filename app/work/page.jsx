import Image from "next/image";
import Link from "next/link";
import { KATEGORIJE, fotke } from "@/lib/fotke";

export const metadata = { title: "Work" };

export default function Work() {
  return (
    <section className="stranica">
      <h1 className="naslov-stranice">Work</h1>
      <p className="broj">Svečanosti · Proslave · Portret</p>
      <div className="kategorije">
        {KATEGORIJE.map((k) => {
          const prva = fotke(k.id)[0];
          return (
            <Link key={k.id} className="kategorija" href={`/work/${k.id}`}>
              {prva && <Image src={prva.src} alt="" width={prva.w} height={prva.h} loading="lazy" sizes="(max-width: 760px) 100vw, 33vw" />}
              <span>{k.naziv}</span><em>{fotke(k.id).length}</em>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
