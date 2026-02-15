const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export interface TmdbMovie {
  id: number;
  title: string;
  original_title: string;
  release_date: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  genre_ids: number[];
}

export interface TmdbMovieDetails {
  id: number;
  title: string;
  original_title: string;
  release_date: string;
  overview: string;
  poster_path: string | null;
  runtime: string | null;
  genres: { id: number; name: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  credits: {
    cast: { name: string; character: string; order: number }[];
    crew: { name: string; job: string }[];
  };
}

const GENRE_MAP: Record<number, string> = {
  28: "Action",
  12: "Aventure",
  16: "Animation",
  35: "Comédie",
  99: "Documentaire",
  18: "Drame",
  14: "Fantaisie",
  27: "Horreur",
  10749: "Romance",
  878: "Science-Fiction",
  53: "Thriller",
  37: "Western",
};

// search movies by title
export const searchMovies = async (query: string): Promise<TmdbMovie[]> => {
  if (!TMDB_API_KEY) {
    throw new Error("Cle API TMDb manquante");
  }
  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=fr=FR`,
  );

  if (!response.ok) {
    throw new Error("Erreur lors de la recherche TMDB");
  }

  const data = await response.json();
  return data.results.slice(0, 5); // top 5 results
};

// get movie details
export const getMovieDetails = async (
  tmdbId: number,
): Promise<TmdbMovieDetails> => {
  if (!TMDB_API_KEY) {
    throw new Error("Clé API TMDb manquante");
  }
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&language=fr-FR&append_to_response=credits`,
  );

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des détails");
  }

  return response.json();
};

// convert detail in our detail format
export const convertTmdbToFormData = (details: TmdbMovieDetails) => {
  //real
  const director = details.credits.crew.find(
    (person) => person.job === "Director",
  );

  //actors
  const actors = details.credits.cast
    .slice(0, 5)
    .map((actor) => actor.name)
    .join(",");

  //genre
  const genre =
    details.genres.map((g) => GENRE_MAP[g.id]).filter(Boolean)[0] || "";

  //nationalite
  const nationalite = details.production_countries[0]?.name || "";

  //annee
  const annee = details.release_date ? details.release_date.split("-")[0] : "";

  //img url
  const image_url = details.poster_path
    ? `${TMDB_IMAGE_BASE}${details.poster_path}`
    : "";

  return {
    titre: details.title,
    titre_original:
      details.original_title !== details.title ? details.original_title : "",
    realisateur: director?.name || "",
    annee,
    duree: details.runtime ? String(details.runtime) : "",
    genre,
    nationalite,
    actors,
    synopsis: details.overview,
    image_url,
  };
};
