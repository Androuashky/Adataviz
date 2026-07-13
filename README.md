# Adataviz

voir le site en ligne (https://adatavizz-androu.netlify.app/)

## 🎯 Objectif

Adataviz est une application web qui récupère un jeu de données réel depuis une API publique et l'affiche sous forme de cartes.

Le jeu de données utilisé provient d'**OpenData Paris** : le top des titres les plus réservés dans les bibliothèques de prêt, filtré sur les bandes dessinées.

La démarche du projet :
- Récupérer des données de façon **asynchrone** avec `fetch`
- Les **afficher dans le DOM** sous forme de cartes
- **Séparer la logique métier** (testable) de l'affichage

## 📸 Aperçu
version desktop 
![alt text](/image/aperçu1.png)

version mobile 
![alt text](/image/aperçu2.png)
![alt text](/image/aperçu3.png)


## 🚀 Fonctionnalités

- Affichage des données sous forme de cartes (titre, auteur, type de document, nombre de réservations)
- Possibilité d'afficher/masquer les détails d'une carte
- Recherche par titre ou auteur
- Filtres par type de document (bande dessinée jeunesse, ado, adulte)

## 🛠️ Technologies utilisées

- HTML5
- CSS3
- JavaScript (ES6+, modules)
- [API OpenData Paris](https://opendata.paris.fr/)


## 📁 Structure du projet

```
adataviz/
├── index.html
├── style.css
├── main.js       # Logique principale : affichage, chargement des données
├── utils.js         # Fonctions utilitaires (filtrage, recherche)
├── utils.test.js  
├── image
├── font 
├── package.json
├── gitignore   
└── README.md
```

## 💡 Pistes d'amélioration

- Ajouter les premieres de couvertures
- Ajouter le rang sur 100 
- Ajouter un tri (par nombre de réservations, ordre alphabétique...)
- Améliorer le style responsive

## ✍️ Auteur

Projet réalisé dans le cadre de la formation **Ada Tech School**.


