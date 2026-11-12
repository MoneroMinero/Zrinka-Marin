import Kolaz from "@/components/Kolaz";
import { sveFotke } from "@/lib/fotke";

export default function Naslovnica() {
  return <Kolaz fotke={sveFotke()} />;
}
