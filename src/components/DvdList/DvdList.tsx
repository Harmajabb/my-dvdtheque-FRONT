import type { Dvd } from "../../types";
import DvdCard from "../DvdCard/DvdCard";
import { Reveal } from "../Reveal/Reveal";

interface DvdListProps {
  dvds: Dvd[];
}

function DvdList({ dvds }: DvdListProps) {
  if (dvds.length === 0) {
    return (
      <output className="block text-center py-16">
        <p className="text-xl text-zinc-600">Aucun DVD dans votre collection</p>
      </output>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {dvds.map((dvd, index) => (
        <Reveal
          key={dvd.id}
          variant="fade-in-up"
          delay={Math.min(index * 100, 800)}
        >
          <DvdCard dvd={dvd} />
        </Reveal>
      ))}
    </div>
  );
}

export default DvdList;
