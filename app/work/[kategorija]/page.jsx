import { notFound } from "next/navigation";
import Galerija from "@/components/Galerija";
import { KATEGORIJE, fotke, naziv } from "@/lib/fotke";

export const dynamicParams = false;
export const generateStaticParams = () => KATEGORIJE.map((k) => ({ kategorija: k.id }));
export async function generateMetadata({ params }) {
  return { title: naziv((await params).kategorija) };
}

export default async function Kategorija({ params }) {
  const { kategorija } = await params;
  if (!KATEGORIJE.some((k) => k.id === kategorija)) notFound();
  const lista = fotke(kategorija);
  return (
    <section className="stranica">
      <h1 className="naslov-stranice">{naziv(kategorija)}</h1>
      <p className="broj">{lista.length} {lista.length === 1 ? "photo" : "photos"}</p>
      <Galerija fotke={lista} />
    </section>
  );
}
