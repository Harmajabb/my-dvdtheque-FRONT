import { ChevronDown } from "lucide-react";
import heroBg from "../../assets/hero/hero.jpg";

const Hero = () => {
  const handleScrollDown = () => {
    const nextSection = document.querySelector("#about");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${heroBg})` }}
      aria-label="Section d'accueil"
    >
      <div className="absolute inset-0 bg-black/30 z-10" aria-hidden="true" />

      <div
        className="absolute top-12 left-8 z-20 text-left max-w-[90%]
                      md:top-16 md:left-12
                      lg:top-20 lg:left-16
                      max-md:top-1/2 max-md:left-1/2 max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:text-center"
      >
        <p
          className="text-xs font-bold text-warning
                       uppercase tracking-widest mb-1
                       text-shadow-medium"
        >
          Gérez votre collection de films et suivez vos prêts facilement
        </p>
        <h1
          className="text-5xl font-bold text-white
                       leading-[0.85] tracking-tight uppercase m-0
                       text-shadow-strong"
        >
          Ma Dvdthèque
        </h1>
      </div>

      <button
        type="button"
        onClick={handleScrollDown}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20
                   flex items-center justify-center
                   w-12 h-12
                   text-white bg-white/10 backdrop-blur-custom
                   border border-white/30 rounded-full
                   cursor-pointer p-0
                   transition-all duration-300 ease-in-out
                   hover:bg-white/20 hover:-translate-y-1 hover:-translate-x-1/2
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4
                   md:bottom-20
                   max-md:w-11 max-md:h-11 max-md:bottom-16
                   max-[480px]:w-10 max-[480px]:h-10 max-[480px]:bottom-12
                   motion-reduce:hover:translate-y-0"
        aria-label="Défiler vers le bas"
      >
        <ChevronDown
          className="w-8 h-8 animate-bounce-slow motion-reduce:animate-none
                     max-[480px]:w-6 max-[480px]:h-6"
          aria-hidden="true"
        />
      </button>
    </section>
  );
};

export default Hero;
