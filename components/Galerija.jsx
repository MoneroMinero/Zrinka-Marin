"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLightbox } from "./Lightbox";
import { altFotke } from "@/lib/alt";

export default function Galerija({ fotke }) {
  const otvori = useLightbox();
  const ref = useRef(null);

  // fotke lagano izrone kad dođu u kadar
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".ulaz") || [];
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("u-kadru")); return; }
    const io = new IntersectionObserver((ent) => ent.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("u-kadru"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -5% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [fotke]);

  if (!fotke.length) return <p className="prazno">No photos here yet.</p>;
  return (
    <div className="galerija tri-stupca" ref={ref}>
      {fotke.map((f, i) => (
        <button key={f.src} className="ulaz" style={{ aspectRatio: `${f.w}/${f.h}` }} aria-label={`Enlarge: ${altFotke(f, i)}`} onClick={() => otvori(fotke, i)}>
          {/* next/image: lazy loading + automatski manje verzije fotke za mobitel */}
          <Image src={f.src} alt={altFotke(f, i)} width={f.w} height={f.h} loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw" />
        </button>
      ))}
    </div>
  );
}
