import axios from "axios";
import { Film } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Reveal } from "../../components/Reveal/Reveal";
import { resetPassword } from "../../services/api";

function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Le mot de passe doit faire au moins 8 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!token) {
      setError("Lien de réinitialisation invalide.");
      return;
    }

    setLoading(true);

    try {
      await resetPassword(token, password);
      navigate("/login", { state: { resetSuccess: true } });
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? ((err.response?.data as { message?: string })?.message ??
          "Une erreur est survenue")
        : "Une erreur est survenue";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-accent to-accent-hover px-4">
      <Reveal className="w-full max-w-md" duration={1000}>
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <header className="text-center mb-8">
            <div className="text-4xl font-bold text-accent mb-2 flex justify-center">
              <Film size={60} aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-bold text-primary">
              Nouveau mot de passe
            </h1>
            <p className="text-zinc-600 mt-2">
              Choisissez votre nouveau mot de passe
            </p>
          </header>

          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className="bg-red-50 border-l-4 border-danger text-danger px-4 py-3 rounded mb-6"
            >
              <p className="font-medium">{error}</p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            aria-label="Formulaire de réinitialisation de mot de passe"
          >
            <div className="form-group">
              <label htmlFor="password" className="form-label text-zinc-600">
                Nouveau mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                minLength={8}
                className="form-input bg-zinc-100 text-zinc-800 border-zinc-300 placeholder:text-zinc-400"
                placeholder="••••••••"
                aria-describedby="password-hint"
              />
              <p id="password-hint" className="text-sm text-zinc-500 mt-1">
                Minimum 8 caractères
              </p>
            </div>

            <div className="form-group">
              <label
                htmlFor="confirm-password"
                className="form-label text-zinc-600"
              >
                Confirmer le mot de passe
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                minLength={8}
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
              {loading ? "Mise à jour..." : "Mettre à jour le mot de passe"}
            </button>
          </form>

          <nav aria-label="Navigation" className="mt-6 text-center">
            <Link
              to="/login"
              className="text-accent font-semibold hover:text-accent-hover transition-colors"
              tabIndex={0}
            >
              Retour à la connexion
            </Link>
          </nav>
        </div>
      </Reveal>
    </main>
  );
}

export default ResetPassword;
