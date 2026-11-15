"use client";
import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import P from "@/lib/postavke";
import { useLightbox } from "./Lightbox";
import { altFotke } from "@/lib/alt";

// Fotke se raspodijele u stupce podjednake visine; srednji stupac dobije više fotki pa se vrti brže.
function rasporedi(lista, n) {
  const tezina = n === 3 ? [1, 1.45, 1] : [1, 1.35];
  const stupci = Array.from({ length: n }, () => ({ fotke: [], vis: 0 }));
  [...lista].sort((a, b) => b.h / b.w - a.h / a.w).forEach((f) => {
    let k = 0;
    for (let j = 1; j < n; j++) if (stupci[j].vis / tezina[j] < stupci[k].vis / tezina[k]) k = j;
    stupci[k].fotke.push(f); stupci[k].vis += f.h / f.w;
  });
  // promiješaj unutar stupca (uvijek isto, da server i preglednik slože jednako)
  let sjeme = 12345;
  const slucajno = () => ((sjeme = (sjeme * 16807) % 2147483647) / 2147483647);
  stupci.forEach((s) => s.fotke.sort(() => slucajno() - 0.5));
  // redoslijed za povećanje: red po red preko stupaca
  const h = [], liste = Array.from({ length: n }, () => []);
  for (let r = 0; stupci.some((s) => r < s.fotke.length); r++)
    stupci.forEach((s, k) => { if (r < s.fotke.length) { liste[k].push(h.length); h.push(s.fotke[r]); } });
  return { h, liste };
}

const useIsoEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function Kolaz({ fotke }) {
  const otvori = useLightbox();
  const [n, setN] = useState(3);
  const [mirno, setMirno] = useState(false);
  const kolaz = useRef(null);
  const { h, liste } = useMemo(() => rasporedi(fotke, n), [fotke, n]);

  useIsoEffect(() => {
    setMirno(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const postavi = () => setN(window.innerWidth < 700 ? 2 : 3);
    postavi();
    let t;
    const naVelicinu = () => { clearTimeout(t); t = setTimeout(postavi, 150); };
    window.addEventListener("resize", naVelicinu);
    return () => window.removeEventListener("resize", naVelicinu);
  }, []);

  // stupci se pomiču različitom brzinom dok skrolaš
  useEffect(() => {
    const el = kolaz.current;
    if (!el) return;
    const stupci = [...el.querySelectorAll(".kolaz-stupac")];
    let visine = [], hMin = 0, vrh = 0;
    const pomakni = () => {
      if (mirno) return;
      const raspon = Math.max(1, hMin - window.innerHeight);
      const napredak = Math.min(1, Math.max(0, (window.scrollY - vrh) / raspon));
      stupci.forEach((s, i) => { s.style.transform = `translate3d(0, ${-(visine[i] - hMin) * napredak}px, 0)`; });
    };
    const izmjeri = () => {
      el.style.height = "";
      stupci.forEach((s) => (s.style.transform = ""));
      visine = stupci.map((s) => {
        const t = s.firstElementChild;
        if (mirno || !t) return s.scrollHeight;
        const g = parseFloat(getComputedStyle(t).rowGap) || 12;
        const krug = (t.scrollHeight + g) / 2;
        t.style.setProperty("--pomak", -krug + "px");
        return krug - g;
      });
      hMin = Math.min(...visine);
      el.style.height = (mirno ? Math.max(...visine) : hMin) + "px";
      vrh = el.getBoundingClientRect().top + window.scrollY;
      pomakni();
    };
    let ceka = false;
    const naSkrol = () => { if (!ceka) { ceka = true; requestAnimationFrame(() => { ceka = false; pomakni(); }); } };
    const ro = new ResizeObserver(izmjeri);
    stupci.forEach((s) => ro.observe(s.firstElementChild));
    izmjeri();
    window.addEventListener("scroll", naSkrol, { passive: true });
    return () => { ro.disconnect(); window.removeEventListener("scroll", naSkrol); };
  }, [n, mirno, h]);

  if (!fotke.length) return <p className="prazno stranica">Dodaj fotke u public/fotke.</p>;

  const sizes = n === 3 ? "(max-width: 699px) 50vw, 33vw" : "50vw";
  return (
    <section className="kolaz" ref={kolaz} aria-label="Selected photographs" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
      {liste.map((l, k) => {
        const kartice = (kopija) => l.map((i) => (
          <button key={(kopija ? "b" : "a") + i} aria-label="Enlarge" tabIndex={kopija ? -1 : 0} aria-hidden={kopija || undefined}
            style={{ aspectRatio: `${h[i].w}/${h[i].h}` }} onClick={() => otvori(h, i)}>
            {/* prvih nekoliko fotki se učita odmah, ostale tek kad se približe ekranu (lazy loading) */}
            <Image src={h[i].src} alt={kopija ? "" : altFotke(h[i])} width={h[i].w} height={h[i].h} sizes={sizes}
              loading={!kopija && i < 6 ? "eager" : "lazy"} fetchPriority={!kopija && i < 3 ? "high" : undefined} />
          </button>
        ));
        return (
          <div className="kolaz-stupac" key={k}>
            <div className={"kolaz-traka" + (mirno ? "" : " vrti")} style={mirno ? undefined : { animationDuration: `${+P.brzinaNaslovnice || 60}s` }}>
              {kartice(false)}
              {!mirno && kartice(true)}
            </div>
          </div>
        );
      })}
    </section>
  );
}
