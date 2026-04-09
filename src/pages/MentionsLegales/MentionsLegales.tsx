const MentionsLegales = () => {
  return (
    <main className="min-h-screen bg-bg-dark text-white/90 py-16 max-md:py-10">
      <div className="container-custom max-w-3xl">
        <h1 className="text-3xl font-bold text-white mb-2 max-md:text-2xl">
          Mentions légales
        </h1>
        <p className="text-white/50 text-sm mb-10">
          Dernière mise à jour : avril 2025
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">
            1. Éditeur du site
          </h2>
          <p className="text-white/70 leading-relaxed mb-2">
            Le site <strong className="text-white">Ma DVDthèque</strong> est un
            projet personnel open source, édité par :
          </p>
          <ul className="text-white/70 leading-relaxed space-y-1 list-none pl-0">
            <li>
              <span className="text-white/50">Nom :</span>{" "}
              <strong className="text-white">Lea Harmajabb</strong>
            </li>
            <li>
              <span className="text-white/50">Email :</span>{" "}
              <a
                href="mailto:harmajabb@pm.me"
                className="text-accent underline underline-offset-2 hover:text-white transition-colors"
              >
                harmajabb@pm.me
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">
            2. Hébergement
          </h2>
          <p className="text-white/70 leading-relaxed mb-2">
            Le site est hébergé par :
          </p>
          <ul className="text-white/70 leading-relaxed space-y-1 list-none pl-0">
            <li>
              <span className="text-white/50">Hébergeur :</span>{" "}
              <strong className="text-white">Vercel Inc.</strong>
            </li>
            <li>
              <span className="text-white/50">Adresse :</span> 340 S Lemon Ave
              #4133, Walnut, CA 91789, États-Unis
            </li>
            <li>
              <span className="text-white/50">Site :</span> https://vercel.com/
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">
            3. Propriété intellectuelle
          </h2>
          <p className="text-white/70 leading-relaxed mb-3">
            Le code source de ce projet est publié sous licence{" "}
            <strong className="text-white">MIT</strong> et disponible sur{" "}
            <a
              href="https://github.com/Harmajabb/my-dvdtheque-FRONT"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2 hover:text-white transition-colors"
            >
              GitHub
            </a>
            .
          </p>
          <p className="text-white/70 leading-relaxed">
            Les informations sur les films (titres, affiches, synopsis, etc.)
            proviennent de{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2 hover:text-white transition-colors"
            >
              The Movie Database (TMDB)
            </a>{" "}
            via leur API. Ces données restent la propriété de leurs détenteurs
            respectifs. Ce site n'est pas approuvé, certifié ou autrement
            approuvé par TMDB.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">
            4. Limitation de responsabilité
          </h2>
          <p className="text-white/70 leading-relaxed">
            Ce site est fourni en l'état, sans garantie d'aucune sorte.
            L'éditeur ne peut être tenu responsable des dommages directs ou
            indirects liés à l'utilisation du service. Le service peut être
            interrompu à tout moment sans préavis.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">
            5. Droit applicable
          </h2>
          <p className="text-white/70 leading-relaxed">
            Les présentes mentions légales sont régies par le droit français.
            Tout litige relatif à l'utilisation de ce site sera soumis à la
            compétence des tribunaux français.
          </p>
        </section>
      </div>
    </main>
  );
};

export default MentionsLegales;
