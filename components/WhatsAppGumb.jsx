import { WHATSAPP } from "@/lib/postavke";
import { IkonaWhatsApp } from "./Ikone";

export default function WhatsAppGumb() {
  if (!WHATSAPP) return null;
  return (
    <a className="whatsapp" href={WHATSAPP} target="_blank" rel="noopener" aria-label="Message me on WhatsApp">
      <IkonaWhatsApp /><span>WhatsApp</span>
    </a>
  );
}
