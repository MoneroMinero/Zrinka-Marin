"use client";
import { useState } from "react";
import P from "@/lib/postavke";

const MJESECI = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const formatDatuma = (d) => `${d.getDate()} ${MJESECI[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
const UPUTA = "Click a day — click a second day to select several days in a row (optional).";

export default function KontaktObrazac() {
  const danas = new Date(); danas.setHours(0, 0, 0, 0);
  const [mjesec, setMjesec] = useState(() => new Date(danas.getFullYear(), danas.getMonth(), 1));
  const [pocetak, setPocetak] = useState(null);
  const [kraj, setKraj] = useState(null);
  const [obavijest, setObavijest] = useState("");

  const opisOdabira = () => {
    if (!kraj) return formatDatuma(pocetak);
    const n = Math.round((kraj - pocetak) / 86400000) + 1;
    return `${formatDatuma(pocetak)} – ${formatDatuma(kraj)} (${n} days)`;
  };
  const klikDan = (d) => {
    if (pocetak && !kraj && d.getTime() === pocetak.getTime()) setPocetak(null);
    else if (!pocetak || kraj || d < pocetak) { setPocetak(d); setKraj(null); }
    else setKraj(d);
  };

  const god = mjesec.getFullYear(), m = mjesec.getMonth();
  const dana = new Date(god, m + 1, 0).getDate();
  const prvi = (new Date(god, m, 1).getDay() + 6) % 7;
  const unatrag = mjesec.getTime() > new Date(danas.getFullYear(), danas.getMonth(), 1).getTime();

  const posalji = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    const ime = f.ime.value.trim(), mail = f.mail.value.trim();
    if (!ime || !/^\S+@\S+\.\S+$/.test(mail)) {
      setObavijest("Please enter your name and a valid email address.");
      (ime ? f.mail : f.ime).focus();
      return;
    }
    const tijelo = `Name: ${ime}\nPhone: ${f.telefon.value.trim()}\nEmail: ${mail}` +
      (pocetak ? `\nPreferred date${kraj ? "s" : ""}: ${opisOdabira()}` : "") + `\n\n${f.poruka.value.trim()}`;
    location.href = `mailto:${P.email}?subject=${encodeURIComponent("Website inquiry: " + ime)}&body=${encodeURIComponent(tijelo)}`;
    setObavijest(`Your email app should open with the message ready. If it doesn't, write to ${P.email}.`);
  };

  return (
    <form className="obrazac" noValidate onSubmit={posalji}>
      <div className="polje"><label htmlFor="f-ime">Your name</label><input id="f-ime" name="ime" required autoComplete="name" /></div>
      <div className="polje"><label htmlFor="f-tel">Phone</label><input id="f-tel" name="telefon" type="tel" autoComplete="tel" /></div>
      <div className="polje"><label htmlFor="f-mail">Email</label><input id="f-mail" name="mail" type="email" required autoComplete="email" /></div>
      <div className="polje"><label htmlFor="f-poruka">Message</label><textarea id="f-poruka" name="poruka" rows={4} /></div>
      <div className="polje">
        <label id="kal-naslov">Preferred dates</label>
        <div className="kalendar" role="group" aria-labelledby="kal-naslov">
          <div className="kal-vrh">
            <button type="button" className="kal-strelica" aria-label="Previous month" disabled={!unatrag} onClick={() => setMjesec(new Date(god, m - 1, 1))}>←</button>
            <span suppressHydrationWarning>{MJESECI[m]} {god}</span>
            <button type="button" className="kal-strelica" aria-label="Next month" onClick={() => setMjesec(new Date(god, m + 1, 1))}>→</button>
          </div>
          <div className="kal-mreza" suppressHydrationWarning>
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i} className="kal-dan-ime">{d}</span>)}
            {Array.from({ length: prvi }, (_, i) => <span key={"p" + i} />)}
            {Array.from({ length: dana }, (_, i) => {
              const d = new Date(god, m, i + 1), t = d.getTime();
              const klase = ["kal-dan",
                t === danas.getTime() ? "kal-danas" : "",
                (pocetak && t === pocetak.getTime()) || (kraj && t === kraj.getTime()) ? "kal-odabran" : "",
                pocetak && kraj && t > pocetak.getTime() && t < kraj.getTime() ? "kal-raspon" : ""].join(" ").trim();
              return <button type="button" key={i} className={klase} disabled={d < danas} onClick={() => klikDan(d)} suppressHydrationWarning>{i + 1}</button>;
            })}
          </div>
        </div>
        <p className="odabrani-datum">
          {pocetak ? `Selected: ${opisOdabira()}${kraj ? "" : " — click a later day if you need several days."}` : UPUTA}
        </p>
      </div>
      <button type="submit" className="posalji">Send</button>
      <p className="obavijest" role="status">{obavijest}</p>
    </form>
  );
}
