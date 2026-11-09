function qtiteingr() {
    var nbpers = parseFloat(document.getElementById("nbpers").textContent);
    var ingr1 = parseInt(document.getElementById("ingr1").dataset.qtite);
    
    document.getElementById("qtiteingr1").textContent = nbpers * ingr1;
}
