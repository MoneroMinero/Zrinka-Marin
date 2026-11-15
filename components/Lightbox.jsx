"use client";
import Image from "next/image";
import { altFotke } from "@/lib/alt";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const Kontekst = createContext(() => {});
export const useLightbox = () => useContext(Kontekst);

export default function LightboxProvider({ children }) {
  const [lista, setLista] = useState([]);
  const [i, setI] = useState(0);
  const [otvoren, setOtvoren] = useState(false);
  const prije = useRef(null);
  const zatvoriGumb = useRef(null);
  const x0 = useRef(null);

  const otvori = useCallback((l, n) => {
    prije.current = document.activeElement;
    setLista(l); setI(n); setOtvoren(true);
  }, []);
  const zatvori = useCallback(() => {
    setOtvoren(false);
    prije.current?.focus?.();
  }, []);
  const korak = useCallback((d) => setI((x) => (x + d + lista.length) % lista.length), [lista.length]);

  useEffect(() => {
    document.body.style.overflow = otvoren ? "hidden" : "";
    if (otvoren) zatvoriGumb.current?.focus();
    if (!otvoren) return;
    const tipke = (e) => {
      if (e.key === "Escape") zatvori();
      if (e.key === "ArrowLeft") korak(-1);
      if (e.key === "ArrowRight") korak(1);
    };
    document.addEventListener("keydown", tipke);
    return () => document.removeEventListener("keydown", tipke);
  }, [otvoren, zatvori, korak]);

  const f = lista[i];
  const sljedeca = lista.length ? lista[(i + 1) % lista.length] : null;

  return (
    <Kontekst.Provider value={otvori}>
      {children}
      <div
        className={"lightbox" + (otvoren ? " otvoren" : "")}
        role="dialog" aria-modal="true" aria-label="Photo" aria-hidden={!otvoren}
        onTouchStart={(e) => { x0.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (x0.current === null) return;
          const dx = e.changedTouches[0].clientX - x0.current;
          if (Math.abs(dx) > 50) korak(dx < 0 ? 1 : -1);
          x0.current = null;
        }}
      >
        <div className="lb-vrh">
          <span>{lista.length ? `${i + 1} / ${lista.length}` : ""}</span>
          <button className="lb-zatvori" ref={zatvoriGumb} onClick={zatvori}>Close ✕</button>
        </div>
        <div className="lb-slika" onClick={(e) => { if (e.target === e.currentTarget) zatvori(); }}>
          <button className="lb-strelica lb-prije" aria-label="Previous" onClick={() => korak(-1)}>←</button>
          {otvoren && f && (
            <Image
              key={f.src} src={f.src} alt={altFotke(f, i)} width={f.w} height={f.h}
              sizes="100vw" quality={85} loading="eager"
              onClick={(e) => korak(e.clientX < window.innerWidth / 3 ? -1 : 1)}
            />
          )}
          {/* sljedeća fotka se tiho učita unaprijed da listanje bude trenutno */}
          {otvoren && sljedeca && sljedeca !== f && (
            <Image src={sljedeca.src} alt="" width={sljedeca.w} height={sljedeca.h} sizes="100vw" quality={85}
              loading="eager" style={{ visibility: "hidden", pointerEvents: "none" }} aria-hidden="true" />
          )}
          <button className="lb-strelica lb-poslije" aria-label="Next" onClick={() => korak(1)}>→</button>
        </div>
      </div>
    </Kontekst.Provider>
  );
}
