
const bloccarte = document.getElementById('bloccarte')
const button = document.querySelectorAll('.plus')
const p = document.querySelectorAll('.cache')
const search = document.getElementById('search') 
const form = document.querySelector('.search-bar');

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

// donnees || await chargerDonnees() veut dire : "si donnees est fourni, utilise-le ; sinon, 
// va chercher toi-même" — ça permet à afficher() de fonctionner dans les deux cas (appel 
// normal au chargement, et appel avec une liste filtrée).

async function afficher (donnees) {
  const aff = donnees || await chargerDonnees();
  bloccarte.innerHTML = ""

  for(let i =0; i<aff.length; i++) {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const rang = document.createElement("p");
      const h2 = document.createElement("h2");
      const p = document.createElement("p");
      p.className = ("cache")
      const p2 = document.createElement("p");
      p2.className = ("cache")
      const p3 = document.createElement("p");
      p3.className = ("cache")
      const button = document.createElement("button")
      button.className = ("plus")

      rang.textContent = aff[i].rang
      h2.textContent= aff[i].titre;
      p.textContent= `Auteur: ${aff[i].auteur}`;
      p2.textContent= aff[i].type_de_document;
      p3.textContent= `Réservations: ${aff[i].reservations}`;
      button.textContent = "+"

      article.appendChild(rang)
      article.appendChild(img)
      article.appendChild(h2);
      article.appendChild(p);
      article.appendChild(p2);
      article.appendChild(p3);
      article.appendChild(button);

      bloccarte.appendChild(article);
      
      button.addEventListener('click', () => {
      p.classList.toggle('cache');
      p2.classList.toggle('cache');
      p3.classList.toggle('cache');
    });
  }
}

afficher();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  });

search.addEventListener("input", (e) => {
  filterData(e)
  e.preventDefault();
});

let dernierAppelId = 0;

function filterData(e) {
  const idActuel = ++dernierAppelId;
  const searchString = e.target.value.toLowerCase();

  const filteredArr = globalData.filter(el => {
   const titreCorrespond = el.titre && el.titre.toLowerCase().includes(searchString);
    const auteurCorrespond = el.auteur && el.auteur.toLowerCase().includes(searchString);
    return titreCorrespond || auteurCorrespond;
  });
  afficher(filteredArr); 
}


async function init() {
  const data = await chargerDonnees();
  
  const filterBdj = data.filter(el => el.type_de_document === "Bande dessinée jeunesse");
  console.log(filterBdj);
}

init();


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

// checkbox.forEach(c => c.addEventListener('checked', trier));



// const trier = () => {
//   const aff = await chargerDonnees()
//   const carte = document.querySelectorAll('.BD');
//   carte.style.display = 'none';

//   for(let i=0;i <aff.length;i++) {
//   if (checkbox[2].checked) {
//     if ( aff[i].type_de_document === "Bande dessinée ado") {
      
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