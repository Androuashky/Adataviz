export let dernierAppelId = 0;

export function filterData(e, globalData, afficher) {
  const idActuel = ++dernierAppelId;
  const searchString = e.target.value.toLowerCase();

  const filteredArr = globalData.filter(el => {
    const titreCorrespond = el.titre && el.titre.toLowerCase().includes(searchString);
    const auteurCorrespond = el.auteur && el.auteur.toLowerCase().includes(searchString);
    return titreCorrespond || auteurCorrespond;
  });
  afficher(filteredArr);
}

export async function filterByType(checkbox, chargerDonnees, afficher) {
  const data = await chargerDonnees();

  if (checkbox[0].checked) {
    afficher();
  }
  else if (checkbox[1].checked) {
    const filterBdj = data.filter(el => el.type_de_document === "Bande dessinée jeunesse");
    afficher(filterBdj);
  }
  else if (checkbox[2].checked) {
    const filterBdado = data.filter(el => el.type_de_document === "Bande dessinée ado");
    afficher(filterBdado);
  }
  else if (checkbox[3].checked) {
    const filterBdjadulte = data.filter(el => el.type_de_document === "Bande dessinée adulte");
    afficher(filterBdjadulte);
  }
  else {
    afficher([]);
  }
}