const scriptCourant = document.currentScript;
const categorieCourante = scriptCourant // lire la catégorie envoyée en même temps que le script
    ? scriptCourant.dataset.categorie   // la balise a été trouvée
    : null;                             // sinon on ne plante pas, on ouvre rien

function devCatSommaire(categorie) {
    if (!categorie) {  // Si aucune catégorie n'a été déclarée, on ne fait rien :
        return;
    }
    // Renvoie une liste (vide si le sommaire n'est pas encore injecté).
    const sections = document.querySelectorAll("#sommaire details[data-categorie]");
    sections.forEach(function(details) {
        if (details.dataset.categorie === categorie) {
            details.open = true;
        }
    });
}



// Quand la page est entièrement chargée et prête
document.addEventListener("DOMContentLoaded", function() {
    // fetch() = demande au navigateur d'aller chercher un fichier
    fetch("/sommaire.html")
        // .then() = attente réponse
        // response = le fichier qu'on a demandé
        .then(function(response) {
            // response.ok = true si le fichier a été trouvé (code HTTP 200)
            // Si le fichier n'existe pas, on affiche une erreur dans la console
            if (!response.ok) {
                throw new Error("Impossible de charger le menu");
            }
            // .text() = lit le contenu du fichier comme du texte brut (le HTML)
            // Retourne une promesse (le navigateur doit encore "lire" le fichier)
            return response.text();
        })
        .then(function(html) {
            // html = le contenu de sommaire.html sous forme de chaîne de caractères
            // document.getElementById("menu") = cherche l'élément qui a id="sommaire"
            // .innerHTML = remplace le contenu de cet élément par le HTML qu'on a reçu
            document.getElementById("sommaire").innerHTML = html;
            devCatSommaire(categorieCourante);
        })
        // .catch() = "s'il y a une erreur à n'importe quelle étape"
        // error = l'objet erreur (message, ligne, etc.)
        .catch(function(error) {
            console.error("Erreur chargement menu :", error);
        });
});