import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { Reveal } from "../../components/Reveal/Reveal";
import { deleteDvd, getDvdById } from "../../services/api";
import type { Dvd } from "../../types";

function DvdDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dvd, setDvd] = useState<Dvd | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  //fetch dvd to get the data
  useEffect(() => {
    const fetchDvd = async () => {
      try {
        //conversion string to number
        const data = await getDvdById(Number(id));
        setDvd(data);
      } catch {
        setError("Erreur lors du chargement du DVD");
      } finally {
        setLoading(false);
      }
    };

    fetchDvd();
  }, [id]);

  //to delete the dvd
  const handleDelete = async () => {
    try {
      await deleteDvd(Number(id));
      navigate("/home");
    } catch {
      setError("Erreur lors de la suppression");
    }
  };

  //loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-bg-dark">
        <div className="container-custom py-8">
          <output className="block text-center py-16">
            <p className="text-xl text-zinc-300">Chargement...</p>
          </output>
        </div>
      </main>
    );
  }

  //errors if no dvd, if no chargement etc...
  if (error || !dvd) {
    return (
      <main className="min-h-screen bg-bg-dark">
        <div className="container-custom py-8">
          <div role="alert" className="bg-red-900/30 border-l-4 border-danger text-red-300 px-4 py-3 rounded mb-6">
            {error || "DVD introuvable"}
          </div>
          <Link to="/home" className="text-accent hover:underline">
            Retour à la collection
          </Link>
        </div>
      </main>
    );
  }

  //for changing the badge color and the statut of a dvd
  const statutLabel: Record<Dvd["statut"], string> = {
    "en collection": "En collection",
    prêté: "Prêté",
    perdu: "Perdu",
  };

  const statutColor: Record<Dvd["statut"], string> = {
    "en collection": "bg-green-600",
    prêté: "bg-yellow-600",
    perdu: "bg-red-600",
  };

  return (
    <main className="min-h-screen bg-bg-dark">
      <div className="container-custom py-8">
        <Link
          to="/home"
          className="text-accent hover:underline mb-6 inline-block"
          tabIndex={0}
        >
          Retour à la collection
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          <Reveal variant="fade-in" className="md:col-span-1">
            <img
              src={dvd.image_url || "/placeholder.svg"}
              alt={dvd.titre}
              className="w-full rounded-lg shadow-lg"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                if (!img.src.endsWith("/placeholder.svg")) {
                  img.src = "/placeholder.svg";
                }
              }}
            />
          </Reveal>

          <Reveal variant="fade-in-up" delay={150} className="md:col-span-2">
            <div className="bg-zinc-800 rounded-lg shadow-lg p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {dvd.titre}
                  </h1>
                  {dvd.titre_original && (
                    <p className="text-zinc-400 text-lg italic">
                      {dvd.titre_original}
                    </p>
                  )}
                </div>
                <span
                  className={`${statutColor[dvd.statut]} text-white text-sm px-3 py-1 rounded-full font-semibold`}
                >
                  {statutLabel[dvd.statut]}
                </span>
              </div>

              <div className="space-y-4 mb-8">
                {dvd.realisateur && (
                  <div>
                    <span className="text-zinc-400 font-semibold">
                      Réalisateur :
                    </span>
                    <span className="text-white ml-2">{dvd.realisateur}</span>
                  </div>
                )}

                {dvd.annee && (
                  <div>
                    <span className="text-zinc-400 font-semibold">Année :</span>
                    <span className="text-white ml-2">{dvd.annee}</span>
                  </div>
                )}

                {dvd.duree && (
                  <div>
                    <span className="text-zinc-400 font-semibold">Durée :</span>
                    <span className="text-white ml-2">{dvd.duree} min</span>
                  </div>
                )}

                {dvd.genre && (
                  <div>
                    <span className="text-zinc-400 font-semibold">Genre :</span>
                    <span className="inline-block bg-accent text-white text-sm px-3 py-1 rounded-full font-semibold ml-2">
                      {dvd.genre}
                    </span>
                  </div>
                )}
                {dvd.nationalite && (
                  <div>
                    <span className="text-zinc-400 font-semibold">
                      Nationalité :
                    </span>
                    <span className="text-white ml-2">{dvd.nationalite}</span>
                  </div>
                )}

                {dvd.acteurs && (
                  <div>
                    <span className="text-zinc-400 font-semibold">
                      Acteurs :
                    </span>
                    <span className="text-white ml-2">{dvd.acteurs}</span>
                  </div>
                )}

                {dvd.emplacement && (
                  <div>
                    <span className="text-zinc-400 font-semibold">
                      Emplacement :
                    </span>
                    <span className="text-white ml-2">{dvd.emplacement}</span>
                  </div>
                )}

                {dvd.statut === "prêté" && dvd.prete_a && (
                  <div>
                    <span className="text-zinc-400 font-semibold">
                      Prêté à :
                    </span>
                    <span className="text-white ml-2">{dvd.prete_a}</span>
                  </div>
                )}

                {dvd.statut === "prêté" && dvd.date_pret && (
                  <div>
                    <span className="text-zinc-400 font-semibold">
                      Date du prêt :
                    </span>
                    <span className="text-white ml-2">
                      {new Date(dvd.date_pret).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                )}
              </div>

              {dvd.synopsis && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-accent mb-3 pb-2 border-b border-zinc-700">
                    Synopsis
                  </h2>
                  <p className="text-zinc-300 leading-relaxed">
                    {dvd.synopsis}
                  </p>
                </div>
              )}

              {dvd.notes_perso && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-accent mb-3 pb-2 border-b border-zinc-700">
                    Notes personnelles
                  </h2>
                  <p className="text-zinc-300 leading-relaxed">
                    {dvd.notes_perso}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4 pt-6 border-t border-zinc-700">
                <Link
                  to={`/dvd/${dvd.id}/edit`}
                  className="btn btn-primary"
                  tabIndex={0}
                >
                  Modifier
                </Link>
                <button
                  type="button"
                  onClick={() => setShowDeleteDialog(true)}
                  className="btn bg-danger text-white hover:bg-red-700 transition-colors px-6 py-2 rounded-md font-semibold"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <ConfirmDialog
        open={showDeleteDialog}
        title="Supprimer ce DVD"
        message="Voulez-vous vraiment supprimer ce DVD ? Cette action est irréversible."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        onConfirm={() => {
          setShowDeleteDialog(false);
          handleDelete();
        }}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </main>
  );
}

export default DvdDetail;
