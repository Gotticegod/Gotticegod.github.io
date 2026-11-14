// ============================================================
// ==============            REGLAGES            ==============
// ============================================================
const RAYON    = 120;   // en px : moitié de la hauteur de la zone d'effet
const ZOOM_MIN = 1;     // grossissement hors de la zone
const ZOOM_MAX = 2;     // grossissement pile au centre

// ============================================================
// ==============        RECHERCHE LIGNES        ==============
// ============================================================
// on cherche toutes les lignes du document 1 fois et on les stocke dans un tableau
const lignes = Array.from(document.querySelectorAll(".ligne"));

// ============================================================
// ==============        FONCTION MAJ ZOOM       ==============
// ============================================================
function majZoom() {
    const centre = window.innerHeight / 2; // Le centre de l'écran, en coordonnées viewport

    lignes.forEach(function(ligne) {

        const boite = ligne.getBoundingClientRect(); // getBoundingClientRect renvoie la boîte VISUELLE de la ligne
        const milieu = boite.top + boite.height / 2;// Position verticale du milieu de la ligne
        const distance = Math.abs(milieu - centre); // Distance au centre de l'écran, en pixels (valeur positive)
        let ratio = Math.min(distance / RAYON, 1); //   0 = la ligne est exactement au centre - 1 = elle est à RAYON px ou plus loin
        ratio = ratio * ratio * (3 - 2 * ratio); // Adoucissement effet
        const facteur = ZOOM_MAX - ratio * (ZOOM_MAX - ZOOM_MIN); // Règle de trois : on interpole entre ZOOM_MAX (au centre) et ZOOM_MIN (au bord de la zone)
        ligne.style.transform = `scale(${facteur})`; // Application. transform ne déplace PAS le document : la ligne grossit par-dessus ses voisines, sans reflow.        
        const progression = (facteur - ZOOM_MIN) / (ZOOM_MAX - ZOOM_MIN); // Le dégradé de transparence suit le même mouvement : ce qui est net est opaque, ce qui est loin s'estompe.
        ligne.style.opacity = (0.45 + 0.55 * progression).toFixed(3); // (0.45 + 0.55 × le facteur normalisé entre 1 et ZOOM_MAX)
    });
}

// ============================================================
// ==============          DECLENCHEMENT         ==============
// ============================================================
// déclenchement une seule fois par image (variable enAttente)
let enAttente = false;

window.addEventListener("scroll", function() {
    if (enAttente) return;          // déjà programmé pour cette image
    enAttente = true;
    requestAnimationFrame(function() {
        majZoom();
        enAttente = false;
    });
}, { passive: true });              // passive : ce script ne bloquera jamais le défilement

// La hauteur de fenêtre entre dans le calcul du centre
window.addEventListener("resize", majZoom);

// Premier placement : sans ça, tout est à l'échelle 1 au chargement
// et rien ne bouge tant que l'utilisateur n'a pas défilé.
majZoom();