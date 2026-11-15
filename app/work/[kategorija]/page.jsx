import { notFound } from "next/navigation";
import Galerija from "@/components/Galerija";
import P from "@/lib/postavke";
import { KATEGORIJE, fotke, naziv } from "@/lib/fotke";
import { JsonLd, jsonLdGalerija, jsonLdMrvice, meta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => KATEGORIJE.map((k) => ({ kategorija: k.id }));
export async function generateMetadata({ params }) {
  const id = (await params).kategorija;
  return meta({ naslov: naziv(id), opis: P.opisKategorija?.[id], put: `/work/${id}`, slika: fotke(id)[0] });
}

export default async function Kategorija({ params }) {
  const { kategorija } = await params;
  if (!KATEGORIJE.some((k) => k.id === kategorija)) notFound();
  const lista = fotke(kategorija);
  return (
    <section className="stranica">
      <JsonLd podaci={[jsonLdGalerija(kategorija), jsonLdMrvice([[P.ime, "/"], ["Work", "/work"], [naziv(kategorija), `/work/${kategorija}`]])]} />
      <h1 className="naslov-stranice">{naziv(kategorija)}</h1>
      <p className="broj">{lista.length} {lista.length === 1 ? "photo" : "photos"}</p>
      {P.opisKategorija?.[kategorija] && <p className="skriveno">{P.opisKategorija[kategorija]}</p>}
      <Galerija fotke={lista} />
    </section>
  );
}
