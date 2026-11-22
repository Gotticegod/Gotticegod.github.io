// Gestion calcul ingrédients nombre de pâtes - par défaut 1
var pates = 1;
// Comptage / décomptage nombre pâtes + recalcul ingrédients
function CalcPates(quantite) {
    // Variables
    pates = pates + quantite;
    // Empêche de descendre en dessous de 1
    if (pates < 1) {
        pates = 1;
    }
    // Empêche de monter au-dessus de 5
    if (pates > 10) {
        pates = 10;
    }
    CalcIngr(pates);
}

// Au chargement de la page - Comptage / décomptage nombre pâtes + recalcul ingrédients
document.addEventListener("DOMContentLoaded", function() {
    CalcIngr(pates);
});

function CalcIngr(Nbpates) {
// Variables
    var ingr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    for (let i = 1; i <= 15; i++) {
        ingr[i] = parseFloat(document.getElementById("ingr" + i).dataset.poids);
    }
    
    // Affiche la nouvelle valeur dans le html
    document.getElementById("nbPates").textContent = Nbpates;
    // Recalcule les ingrédients automatiquement
    //if (ingr1 > 0) {document.getElementById("totingr1").textContent = (Nbpers * ingr1).toFixed(1);}
    
    for (let j = 1; j <= 15; j++) {
        if (ingr[j] > 0) {
            document.getElementById("totingr" + j).textContent = (Nbpates * ingr[j]).toFixed(1);
            document.getElementById("totingrd" + j).textContent = (Nbpates * ingr[j]).toFixed(1);
        }
    }

}