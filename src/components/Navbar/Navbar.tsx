import { Film, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-bg-darker text-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to={isAuthenticated ? "/home" : "/"}
            className="flex items-center gap-2 text-2xl font-bold hover:text-accent transition-colors"
            onClick={closeMenu}
            tabIndex={0}
          >
            <Film size={30} aria-hidden="true" tabIndex={0} />
            <span>Ma DVDthèque</span>
          </Link>

          {/* Bouton burger mobile */}
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {isAuthenticated ? (
              <>
                <Link
                  to="/home"
                  tabIndex={0}
                  className={`font-semibold transition-colors ${
                    isActive("/home") ? "text-accent" : "hover:text-accent"
                  }`}
                >
                  Accueil
                </Link>
                <Link
                  to="/add"
                  tabIndex={0}
                  className={`font-semibold transition-colors ${
                    isActive("/add") ? "text-accent" : "hover:text-accent"
                  }`}
                >
                  Ajouter un DVD
                </Link>
                <Link
                  to="/stats"
                  tabIndex={0}
                  className={`font-semibold transition-colors ${
                    isActive("/stats") ? "text-accent" : "hover:text-accent"
                  }`}
                >
                  Statistiques
                </Link>

                <div className="flex items-center gap-4 ml-6 pl-6 border-l border-white/30">
                  <span className="text-sm">Bonjour, {user?.nom}</span>
                  <button
                    type="button"
                    onClick={logout}
                    className="btn btn-danger text-sm py-2 px-4"
                  >
                    Déconnexion
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary text-sm py-2 px-4"
                tabIndex={0}
              >
                Se connecter
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-bg-darker">
          <div className="container-custom flex flex-col gap-4 py-4 text-center">
            {isAuthenticated ? (
              <>
                <Link
                  to="/home"
                  onClick={closeMenu}
                  tabIndex={0}
                  className={`font-semibold transition-colors py-2 ${
                    isActive("/home") ? "text-accent" : "hover:text-accent"
                  }`}
                >
                  Accueil
                </Link>
                <Link
                  to="/add"
                  tabIndex={0}
                  onClick={closeMenu}
                  className={`font-semibold transition-colors py-2 ${
                    isActive("/add") ? "text-accent" : "hover:text-accent"
                  }`}
                >
                  Ajouter un DVD
                </Link>
                <Link
                  to="/stats"
                  tabIndex={0}
                  onClick={closeMenu}
                  className={`font-semibold transition-colors py-2 ${
                    isActive("/stats") ? "text-accent" : "hover:text-accent"
                  }`}
                >
                  Statistiques
                </Link>

                <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                  <span className="text-sm">Bonjour, {user?.nom}</span>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="btn btn-danger text-sm py-2 px-4 mx-auto"
                  >
                    Déconnexion
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                tabIndex={0}
                onClick={closeMenu}
                className="btn btn-primary text-sm py-2 px-4 w-fit"
              >
                Se connecter
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
