import P, { WHATSAPP } from "@/lib/postavke";
import KontaktObrazac from "@/components/KontaktObrazac";
import { meta } from "@/lib/seo";

export const metadata = meta({
  naslov: "Contact",
  opis: `Kontakt i upiti za fotografiranje: ${P.telefon}${P.telefon2 ? ", " + P.telefon2 : ""}, WhatsApp ili email. ${P.ime}, ${P.grad.split(",")[0]}.`,
  put: "/contact"
});
const tel = (s) => "tel:" + s.replace(/\s/g, "");

export default function Contact() {
  const ig = (P.instagram || "").replace(/\/+$/, "").split("/").pop();
  const fb = (P.facebook || "").replace(/[?#].*$/, "").replace(/\/+$/, "").split("/").pop();
  const uskoro = <span className="uskoro">Coming soon</span>;
  return (
    <section className="stranica">
      <h1 className="naslov-stranice" style={{ marginBottom: 48 }}>Contact</h1>
      <div className="dvostupac">
        <dl className="kontakt">
          {P.email && <div><dt>Email</dt><dd><a href={`mailto:${P.email}`}>{P.email}</a></dd></div>}
          {P.telefon && (
            <div><dt>Phone</dt><dd>
              <a className="broj" href={tel(P.telefon)}>{P.telefon}</a>
              {P.telefon2 && <><br /><a className="broj" href={tel(P.telefon2)}>{P.telefon2}</a></>}
            </dd></div>
          )}
          {WHATSAPP && <div><dt>WhatsApp</dt><dd><a href={WHATSAPP} target="_blank" rel="noopener">Send a message</a></dd></div>}
          <div><dt>Instagram</dt><dd>{ig ? <a href={P.instagram} target="_blank" rel="noopener">@{ig}</a> : uskoro}</dd></div>
          <div><dt>Facebook</dt><dd>{fb ? <a href={P.facebook} target="_blank" rel="noopener">{fb}</a> : uskoro}</dd></div>
          {P.grad && <div><dt>Based in</dt><dd>{P.grad}</dd></div>}
        </dl>
        <KontaktObrazac />
      </div>
    </section>
  );
}
