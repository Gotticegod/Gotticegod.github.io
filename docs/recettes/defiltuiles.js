// ============================================================//
// =============    DEFILEMENT TUILES RECETTE     =============//
// ============================================================//

const piste = document.querySelector(".etapes");
const tuiles = piste.querySelectorAll(".etape");

let startX = 0;
let verrou = false;

piste.addEventListener("touchstart", (e) => { // Récupération position de touch initiale
    startX = e.touches[0].clientX;
}, { passive: true });

piste.addEventListener("touchend", (e) => { // Récupération position de touch finale
    if (verrou) return;

    const deltaX = e.changedTouches[0].clientX - startX; // Calcul delta entre les 2 positions
    // Seuil minimal pour éviter les micro-tremblements (30px)
    if (Math.abs(deltaX) < 30) return;

    verrou = true;

    const largeur = tuiles[0].offsetWidth; // Récupération largeur d'une tuile
    const indexActuel = Math.round(piste.scrollLeft / largeur); // Calcul position tuile actuelle
    const cible = deltaX < 0
        ? Math.min(indexActuel + 1, tuiles.length - 1)   // swipe gauche → suivant
        : Math.max(indexActuel - 1, 0);                    // swipe droite → précédent
    piste.scrollTo({ // Commande de scroll
        left: cible * largeur,
        behavior: "smooth"
    });

    setTimeout(() => { verrou = false; }, 400); // Sécurité de relance du scroll temporisée
});