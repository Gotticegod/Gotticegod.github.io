// ============================================================//
// =============    GENERATION HTML CALENDRIER    =============//
// ============================================================//

// =============    Structure à créer pour chaque l:    =============//
//                <tr>
//                    <td class="cell1"><a href="/jardin/details/libre.html">Courgettes</a></td>
//                    <td class="cell cellM1"></td>
//                    <td class="cell cellM2"></td>
//                    <td class="cell cellM3"></td>
//                    <td class="cell cellM4"></td>
//                    <td class="cell cellM5"></td>
//                    <td class="cell cellM6"></td>
//                    <td class="cell cellM7"></td>
//                    <td class="cell cellM8"></td>
//                    <td class="cell cellM9"></td>
//                    <td class="cell cellM10"></td>
//                    <td class="cell cellM11"></td>
//                    <td class="cell cellM12"></td>
//                </tr> -->               

// Conversion "3-4,6-8,11" → [3, 4, 6, 7, 8, 11]
function Nbmois(str) {
    return str.split(",").flatMap(part => {
        const [a, b] = part.split("-").map(Number);
        return b ? Array.from({ length: b - a + 1 }, (_, i) => a + i) : [a];
    });
}

const listePotager = [
    { nom: "Courgettes", lien: "/jardin/details/courgettes.html", semis: "4-6", repiquage: "5-7", recolte: "7-10" },
    { nom: "Tomates", lien: "/jardin/details/tomates.html", semis: "3-7", repiquage: "5-7", recolte: "6-10" },
    { nom: "P.d.T", lien: "/jardin/details/pdt.html", semis: "", repiquage: "", recolte: "" },
];

const tbody = document.querySelector("#calendrier tbody");

listePotager.forEach(elmt => {
    const tr = document.createElement("tr");

    // création 1ère cellule avec nom & lien
    const tdNom = document.createElement("td");
    tdNom.innerHTML = `<a href="${elmt.lien}">${elmt.nom}</a>`;
    tr.appendChild(tdNom);

    // 12 cellules vides (les lignes sont créées en CSS)
    // + récupération des dates de plantation
    for (let Mois = 1; Mois <= 12; Mois++) {
        const td = document.createElement("td");
        td.className = `cell cellM${Mois}`;
        if (Nbmois(elmt.semis).includes(Mois))      td.classList.add("actif-l1");
        if (Nbmois(elmt.repiquage).includes(Mois))  td.classList.add("actif-l2");
        if (Nbmois(elmt.recolte).includes(Mois))    td.classList.add("actif-l3");
        tr.appendChild(td);
    }
    tbody.appendChild(tr);
});