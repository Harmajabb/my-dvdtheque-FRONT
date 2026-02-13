import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  currentQuery: string;
}

function SearchBar({ onSearch, currentQuery }: SearchBarProps) {
  const [query, setQuery] = useState(currentQuery);
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un titre, réalisateur, acteur..."
          aria-label="Rechercher un DVD par titre, réalisateur ou acteur"
          className="form-input flex-1 bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400"
        />
        <button type="submit" className="btn btn-primary">
          <Search size={24} /> Rechercher
        </button>
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="btn btn-secondary"
          >
            <X size={24} />
            Effacer
          </button>
        )}
      </div>
    </form>
  );
}

export default SearchBar;
