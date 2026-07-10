const bloccarte = document.getElementById('bloccarte')
const button = document.querySelectorAll('.plus')
const p = document.querySelectorAll('.cache')
const search = document.getElementById('search') 


async function chargerDonnees() {
  try {
    const response = await fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/les-1000-titres-les-plus-reserves-dans-les-bibliotheques-de-pret/records?where=startswith(type_de_document%2C%22Bande%20dessinée%22)&order_by=rang&limit=100")
    const data = await response.json()
    return data.results
  } catch (erreur) {
    console.error("Erreur de chargement :", erreur.message)
  }
}

// donnees || await chargerDonnees() veut dire : "si donnees est fourni, utilise-le ; sinon, 
// va chercher toi-même" — ça permet à afficher() de fonctionner dans les deux cas (appel 
// normal au chargement, et appel avec une liste filtrée).

async function afficher (donnees) {
  const aff = donnees || await chargerDonnees();
  bloccarte.innerHTML= ""

  for(let i =0; i<aff.length; i++) {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const rang = document.createElement("p");
      const h2 = document.createElement("h2");
      const button = document.createElement("button")
      button.className = ("plus")
      const p = document.createElement("p");
      p.className = ("cache")
      const p2 = document.createElement("p");
      p2.className = ("cache")
      const p3 = document.createElement("p");
      p3.className = ("cache")

      rang.textContent = i+1
      h2.textContent= aff[i].titre;
      button.textContent = "+"
      p.textContent= `Auteur: ${aff[i].auteur}`;
      p2.textContent= aff[i].type_de_document;
      p3.textContent= `Réservations: ${aff[i].reservations}`;

      article.appendChild(rang)
      article.appendChild(img)
      article.appendChild(h2);
      article.appendChild(button)
      article.appendChild(p);
      article.appendChild(p2);
      article.appendChild(p3);

      bloccarte.appendChild(article);
      
      button.addEventListener('click', () => {
      p.classList.toggle('cache');
      p2.classList.toggle('cache');
      p3.classList.toggle('cache');
    });
  }
}

afficher();


search.addEventListener("input",filterData);

function filterData(e) {
  const aff = await chargerDonnees();
  const searchString = e.target.value.toLowerCase();
  const filteredArr = aff.filter(el =>
    el.titre.toLowerCase().includes(searchString) ||
    el.auteur.toLowerCase().includes(searchString)
  );
  afficher(filteredArr); 
}

// const checkbox = document.getElementsByName('type-doc');

// function trier() {
//   const toutCoche = checkbox[0].checked; // "tous"
//   const cartes = document.querySelectorAll('.BD');

//   cartes.forEach(carte => {
//     if (toutCoche) {
//       carte.style.display = 'flex';
//       return;
//     }

//     const type = carte.dataset.type;
//     const afficherCarte =
//       (checkbox[1].checked && type === "Bande dessinée jeunesse") ||
//       (checkbox[2].checked && type === "Bande dessinée ado") ||
//       (checkbox[3].checked && type === "Bande dessinée adulte");

//     carte.style.display = afficherCarte ? 'flex' : 'none';
//   });
// }

// checkbox.forEach(c => c.addEventListener('change', trier));

// const checkbox = document.getElementsByName('type-doc')

// const trier = () => {
//   const aff = await chargerDonnees()
//   const carte = document.querySelectorAll('.BD');
//   carte.style.display = 'none';

//   for(let i=0;i <aff.length;i++) {
//   if (checkbox[2].checked) {
//     if ( aff[i].type_de_document === "Bande dessinée ado") {
//       console.log(afficher())
//     } 
//   } if (checkbox[1].checked) {
//     if ( aff[i].type_de_document === "Bande dessinée jeunesse") {
//       console.log(afficher())
//     }
//   }
//     if (checkbox[3].checked) {
//     if ( aff[i].type_de_document === "Bande dessinée adulte") {
//       console.log(afficher())
//     }
//   }
//   }
// }