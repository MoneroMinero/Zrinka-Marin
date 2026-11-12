import P, { WHATSAPP } from "@/lib/postavke";
import { IkonaFacebook, IkonaInstagram, IkonaWhatsApp } from "./Ikone";

export default function Mreze({ className = "mreze" }) {
  const veze = [
    [P.facebook, "Facebook", <IkonaFacebook key="f" />],
    [P.instagram, "Instagram", <IkonaInstagram key="i" />],
    [WHATSAPP, "WhatsApp", <IkonaWhatsApp key="w" />]
  ].filter(([url]) => url);
  return (
    <div className={className}>
      {veze.map(([url, ime, ikona]) => (
        <a key={ime} href={url} target="_blank" rel="noopener" aria-label={ime}>{ikona}</a>
      ))}
    </div>
  );
}
