import { Link } from "react-router-dom";
import type { Dvd } from "../../types";

// will receive the type Dvd by a props
interface DvdCardProps {
  dvd: Dvd;
}

function DvdCard({ dvd }: DvdCardProps) {
  // for img if no dvd.image_url then use the placeholder
  const imageUrl = dvd.image_url || "/placeholder.svg";

  return (
    //go to the DvdDetail
    <Link to={`/dvd/${dvd.id}`} className="block" tabIndex={0}>
      <div className="card hover:scale-105 transition-transform">
        <img
          src={imageUrl}
          alt={dvd.titre}
          className="w-full aspect-[2/3] object-cover rounded-lg mb-4"
          //it allows to stop an infinite loop if the img doesn't charge
          //then replace with img placeholder instead
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            if (!img.src.endsWith("/placeholder.svg")) {
              img.src = "/placeholder.svg";
            }
          }}
        />
        <div className="text-left">
          <h3 className="text-xl font-bold text-accent mb-2 truncate">
            {dvd.titre}
          </h3>
          {/* if no real for example then do not render */}
          {dvd.realisateur && (
            <p className="text-zinc-300 text-sm mb-1">{dvd.realisateur}</p>
          )}
          {dvd.annee && (
            <p className="text-zinc-500 text-sm mb-2">{dvd.annee}</p>
          )}
          {dvd.genre && (
            <span className="inline-block bg-accent text-white text-xs px-3 py-1 rounded-full font-semibold">
              {dvd.genre}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default DvdCard;
