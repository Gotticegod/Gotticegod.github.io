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
    let scrollencours=false;   

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
        const actif = document.querySelector(".conteneur").classList.toggle("cuisine");
        bouton.setAttribute("aria-pressed", actif);
        bouton.textContent = actif ? "■\nStopper" : "▶\nLancer";
        document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
        const etatrepli = document.querySelector(".liste-ingredients").classList.contains("replier")
        if (actif) {
            bprepli(false)
        } else {
            bprepli(true)
        }
        if (actif) maj();
    });
    
    
    // GESTION DES FLECHES DE DEFILEMENT DES TUILES
    function versCote(cote) {
        const tuileactuelle = indexVisible();
        const tuilecible = tuileactuelle + cote;
        piste.scrollBy({ left: cote * tuiles[tuilecible].clientWidth + 4, behavior: "smooth" });
    }
    piste.addEventListener("scroll", function () { scrollencours=true});
    piste.addEventListener("scrollend", function () { scrollencours=false});

    if (!scrollencours) {
        flecheG.addEventListener("click", function () { versCote(-1); });
        flecheD.addEventListener("click", function () { versCote( 1); });
    }

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

// ============================================================//
// =============    REPLIER LISTE INGREDIENTS     =============//
// ============================================================//
const bouton = document.querySelector(".bp-replier");
bouton.addEventListener("click", () => {
    const etatrepli = document.querySelector(".liste-ingredients").classList.contains("replier")
    if (etatrepli) {
        bprepli(true)
    } else {
        bprepli(false)
    }
});

function bprepli(repli) {
    const bouton = document.querySelector(".bp-replier");
    const liste = document.querySelector(".liste-ingredients");
    if (repli) {
        const deplie = liste.classList.remove("replier");
        console.log("ajout classe replier",deplie)
        bouton.textContent = "Replier la liste";
        bouton.setAttribute("aria-expanded", true);
    } else {
        const replie = liste.classList.add("replier");
        console.log("ajout classe replier",replie)
        bouton.textContent = "Déplier la liste"
        bouton.setAttribute("aria-expanded", false);
    }
}