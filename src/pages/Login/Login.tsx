import axios from "axios";
import { Film } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Reveal } from "../../components/Reveal/Reveal";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? ((err.response?.data as { error?: string })?.error ??
          "Erreur de connexion")
        : "Erreur de connexion";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-accent to-accent-hover px-4">
      <Reveal className="w-full max-w-md" duration={1000}>
        <div className="bg-white rounded-lg shadow-2xl p-8">
          {/* Logo / Titre */}
          <header className="text-center mb-8">
            <div className="text-4xl font-bold text-accent mb-2 flex justify-center">
              <Film size={60} aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-bold text-primary">Ma DVDthèque</h1>
            <p className="text-zinc-600 mt-2">
              Connectez-vous à votre collection
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
            aria-label="Formulaire de connexion"
          >
            <div className="form-group">
              <label htmlFor="email" className="form-label text-zinc-600">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="form-input bg-zinc-100 text-zinc-800 border-zinc-300 placeholder:text-zinc-400"
                placeholder="votre@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label text-zinc-600">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="form-input bg-zinc-100 text-zinc-800 border-zinc-300 placeholder:text-zinc-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="btn btn-primary w-full"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          {/* Lien mot de passe oublié + inscription */}
          <nav aria-label="Navigation" className="mt-6 text-center">
            <p className="mb-4">
              <Link
                to="/forgot-password"
                className="text-sm text-zinc-500 hover:text-accent transition-colors"
                tabIndex={0}
              >
                Mot de passe oublié ?
              </Link>
            </p>
            <p className="text-zinc-600">
              Pas encore de compte ?{" "}
              <Link
                to="/register"
                className="text-accent font-semibold hover:text-accent-hover transition-colors"
                tabIndex={0}
              >
                S'inscrire
              </Link>
            </p>
            <Link
              to="/"
              className="inline-block mt-4 text-sm text-zinc-500 underline hover:text-primary transition-colors"
              tabIndex={0}
            >
              Retour à l'accueil
            </Link>
          </nav>
        </div>
      </Reveal>
    </main>
  );
}

export default Login;
