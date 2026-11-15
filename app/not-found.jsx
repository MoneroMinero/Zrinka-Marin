import Link from "next/link";

export const metadata = { title: "Stranica nije pronađena", robots: { index: false, follow: true } };

// Prikazuje se kad netko otvori adresu koja ne postoji (npr. stari ili krivo upisani link)
export default function NijePronadjeno() {
  return (
    <section className="stranica">
      <h1 className="naslov-stranice">Page not found</h1>
      <p className="broj">Ova stranica ne postoji ili je premještena</p>
      <p className="prozni">
        <Link href="/" style={{ textDecoration: "underline", textUnderlineOffset: 6 }}>Natrag na naslovnicu</Link>
        {" · "}
        <Link href="/work" style={{ textDecoration: "underline", textUnderlineOffset: 6 }}>Work</Link>
        {" · "}
        <Link href="/contact" style={{ textDecoration: "underline", textUnderlineOffset: 6 }}>Contact</Link>
      </p>
    </section>
  );
}
