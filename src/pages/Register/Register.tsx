import axios from "axios";
import { Film } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(nom, email, password);
      navigate("/");
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? ((err.response?.data as { error?: string })?.error ??
          "Erreur de l'inscription")
        : "Erreur de l'inscription";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-accent to-accent-hover px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          {/* Logo / Titre */}
          <header className="text-center mb-8">
            <div className="text-4xl font-bold text-accent mb-2 flex justify-center">
              <Film size={60} aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-bold text-primary">Ma DVDthèque</h1>
            <p className="text-gray-600 mt-2">
              Créez votre compte gratuitement
            </p>
          </header>

          {/* Message d'erreur */}
          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className="bg-red-50 border-l-4 border-danger text-danger px-4 py-3 rounded mb-6"
            >
              <p className="font-medium">{error}</p>
            </div>
          )}

          {/* Formulaire */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            aria-label="Formulaire d'inscription"
          >
            <div className="form-group">
              <label htmlFor="nom" className="form-label">
                Nom
              </label>
              <input
                id="nom"
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
                className="form-input"
                placeholder="Votre nom"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="form-input"
                placeholder="votre@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                minLength={6}
                className="form-input"
                placeholder="••••••••"
                aria-describedby="password-hint"
              />
              <p id="password-hint" className="text-sm text-gray-500 mt-1">
                Minimum 6 caractères
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="btn btn-primary w-full"
            >
              {loading ? "Inscription..." : "S'inscrire"}
            </button>
          </form>

          {/* Lien connexion */}
          <nav aria-label="Navigation" className="mt-6 text-center">
            <p className="text-gray-600">
              Déjà un compte ?{" "}
              <Link
                to="/login"
                className="text-accent font-semibold hover:text-accent-hover transition-colors"
                tabIndex={0}
              >
                Se connecter
              </Link>
            </p>
            <Link
              to="/"
              className="inline-block mt-4 text-sm text-gray-500 underline hover:text-primary transition-colors"
              tabIndex={0}
            >
              Retour à l'accueil
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
}

export default Register;
