import { useEffect, useState } from "react";
import DvdList from "../../components/DvdList/DvdList";
import Filters, { type FilterState } from "../../components/Filters/Filters";
import SearchBar from "../../components/Search/SearchBar";
import { getDvds, searchDvds } from "../../services/api";
import type { Dvd } from "../../types";

function Home() {
  const [dvds, setDvds] = useState<Dvd[]>([]);
  // for the filters in user side
  const [allDvds, setAllDvds] = useState<Dvd[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  //pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    genre: "",
    statut: "",
    sortBy: "titre",
  });

  //loading for the dvds
  useEffect(() => {
    if (isSearchMode) return; //do not load if search mode
    const run = async () => {
      try {
        setError(""); //error unistall
        setLoading(true); // activate the loading
        // call the API
        const data = await getDvds(page);
        //update the useState
        setDvds(data.dvds);
        setAllDvds(data.dvds);
        setTotalPages(data.totalPages);
      } catch (_err) {
        setError("Erreur lors du chargement des dvds");
      } finally {
        setLoading(false);
      }
    };

    //call the function
    run();
  }, [page, isSearchMode]);

  // search let's gooo
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      // normal mode
      setIsSearchMode(false);
      setSearchQuery("");
      setPage(1);
      return;
    }

    try {
      setError("");
      setLoading(true);
      setIsSearchMode(true);
      setSearchQuery(query);

      const results = await searchDvds(query);
      setAllDvds(results);

      //apply filters now
      const filtered = applyFilters(results);
      setDvds(filtered);
    } catch (_err) {
      setError("Erreur lors de la recherche");
    } finally {
      setLoading(false);
    }
  };

  // filters for clients
  const applyFilters = (data: Dvd[], filterOverride?: FilterState) => {
    const activeFilters = filterOverride || filters;
    let filtered = [...data];

    // genre
    if (activeFilters.genre) {
      filtered = filtered.filter((dvd) => dvd.genre === activeFilters.genre);
    }

    //statut
    if (activeFilters.statut) {
      filtered = filtered.filter((dvd) => dvd.statut === activeFilters.statut);
    }

    //triage
    filtered.sort((a, b) => {
      switch (activeFilters.sortBy) {
        case "titre":
          return a.titre.localeCompare(b.titre);
        case "annee_desc":
          return (b.annee || 0) - (a.annee || 0);
        case "annee_asc":
          return (b.annee || 0) - (a.annee || 0);
        case "date_ajout":
          return (
            new Date(b.date_ajout).getTime() - new Date(a.date_ajout).getTime()
          );
        default:
          return 0;
      }
    });
    return filtered;
  };

  // it help to manage the filters change
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    const filtered = applyFilters(allDvds, newFilters);
    setDvds(filtered);
  };

  // available genre
  const availableGenres = Array.from(
    new Set(allDvds.map((d) => d.genre).filter(Boolean)),
  ) as string[];

  return (
    <main className="min-h-screen bg-bg-dark">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-accent mb-2">Ma Collection</h1>
          <p className="text-zinc-300 text-lg">
            {dvds.length > 0
              ? `${dvds.length} DVD${dvds.length > 1 ? "s" : ""}`
              : "Collection vide"}
          </p>
        </div>
        {/* searchbar */}
        <SearchBar onSearch={handleSearch} currentQuery={searchQuery} />

        {allDvds.length > 0 && (
          <Filters
            onFilterChange={handleFilterChange}
            availableGenres={availableGenres}
            currentFilters={filters}
          />
        )}
        {/* Message d'erreur */}
        {error && (
          <div className="bg-red-900/30 border-l-4 border-danger text-red-300 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Chargement */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-xl text-zinc-300">Chargement...</p>
          </div>
        ) : (
          <>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-8 mb-8">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1} //protection for the page which doesn't exist
                  className="btn btn-secondary"
                >
                  Précédent
                </button>
                <span className="font-semibold text-lg text-white">
                  Page {page} sur {totalPages}
                </span>
                <button
                  type="button"
                  //math min helps to prevent bug with disabled
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="btn btn-secondary"
                >
                  Suivant
                </button>
              </div>
            )}

            <DvdList dvds={dvds} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-8 mt-12">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="btn btn-secondary"
                >
                  Précédent
                </button>
                <span className="font-semibold text-lg text-white">
                  Page {page} sur {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="btn btn-secondary"
                >
                  Suivant
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default Home;
