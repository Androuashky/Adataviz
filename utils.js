let globalData = []

async function chargerDonnees() {
  try {
    const response = await fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/les-1000-titres-les-plus-reserves-dans-les-bibliotheques-de-pret/records?where=startswith(type_de_document%2C%22Bande%20dessinée%22)&order_by=rang&limit=100")
    const data = await response.json();
    globalData = data.results
    return data.results
  } catch (erreur) {
    console.error("Erreur de chargement :", erreur.message)
  }
}

async function init() {
  const data = await chargerDonnees();
  
  const filterBdj = data.filter(el => el.type_de_document === "Bande dessinée jeunesse");
  console.log(filterBdj);
}

init();