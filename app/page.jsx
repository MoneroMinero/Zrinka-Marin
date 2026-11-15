import Kolaz from "@/components/Kolaz";
import P from "@/lib/postavke";
import { sveFotke } from "@/lib/fotke";

export default function Naslovnica() {
  return (
    <>
      {/* glavni naslov za Google i čitače ekrana (vizualno skriven, dizajn naslovnice ostaje isti) */}
      <h1 className="skriveno">{P.ime} — fotografija svečanosti, proslava i portreta, {P.grad.split(",")[0]}</h1>
      <Kolaz fotke={sveFotke()} />
    </>
  );
}
