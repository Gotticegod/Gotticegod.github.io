// Gestion calcul ingrédients nombre de personnes - par défaut 6
var personnes = 6;
// Comptage / décomptage nombre personnes + recalcul ingrédients
function CalcPers(quantite) {
    // Variables
    personnes = personnes + quantite;
    // Empêche de descendre en dessous de 1
    if (personnes < 1) {
        personnes = 1;
    }
    // Empêche de monter au-dessus de 10
    if (personnes > 20) {
        personnes = 20;
    }
    CalcIngr(personnes);
}

// Au chargement de la page - Comptage / décomptage nombre personnes + recalcul ingrédients
document.addEventListener("DOMContentLoaded", function() {
    CalcIngr(personnes);
});

function CalcIngr(Nbpers) {
// Variables
    var ingr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    for (let i = 1; i <= 15; i++) {
        ingr[i] = parseFloat(document.getElementById("ingr" + i).dataset.poids);
    }
    
    // Affiche la nouvelle valeur dans le html
    document.getElementById("nbPersonnes").textContent = Nbpers;
    // Recalcule les ingrédients automatiquement
    //if (ingr1 > 0) {document.getElementById("totingr1").textContent = (Nbpers * ingr1).toFixed(1);}
    
    for (let j = 1; j <= 15; j++) {
        if (ingr[j] > 0) {
            document.getElementById("totingr" + j).textContent = (Nbpers * ingr[j]).toFixed(1);
            document.getElementById("totingrd" + j).textContent = (Nbpers * ingr[j]).toFixed(1);
        }
    }

}