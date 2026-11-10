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
    if (personnes > 10) {
        personnes = 10;
    }
    CalcIngr(personnes);
}

// Au chargement de la page - Comptage / décomptage nombre personnes + recalcul ingrédients
document.addEventListener("DOMContentLoaded", function() {
    CalcIngr(personnes);
});

function CalcIngr(Nbpers) {
// Variables
    var ingr1 = parseFloat(document.getElementById("ingr1").dataset.poids);
    var ingr2 = parseFloat(document.getElementById("ingr2").dataset.poids);
    var ingr3 = parseFloat(document.getElementById("ingr3").dataset.poids);
    var ingr4 = parseFloat(document.getElementById("ingr4").dataset.poids);
    var ingr5 = parseFloat(document.getElementById("ingr5").dataset.poids);
    var ingr6 = parseFloat(document.getElementById("ingr6").dataset.poids);
    var ingr7 = parseFloat(document.getElementById("ingr7").dataset.poids);
    var ingr8 = parseFloat(document.getElementById("ingr8").dataset.poids);
    var ingr9 = parseFloat(document.getElementById("ingr9").dataset.poids);
    var ingr10 = parseFloat(document.getElementById("ingr10").dataset.poids);
    var ingr11 = parseFloat(document.getElementById("ingr11").dataset.poids);
    var ingr12 = parseFloat(document.getElementById("ingr12").dataset.poids);
    var ingr13 = parseFloat(document.getElementById("ingr13").dataset.poids);
    var ingr14 = parseFloat(document.getElementById("ingr14").dataset.poids);
    var ingr15 = parseFloat(document.getElementById("ingr15").dataset.poids);

    // Affiche la nouvelle valeur dans le html
    document.getElementById("nbPersonnes").textContent = Nbpers;
    // Recalcule les ingrédients automatiquement
    if (ingr1 > 0) {document.getElementById("totingr1").textContent = (Nbpers * ingr1);}
    if (ingr2 > 0) {document.getElementById("totingr2").textContent = (Nbpers * ingr2);}
    if (ingr3 > 0) {document.getElementById("totingr3").textContent = (Nbpers * ingr3);}
    if (ingr4 > 0) {document.getElementById("totingr4").textContent = (Nbpers * ingr4);}
    if (ingr5 > 0) {document.getElementById("totingr5").textContent = (Nbpers * ingr5);}
    if (ingr6 > 0) {document.getElementById("totingr6").textContent = (Nbpers * ingr6);}
    if (ingr7 > 0) {document.getElementById("totingr7").textContent = (Nbpers * ingr7);}  
    if (ingr8 > 0) {document.getElementById("totingr8").textContent = (Nbpers * ingr8);}
    if (ingr9 > 0) {document.getElementById("totingr9").textContent = (Nbpers * ingr9);}
    if (ingr10 > 0) {document.getElementById("totingr10").textContent = (Nbpers * ingr10);}
    if (ingr11 > 0) {document.getElementById("totingr11").textContent = (Nbpers * ingr11);}
    if (ingr12 > 0) {document.getElementById("totingr12").textContent = (Nbpers * ingr12);}
    if (ingr13 > 0) {document.getElementById("totingr13").textContent = (Nbpers * ingr13);}
    if (ingr14 > 0) {document.getElementById("totingr14").textContent = (Nbpers * ingr14);}
    if (ingr15 > 0) {document.getElementById("totingr15").textContent = (Nbpers * ingr15);}
}