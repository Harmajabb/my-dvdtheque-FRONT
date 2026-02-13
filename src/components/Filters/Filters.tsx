import type { Dvd } from "../../types";

export interface FilterState {
  genre: string;
  statut: Dvd["statut"] | "";
  sortBy: "titre" | "annee_desc" | "annee_asc" | "date_ajout";
}

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
  availableGenres: string[];
  currentFilters: FilterState;
}

function Filters({
  onFilterChange,
  availableGenres,
  currentFilters,
}: FiltersProps) {
  const handleChange = (key: keyof FilterState, value: string) => {
    onFilterChange({
      ...currentFilters,
      [key]: value,
    });
  };
  return (
    <fieldset className="bg-zinc-800 rounded-lg p-6 mb-6 border-0">
      <legend className="text-xl font-bold text-accent mb-4">Filtres</legend>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Genre */}
        <div className="form-group">
          <label className="form-label !text-zinc-300" htmlFor="genre">
            Genre
          </label>
          <select
            id="genre"
            value={currentFilters.genre}
            onChange={(e) => handleChange("genre", e.target.value)}
            className="form-select bg-zinc-700 border-zinc-600 text-white"
          >
            <option value="">Tous les genres</option>
            {availableGenres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Statut */}
        <div className="form-group">
          <label className="form-label !text-zinc-300" htmlFor="statut">
            Statut
          </label>
          <select
            id="statut"
            value={currentFilters.statut}
            onChange={(e) => handleChange("statut", e.target.value)}
            className="form-select bg-zinc-700 border-zinc-600 text-white"
          >
            <option value="">Tous les statuts</option>
            <option value="en collection">En collection</option>
            <option value="prêté">Prêté</option>
            <option value="perdu">Perdu</option>
          </select>
        </div>

        {/* Tri */}
        <div className="form-group">
          <label className="form-label !text-zinc-300" htmlFor="triage">
            Trier par
          </label>
          <select
            id="triage"
            value={currentFilters.sortBy}
            onChange={(e) =>
              handleChange("sortBy", e.target.value as FilterState["sortBy"])
            }
            className="form-select bg-zinc-700 border-zinc-600 text-white"
          >
            <option value="titre">Titre (A-Z)</option>
            <option value="annee_desc">Année (récent)</option>
            <option value="annee_asc">Année (ancien)</option>
            <option value="date_ajout">Date d'ajout</option>
          </select>
        </div>
      </div>
    </fieldset>
  );
}

export default Filters;
