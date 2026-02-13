import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDvdById, updateDvd } from "../../services/api";
import type { Dvd } from "../../types";

function EditDvd() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingDvd, setLoadingDvd] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    titre: "",
    titre_original: "",
    realisateur: "",
    annee: "",
    duree: "",
    genre: "",
    nationalite: "",
    acteurs: "",
    synopsis: "",
    image_url: "",
    emplacement: "",
    statut: "en collection" as Dvd["statut"],
    prete_a: "",
    date_pret: "",
    notes_perso: "",
  });

  const genres = [
    "Action",
    "Aventure",
    "Animation",
    "Comédie",
    "Documentaire",
    "Drame",
    "Fantaisie",
    "Horreur",
    "Romance",
    "Science-Fiction",
    "Thriller",
    "Western",
  ];

  useEffect(() => {
    const fetchDvd = async () => {
      try {
        const dvd = await getDvdById(Number(id));
        setFormData({
          titre: dvd.titre || "",
          titre_original: dvd.titre_original || "",
          realisateur: dvd.realisateur || "",
          annee: dvd.annee ? String(dvd.annee) : "",
          duree: dvd.duree ? String(dvd.duree) : "",
          genre: dvd.genre || "",
          nationalite: dvd.nationalite || "",
          acteurs: dvd.acteurs || "",
          synopsis: dvd.synopsis || "",
          image_url: dvd.image_url || "",
          emplacement: dvd.emplacement || "",
          statut: dvd.statut,
          prete_a: dvd.prete_a || "",
          date_pret: dvd.date_pret ? dvd.date_pret.split("T")[0] : "",
          notes_perso: dvd.notes_perso || "",
        });
      } catch {
        setError("Erreur lors du chargement du DVD");
      } finally {
        setLoadingDvd(false);
      }
    };

    fetchDvd();
  }, [id]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const dvdData = {
        ...Object.fromEntries(
          Object.entries(formData).filter(([_, v]) => v !== ""),
        ),
        annee: formData.annee ? parseInt(formData.annee, 10) : undefined,
        duree: formData.duree ? parseInt(formData.duree, 10) : undefined,
        ...(formData.statut !== "prêté" && {
          prete_a: null,
          date_pret: null,
        }),
      };
      //update no create
      await updateDvd(Number(id), dvdData);
      //dvd id instead of home
      navigate(`/dvd/${id}`);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.error || "Erreur lors de la modification");
      } else {
        setError("Erreur lors de la modification");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loadingDvd) {
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

  return (
    <main className="min-h-screen bg-bg-dark">
      <div className="container-custom py-8">
        <h1 className="text-4xl font-bold text-accent mb-8">Modifier le DVD</h1>

        {error && (
          <div
            role="alert"
            className="bg-red-900/30 border-l-4 border-danger text-red-300 px-4 py-3 rounded mb-6"
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-800 rounded-lg shadow-lg p-8 space-y-8"
        >
          {/* Informations du film */}
          <section>
            <h2 className="text-2xl font-bold text-accent mb-6 pb-2 border-b-2 border-accent">
              Informations du film
            </h2>

            <div className="space-y-6">
              <div className="form-group">
                <label htmlFor="titre" className="form-label !text-zinc-300">
                  Titre *
                </label>
                <input
                  id="titre"
                  type="text"
                  value={formData.titre}
                  onChange={(e) =>
                    setFormData({ ...formData, titre: e.target.value })
                  }
                  required
                  className="form-input bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400"
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="titre_original"
                  className="form-label !text-zinc-300"
                >
                  Titre original
                </label>
                <input
                  id="titre_original"
                  type="text"
                  value={formData.titre_original}
                  onChange={(e) =>
                    setFormData({ ...formData, titre_original: e.target.value })
                  }
                  className="form-input bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="form-group">
                  <label
                    htmlFor="realisateur"
                    className="form-label !text-zinc-300"
                  >
                    Réalisateur
                  </label>
                  <input
                    id="realisateur"
                    type="text"
                    value={formData.realisateur}
                    onChange={(e) =>
                      setFormData({ ...formData, realisateur: e.target.value })
                    }
                    className="form-input bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="annee" className="form-label !text-zinc-300">
                    Année
                  </label>
                  <input
                    id="annee"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={formData.annee}
                    onChange={(e) =>
                      setFormData({ ...formData, annee: e.target.value })
                    }
                    className="form-input bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="duree" className="form-label !text-zinc-300">
                    Durée (min)
                  </label>
                  <input
                    id="duree"
                    type="number"
                    min="1"
                    value={formData.duree}
                    onChange={(e) =>
                      setFormData({ ...formData, duree: e.target.value })
                    }
                    className="form-input bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="genre" className="form-label !text-zinc-300">
                  Genre
                </label>
                <select
                  id="genre"
                  value={formData.genre}
                  onChange={(e) =>
                    setFormData({ ...formData, genre: e.target.value })
                  }
                  className="form-select bg-zinc-700 border-zinc-600 text-white"
                >
                  <option value="">Sélectionner un genre</option>
                  {genres.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label
                  htmlFor="nationalite"
                  className="form-label !text-zinc-300"
                >
                  Nationalité
                </label>
                <select
                  id="nationalite"
                  value={formData.nationalite}
                  onChange={(e) =>
                    setFormData({ ...formData, nationalite: e.target.value })
                  }
                  className="form-select bg-zinc-700 border-zinc-600 text-white"
                >
                  <option value="">Sélectionner une nationalité</option>
                  <option value="États-Unis">États-Unis</option>
                  <option value="France">France</option>
                  <option value="Royaume-Uni">Royaume-Uni</option>
                  <option value="Japon">Japon</option>
                  <option value="Corée du Sud">Corée du Sud</option>
                  <option value="Allemagne">Allemagne</option>
                  <option value="Italie">Italie</option>
                  <option value="Espagne">Espagne</option>
                  <option value="Canada">Canada</option>
                  <option value="Australie">Australie</option>
                  <option value="Chine">Chine</option>
                  <option value="Inde">Inde</option>
                  <option value="Mexique">Mexique</option>
                  <option value="Brésil">Brésil</option>
                  <option value="Suède">Suède</option>
                  <option value="Danemark">Danemark</option>
                  <option value="Norvège">Norvège</option>
                  <option value="Russie">Russie</option>
                  <option value="Hong Kong">Hong Kong</option>
                  <option value="Nouvelle-Zélande">Nouvelle-Zélande</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="acteurs" className="form-label !text-zinc-300">
                  Acteurs principaux
                </label>
                <input
                  id="acteurs"
                  type="text"
                  placeholder="Séparez par des virgules"
                  value={formData.acteurs}
                  onChange={(e) =>
                    setFormData({ ...formData, acteurs: e.target.value })
                  }
                  className="form-input bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400"
                />
              </div>

              <div className="form-group">
                <label htmlFor="synopsis" className="form-label !text-zinc-300">
                  Synopsis
                </label>
                <textarea
                  id="synopsis"
                  rows={4}
                  value={formData.synopsis}
                  onChange={(e) =>
                    setFormData({ ...formData, synopsis: e.target.value })
                  }
                  className="form-textarea bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400"
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="image_url"
                  className="form-label !text-zinc-300"
                >
                  URL de la jaquette
                </label>
                <input
                  id="image_url"
                  type="url"
                  placeholder="https://example.com/jaquette.jpg"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                  className="form-input bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400"
                />
                {formData.image_url && (
                  <img
                    src={formData.image_url}
                    alt={`Aperçu de la jaquette : ${formData.titre || "DVD"}`}
                    className="mt-4 max-w-xs rounded-lg shadow-md"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      if (!img.src.endsWith("/placeholder.svg")) {
                        img.src = "/placeholder.svg";
                      }
                    }}
                  />
                )}
              </div>
            </div>
          </section>

          {/* Gestion de la collection */}
          <section>
            <h2 className="text-2xl font-bold text-accent mb-6 pb-2 border-b-2 border-accent">
              Gestion de la collection
            </h2>

            <div className="space-y-6">
              <div className="form-group">
                <label
                  htmlFor="emplacement"
                  className="form-label !text-zinc-300"
                >
                  Emplacement
                </label>
                <input
                  id="emplacement"
                  type="text"
                  placeholder="Ex: Étagère A, Rayon 2"
                  value={formData.emplacement}
                  onChange={(e) =>
                    setFormData({ ...formData, emplacement: e.target.value })
                  }
                  className="form-input bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400"
                />
              </div>

              <div className="form-group">
                <label htmlFor="statut" className="form-label !text-zinc-300">
                  Statut
                </label>
                <select
                  id="statut"
                  value={formData.statut}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      statut: e.target.value as Dvd["statut"],
                    })
                  }
                  className="form-select bg-zinc-700 border-zinc-600 text-white"
                >
                  <option value="en collection">En collection</option>
                  <option value="prêté">Prêté</option>
                  <option value="perdu">Perdu</option>
                </select>
              </div>

              {formData.statut === "prêté" && (
                <>
                  <div className="form-group">
                    <label
                      htmlFor="prete_a"
                      className="form-label !text-zinc-300"
                    >
                      Prêté à
                    </label>
                    <input
                      id="prete_a"
                      type="text"
                      value={formData.prete_a}
                      onChange={(e) =>
                        setFormData({ ...formData, prete_a: e.target.value })
                      }
                      className="form-input bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400"
                    />
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor="date_pret"
                      className="form-label !text-zinc-300"
                    >
                      Date du prêt
                    </label>
                    <input
                      id="date_pret"
                      type="date"
                      value={formData.date_pret}
                      onChange={(e) =>
                        setFormData({ ...formData, date_pret: e.target.value })
                      }
                      className="form-input bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400"
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label
                  htmlFor="notes_perso"
                  className="form-label !text-zinc-300"
                >
                  Notes personnelles
                </label>
                <textarea
                  id="notes_perso"
                  rows={3}
                  placeholder="Vos remarques..."
                  value={formData.notes_perso}
                  onChange={(e) =>
                    setFormData({ ...formData, notes_perso: e.target.value })
                  }
                  className="form-textarea bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400"
                />
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-zinc-700">
            <button
              type="button"
              onClick={() => navigate(`/dvd/${id}`)}
              className="btn btn-secondary"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? "Modification en cours..." : "Modifier le DVD"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditDvd;
