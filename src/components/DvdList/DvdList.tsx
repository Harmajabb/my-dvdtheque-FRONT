import type { Dvd } from "../../types";
import DvdCard from "../DvdCard/DvdCard";

//waiting for a dvd tab
interface DvdListProps {
  dvds: Dvd[];
}

function DvdList({ dvds }: DvdListProps) {
  if (dvds.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-zinc-600">Aucun DVD dans votre collection</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {/* transform each dvd in a dvdCard component */}
      {dvds.map((dvd) => (
        // key={dvd.id} for re-render
        // dvd={dvd} for prop the children
        <DvdCard key={dvd.id} dvd={dvd} />
      ))}
    </div>
  );
}

export default DvdList;
