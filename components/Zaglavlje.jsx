"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import P from "@/lib/postavke";
import { KATEGORIJE } from "@/lib/fotke";
import Mreze from "./Mreze";

export default function Zaglavlje() {
  const put = usePathname();
  const [otvoren, setOtvoren] = useState(false);
  const [puno, setPuno] = useState(false);

  useEffect(() => {
    const naSkrol = () => setPuno(window.scrollY > 40);
    naSkrol();
    window.addEventListener("scroll", naSkrol, { passive: true });
    return () => window.removeEventListener("scroll", naSkrol);
  }, []);
  useEffect(() => setOtvoren(false), [put]);

  const akt = (href) => (put === href || (href === "/work" && put.startsWith("/work")) ? "aktivno" : undefined);

  return (
    <header className={"zaglavlje" + (puno ? " puno" : "")}>
      <Link className="ime" href="/">{P.ime}</Link>
      <nav className={"izbornik" + (otvoren ? " otvoren" : "")} id="izbornik">
        <div className="work">
          <Link href="/work" className={akt("/work")}>Work</Link>
          <div className="podizbornik">
            {KATEGORIJE.map((k) => (
              <Link key={k.id} href={`/work/${k.id}`} className={akt(`/work/${k.id}`)}>{k.naziv}</Link>
            ))}
          </div>
        </div>
        <Link href="/about" className={akt("/about")}>About</Link>
        <Link href="/contact" className={akt("/contact")}>Contact</Link>
        <Mreze className="mreze mreze-mobitel" />
      </nav>
      <Mreze />
      <button className="hamburger" aria-expanded={otvoren} aria-controls="izbornik" onClick={() => setOtvoren(!otvoren)}>
        {otvoren ? "Close" : "Menu"}
      </button>
    </header>
  );
}
