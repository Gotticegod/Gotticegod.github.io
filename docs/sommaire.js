// Quand la page est entièrement chargée et prête
document.addEventListener("DOMContentLoaded", function() {

    // fetch() = demande au navigateur d'aller chercher un fichier
    // "nav.html" = le fichier à charger (chemin relatif depuis la page actuelle)
    fetch("sommaire.html")

        // .then() = "quand la réponse arrive" (le navigateur attend, c'est asynchrone)
        // response = la réponse du serveur (le fichier qu'on a demandé)
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
            // html = le contenu de nav.html sous forme de chaîne de caractères

            // document.getElementById("menu") = cherche l'élément qui a id="menu"
            // .innerHTML = remplace le contenu de cet élément par le HTML qu'on a reçu
            document.getElementById("sommaire").innerHTML = html;
        })

        // .catch() = "s'il y a une erreur à n'importe quelle étape"
        // error = l'objet erreur (message, ligne, etc.)
        .catch(function(error) {
            console.error("Erreur chargement menu :", error);
        });
});