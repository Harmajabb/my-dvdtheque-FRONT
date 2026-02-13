const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-darker text-white/80 pt-16 pb-8 relative max-md:pt-10 max-md:pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-[1fr_1.5fr] gap-16 mb-10 max-lg:grid-cols-1 max-lg:gap-10 max-md:gap-8">
          <div className="flex flex-col gap-6 max-md:text-center max-md:items-center">
            <a
              href="/"
              className="inline-block no-underline w-fit transition-opacity duration-200 hover:opacity-80"
              aria-label="Retour à l'accueil"
            >
              <span className="text-2xl font-bold text-white tracking-tight max-[480px]:text-xl">
                Ma DVDthèque
              </span>
            </a>
            <p className="text-base leading-relaxed text-white/70 m-0 max-[480px]:text-sm">
              Gérez votre collection de films et suivez vos prêts en toute
              simplicité.
            </p>
            <div className="flex gap-4 max-md:justify-center">
              <a
                href="https://github.com/Harmajabb/my-dvdtheque-FRONT"
                className="inline-flex items-center gap-2 py-2 px-4 text-white/70 bg-white/10 rounded-md no-underline text-sm font-medium transition-all duration-200 hover:text-white hover:bg-accent hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 motion-reduce:hover:translate-y-0"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Voir le code source sur GitHub"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="text-base">GitHub</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4 max-md:text-center">
            <p className="text-base leading-relaxed text-white/80 m-0 max-[480px]:text-sm">
              Ma DVDthèque est un projet{" "}
              <strong className="text-white font-semibold">
                entièrement gratuit
              </strong>{" "}
              et{" "}
              <strong className="text-white font-semibold">open source</strong>.
              Aucun abonnement, aucune publicité, aucun piège. Juste un outil
              pratique créé pour vous faciliter la vie.
            </p>
            <p className="text-base leading-relaxed text-white/60 italic m-0 max-[480px]:text-sm">
              J'ai créé cet outil pour ma mère qui voulait enfin organiser sa
              collection de DVDs. Je le partage avec vous en espérant qu'il vous
              soit aussi utile.
            </p>
          </div>
        </div>
        <hr className="border-0 border-t border-white/20 my-10" />
        <div className="flex justify-between items-center flex-wrap gap-4 max-md:flex-col max-md:text-center">
          <p className="text-sm text-white/50 m-0">
            © {currentYear} Ma DVDthèque · Projet open source sous licence MIT
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
