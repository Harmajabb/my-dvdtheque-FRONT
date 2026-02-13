import { Reveal } from "../Reveal/Reveal";

const About = () => {
  const benefits = [
    {
      id: 1,
      title: "Suivez vos prêts",
      description:
        "Sachez en un coup d'œil qui a emprunté quel film. Fini les DVDs perdus chez les amis!",
    },
    {
      id: 2,
      title: "Référencez facilement",
      description:
        "Ajoutez vos DVDs en quelques clics. Titre, réalisateur, année... Tout est simple et rapide.",
    },
    {
      id: 3,
      title: "Retrouvez instantanément",
      description:
        "Recherchez dans votre collection sans fouiller dans vos étagères pendant des heures.",
    },
    {
      id: 4,
      title: "Visualisez votre collection",
      description:
        "Statistiques, filtres par genre, par année... Découvrez votre collection sous un nouveau jour.",
    },
  ];

  return (
    <section
      className="section-dark relative shadow-[inset_0_10px_20px_-10px_rgba(0,0,0,0.5)]"
      id="about"
    >
      <div className="container-custom">
        <Reveal as="header" className="text-center mb-16">
          <h2 className="title-with-line" aria-label="Ma collection sous contrôle">
            <span>Ma collection</span>
            <span>sous contrôle</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-8 max-w-[900px] mx-auto mb-16 max-md:grid-cols-1 max-md:gap-6">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.id} variant="fade-in-up" delay={index * 150}>
              <article className="card p-10 max-md:p-8 max-[480px]:p-6">
                <h3 className="text-xl font-semibold text-accent mb-4">
                  {benefit.title}
                </h3>
                <p className="text-base text-white/90 leading-relaxed m-0 max-[480px]:text-sm">
                  {benefit.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal variant="fade-in" delay={700}>
          <article className="bg-bg-darker p-10 rounded-lg text-center max-w-[900px] mx-auto border border-white/10 max-md:p-8 max-[480px]:p-6">
            <p className="text-lg text-white/85 m-0 leading-relaxed max-md:text-base">
              <strong className="font-bold text-white">
                Conçu pour être simple:
              </strong>{" "}
              Pas besoin d'être un expert en informatique. Si vous savez
              utiliser un téléphone, vous saurez utiliser Ma DVDthèque.
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
