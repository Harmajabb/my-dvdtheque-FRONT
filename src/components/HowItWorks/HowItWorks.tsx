const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Créez votre compte:",
      description:
        "Inscrivez-vous gratuitement en moins d'une minute. Aucune carte bancaire requise.",
    },
    {
      id: 2,
      title: "Ajoutez vos DVDs:",
      description: "Référencez vos films un par un.",
    },
    {
      id: 3,
      title: "Gérez vos prêts:",
      description: "Notez qui a emprunté quoi et quand.",
    },
  ];

  return (
    <section className="section-dark" id="how-it-works">
      <div className="container-custom">
        {/* Titre */}
        <header className="text-center mb-16">
          <h2 className="title-with-line">
            <span className="lowercase">En trois étapes</span>
            <span className="lowercase">ultra simples</span>
          </h2>
        </header>

        {/* Liste des étapes */}
        <div className="max-w-[700px] mx-auto">
          {steps.map((step, index) => (
            <article
              key={step.id}
              className="grid grid-cols-[auto_1fr] gap-8 mb-10 last:mb-0 max-md:gap-6 max-md:mb-8 max-[480px]:gap-4"
            >
              {/* Icône check avec ligne verticale */}
              <div className="relative flex flex-col items-center">
                <div
                  className="w-14 h-14 bg-accent rounded-full flex items-center justify-center text-white relative z-20 shrink-0 max-md:w-12 max-md:h-12 max-[480px]:w-11 max-[480px]:h-11"
                  aria-hidden="true"
                >
                  <svg
                    className="w-6 h-6 max-md:w-5 max-md:h-5 max-[480px]:w-[18px] max-[480px]:h-[18px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <title>Check</title>
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Ligne verticale (sauf pour la dernière étape) */}
                {index < steps.length - 1 && (
                  <div
                    className="w-0.5 h-full min-h-full bg-accent mt-2"
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Contenu de l'étape */}
              <div className="pt-2">
                <h3 className="text-xl font-bold text-white mb-2 max-md:text-lg">
                  {step.title}
                </h3>
                <p className="text-base text-white/75 leading-relaxed m-0 max-md:text-sm">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
