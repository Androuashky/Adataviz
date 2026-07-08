
const chargerDonnees = async () => {

  try {
  const response = await fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/les-1000-titres-les-plus-reserves-dans-les-bibliotheques-de-pret/records?where=startswith(type_de_document%2C%22Bande%20dessinée%22)&order_by=rang&limit=100")
  const data = await response.json()
    return data.results 
  } catch (erreur) {
    console.error("Erreur de chargement :", erreur.message)
  } 
}

async function afficher () {
  const blabla = await chargerDonnees()

  for(let i =0; i<blabla.length; i++) {
    console.log(blabla[i].titre)
  }
}

afficher()