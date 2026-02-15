import { Film, Hourglass, Search, Star, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  convertTmdbToFormData,
  getMovieDetails,
  searchMovies,
  type TmdbMovie,
} from "../../services/tmbd";

interface MovieSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (movieData: Record<string, string>) => void;
  initialQuery: string;
}

function MovieSearchModal({
  isOpen,
  onClose,
  onSelect,
  initialQuery,
}: MovieSearchModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<TmdbMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      setQuery(initialQuery);
      dialog.showModal();
      closeRef.current?.focus();
    } else {
      dialog.close();
    }
  }, [isOpen, initialQuery]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      setLoading(true);
      setError("");
      const movies = await searchMovies(query);
      setResults(movies);
    } catch (err) {
      setError("Erreur lors de la recherche");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = async (movie: TmdbMovie) => {
    try {
      setLoading(true);
      setError("");

      const details = await getMovieDetails(movie.id);
      const formData = convertTmdbToFormData(details);

      onSelect(formData);
      onClose();
    } catch (err) {
      setError("Erreur lors de la recuperation des details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="movie-search-title"
      onClose={onClose}
      className="bg-zinc-800 text-white rounded-lg shadow-2xl p-0 max-w-2xl w-full max-h-[80vh] backdrop:bg-black/80"
    >
      {/* Header */}
      <div className="sticky top-0 bg-zinc-800 border-b border-zinc-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 id="movie-search-title" className="text-2xl font-bold text-white">
            Rechercher un film
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors p-1 rounded-md hover:bg-zinc-700"
            aria-label="Fermer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Titre du film..."
            className="form-input flex-1 bg-zinc-700 border-zinc-600 text-white"
          />
          <button
            type="button"
            onClick={handleSearch}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? <Hourglass size={24} /> : <Search size={24} />}{" "}
            Rechercher
          </button>
        </div>

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>

      {/* Résultats */}
      <div className="p-6">
        {loading ? (
          <p className="text-center text-zinc-400">Recherche en cours...</p>
        ) : results.length === 0 ? (
          <p className="text-center text-zinc-400">
            Tapez un titre et cliquez sur Rechercher
          </p>
        ) : (
          <div className="space-y-4">
            {results.map((movie) => (
              <button
                key={movie.id}
                type="button"
                onClick={() => handleSelectMovie(movie)}
                className="w-full flex gap-4 p-4 bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors text-left"
              >
                {/* Poster */}
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                    className="w-16 h-24 object-cover rounded"
                  />
                ) : (
                  <div className="w-16 h-24 bg-zinc-800 rounded flex items-center justify-center text-zinc-600">
                    <Film size={20} aria-hidden="true" />
                  </div>
                )}

                {/* Infos */}
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg mb-1">
                    {movie.title}
                  </h3>
                  {movie.original_title !== movie.title && (
                    <p className="text-zinc-400 text-sm mb-2 italic">
                      {movie.original_title}
                    </p>
                  )}
                  <p className="text-zinc-400 text-sm mb-2">
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : "?"}
                  </p>
                  <p className="text-zinc-300 text-sm line-clamp-2">
                    {movie.overview || "Aucun synopsis disponible"}
                  </p>
                </div>

                {/* Note */}
                <div className="flex flex-col items-center justify-center">
                  <div className="text-yellow-500 text-2xl font-bold">
                    <Star size={24} />
                  </div>
                  <div className="text-white text-sm">
                    {movie.vote_average.toFixed(1)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-zinc-800 border-t border-zinc-700 p-6">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-secondary w-full"
        >
          Annuler
        </button>
      </div>
    </dialog>
  );
}

export default MovieSearchModal;
