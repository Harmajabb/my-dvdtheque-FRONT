import axios from "axios";
import { Film } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../../components/Reveal/Reveal";
import { forgotPassword } from "../../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await forgotPassword(email);
      setSuccess(true);
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
              Mot de passe oublié
            </h1>
            <p className="text-zinc-600 mt-2">
              Entrez votre email pour recevoir un lien de réinitialisation
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

          {success ? (
            <div className="text-center">
              <output className="block bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded mb-6">
                <p className="font-medium">
                  Si cet email existe dans notre base, un lien de
                  réinitialisation a été envoyé.
                </p>
                <p className="text-sm mt-2">
                  Vérifiez votre boîte mail (et vos spams).
                </p>
              </output>
              <Link
                to="/login"
                className="text-accent font-semibold hover:text-accent-hover transition-colors"
              >
                Retour à la connexion
              </Link>
            </div>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                aria-label="Formulaire de récupération de mot de passe"
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

                <button
                  type="submit"
                  disabled={loading}
                  aria-busy={loading}
                  className="btn btn-primary w-full"
                >
                  {loading ? "Envoi..." : "Envoyer le lien"}
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
            </>
          )}
        </div>
      </Reveal>
    </main>
  );
}

export default ForgotPassword;
