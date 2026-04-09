const PolitiqueConfidentialite = () => {
  return (
    <main className="min-h-screen bg-bg-dark text-white/90 py-16 max-md:py-10">
      <div className="container-custom max-w-3xl">
        <h1 className="text-3xl font-bold text-white mb-2 max-md:text-2xl">
          Politique de confidentialité
        </h1>
        <p className="text-white/50 text-sm mb-10">
          Dernière mise à jour : avril 2025
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">
            1. Responsable du traitement
          </h2>
          <p className="text-white/70 leading-relaxed mb-2">
            Le responsable du traitement des données personnelles collectées sur{" "}
            <strong className="text-white">Ma DVDthèque</strong> est :
          </p>
          <ul className="text-white/70 leading-relaxed space-y-1 list-none pl-0">
            <li>
              <span className="text-white/50">Nom :</span>{" "}
              <strong className="text-white">
                Lea Harmajabb
              </strong>
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
            2. Données collectées
          </h2>
          <p className="text-white/70 leading-relaxed mb-3">
            Lors de l'utilisation de Ma DVDthèque, les données suivantes sont
            collectées :
          </p>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">
                Lors de la création de compte
              </h3>
              <ul className="text-white/70 text-sm space-y-1 list-disc list-inside">
                <li>Pseudonyme</li>
                <li>Adresse e-mail</li>
                <li>
                  Mot de passe (stocké sous forme hashe, jamais en clair)
                </li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">
                Lors de l'utilisation du service
              </h3>
              <ul className="text-white/70 text-sm space-y-1 list-disc list-inside">
                <li>
                  Les DVDs que vous ajoutez à votre collection (titre, notes,
                  informations de prêt)
                </li>
              </ul>
            </div>
          </div>
          <p className="text-white/50 text-sm mt-4 leading-relaxed">
            Aucune donnée de navigation, cookie publicitaire ou traceur tiers
            n'est utilisé.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">
            3. Finalités du traitement
          </h2>
          <p className="text-white/70 leading-relaxed mb-3">
            Vos données sont utilisées uniquement pour :
          </p>
          <ul className="text-white/70 leading-relaxed space-y-2 list-disc list-inside">
            <li>Créer et gérer votre compte utilisateur</li>
            <li>Vous permettre d'accéder à votre collection personnelle</li>
            <li>
              Envoyer un email de réinitialisation de mot de passe si vous en
              faites la demande
            </li>
          </ul>
          <p className="text-white/70 leading-relaxed mt-3">
            Vos données ne sont{" "}
            <strong className="text-white">jamais vendues</strong>, partagées
            avec des tiers à des fins commerciales, ni utilisées à des fins
            publicitaires.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">
            4. Base légale du traitement
          </h2>
          <p className="text-white/70 leading-relaxed">
            Le traitement de vos données repose sur votre{" "}
            <strong className="text-white">consentement</strong> lors de la
            création de votre compte (article 6.1.a du RGPD) et sur
            l'exécution du contrat de service auquel vous souscrivez en vous
            inscrivant (article 6.1.b du RGPD).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">
            5. Durée de conservation
          </h2>
          <p className="text-white/70 leading-relaxed">
            Vos données sont conservées tant que votre compte est actif. Si vous
            supprimez votre compte, toutes vos données personnelles (compte et
            collection de DVDs) sont définitivement supprimées de nos serveurs
            dans un délai de <strong className="text-white">immédiat</strong>.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">
            6. Vos droits (RGPD)
          </h2>
          <p className="text-white/70 leading-relaxed mb-3">
            Conformément au Règlement Général sur la Protection des Données
            (RGPD), vous disposez des droits suivants :
          </p>
          <ul className="text-white/70 leading-relaxed space-y-2 list-disc list-inside">
            <li>
              <strong className="text-white">Droit d'accès</strong> : obtenir
              une copie de vos données personnelles
            </li>
            <li>
              <strong className="text-white">Droit de rectification</strong> :
              corriger des données inexactes
            </li>
            <li>
              <strong className="text-white">Droit à l'effacement</strong> :
              demander la suppression de votre compte et de vos données
            </li>
            <li>
              <strong className="text-white">Droit à la portabilité</strong> :
              recevoir vos données dans un format lisible
            </li>
            <li>
              <strong className="text-white">Droit d'opposition</strong> : vous
              opposer à un traitement de vos données
            </li>
          </ul>
          <p className="text-white/70 leading-relaxed mt-4">
            Pour exercer ces droits, contactez-nous à :{" "}
            <a
              href="mailto:harmajabb@pm.me"
              className="text-accent underline underline-offset-2 hover:text-white transition-colors"
            >
              harmajabb@pm.me
            </a>
          </p>
          <p className="text-white/70 leading-relaxed mt-2">
            En cas de désaccord, vous avez également le droit d'introduire une
            réclamation auprès de la{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2 hover:text-white transition-colors"
            >
              CNIL
            </a>{" "}
            (Commission Nationale de l'Informatique et des Libertés).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">
            7. Sécurité des données
          </h2>
          <p className="text-white/70 leading-relaxed">
            Des mesures techniques et organisationnelles sont mises en place
            pour protéger vos données : mots de passe chiffrés (hachage), accès
            sécurisé via HTTPS, et accès aux données limité au strict nécessaire.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">
            8. Données tierces - TMDB
          </h2>
          <p className="text-white/70 leading-relaxed">
            Les informations sur les films sont récupérées via l'API de{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2 hover:text-white transition-colors"
            >
              The Movie Database (TMDB)
            </a>
            . Ces recherches sont effectuées côté serveur ; aucune donnée
            personnelle vous concernant n'est transmise à TMDB.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">
            9. Cookies
          </h2>
          <p className="text-white/70 leading-relaxed">
            Ce site n'utilise pas de cookies publicitaires ni de traceurs tiers.
            Un token d'authentification peut être stocké dans le stockage local
            de votre navigateur (localStorage) afin de maintenir votre session.
            Ce token est supprimé à la déconnexion.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">
            10. Modification de la politique
          </h2>
          <p className="text-white/70 leading-relaxed">
            Cette politique de confidentialité peut être mise à jour. La date de
            dernière modification est indiquée en haut de cette page. En
            continuant à utiliser le service après une modification, vous
            acceptez la nouvelle version.
          </p>
        </section>
      </div>
    </main>
  );
};

export default PolitiqueConfidentialite;
