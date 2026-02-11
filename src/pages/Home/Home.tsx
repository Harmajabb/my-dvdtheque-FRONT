import { useEffect, useState } from "react";
import DvdList from "../../components/DvdList/DvdList";
import { getDvds } from "../../services/api";
import type { Dvd } from "../../types";

function Home() {
  const [dvds, setDvds] = useState<Dvd[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  //pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //loading for the dvds
  useEffect(() => {
    const run = async () => {
      try {
        setError(""); //error unistall
        setLoading(true); // activate the loading
        // call the API
        const data = await getDvds(page);
        //update the useState
        setDvds(data.dvds);
        setTotalPages(data.totalPages);
      } catch (_err) {
        setError("Erreur lors du chargement des dvds");
      } finally {
        setLoading(false);
      }
    };

    //call the function
    run();
  }, [page]);

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
              <div className="flex justify-center items-center gap-4 mb-12">
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
              <div className="flex justify-center items-center gap-4 mt-12">
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
