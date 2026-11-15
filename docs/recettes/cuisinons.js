// ============================================================//
// =============    AFFICHAGE TUILES RECETTE      =============//
// ============================================================//

document.addEventListener("DOMContentLoaded", function () {
    // VARIABLES
    const bouton   = document.getElementById("bpCuisine");
    const piste    = document.getElementById("etapes");
    const compteur = document.getElementById("cptetapes");
    const flecheG  = document.getElementById("flecheG");
    const flecheD  = document.getElementById("flecheD");
    const total    = piste.children.length;
    const tuiles   = Array.from(piste.children);

    function indexVisible() { // RECHERCHE TUILE LA + PROCHE EN POSITION
        let meilleur   = 0;          // index de la tuile retenue
        let meilleurEcart = Infinity; // plus petit écart rencontré (∞ = "rien vu encore")
        tuiles.forEach(function(tuile, i) {
            const gaucheTuile = tuile.offsetLeft - piste.offsetLeft;
            const ecart = Math.abs(gaucheTuile - piste.scrollLeft);
            if (ecart < meilleurEcart) {
                meilleurEcart = ecart;
                meilleur = i;
            }
        });
        return meilleur;   // 0 pour la première tuile
    }

    // CLIC SUR BOUTON MODE TUILE
    bouton.addEventListener("click", function () {
        const actif = document.body.classList.toggle("cuisine");
        bouton.setAttribute("aria-pressed", actif);
        bouton.textContent = actif ? "Voir toute la recette" : "Cuisinons ! :)";
        if (actif) maj();
    });

    // GESTION DES FLECHES DE DEFILEMENT DES TUILES
    function versCote(cote) {
        piste.scrollBy({ left: cote * piste.clientWidth, behavior: "smooth" });
    }
    flecheG.addEventListener("click", function () { versCote(-1); });
    flecheD.addEventListener("click", function () { versCote( 1); });

    // COMPTEUR DU NUMERO D'ETAPES
    function maj() {
        const index = indexVisible();
        compteur.textContent = "Étape " + (index + 1) + " sur " + tuiles.length;
        piste.setAttribute("data-active", index);
        // MASQUAGE FLECHES SELON SI AU DEBUT OU A LA FIN
        const auDebut = piste.scrollLeft < 20;
        const auFin   = (piste.scrollWidth - piste.scrollLeft - piste.clientWidth) < 10;
        flecheG.style.visibility = auDebut ? "hidden" : "visible";
        flecheD.style.visibility = auFin   ? "hidden" : "visible";
    }
    // ATTENTE DU SCROLL DE LA TUILE + DRAPEAU POUR EVITER LES REPETITIONS
    let enAttente = false;
    piste.addEventListener("scroll", function () {
        if (enAttente) return;
        enAttente = true;
        requestAnimationFrame(function () { maj(); enAttente = false; });
    }, { passive: true });

    window.addEventListener("resize", maj);
    maj();
});