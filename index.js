// Importez ici les données de recettes depuis le fichier data/recettes.js
import { recettes } from 'data/recipes.js';

// Fonction pour afficher les recettes
function afficherRecettes() {
  const carteRecetteContainer = document.querySelector('.card-deck');

  recettes.slice(0, 50).forEach(recette => {
    const carteRecette = `
      <div class="card mb-4">
        <img src="${recette.image}" class="card-img-top" alt="${recette.nom}">
        <div class="card-body">
          <h5 class="card-title">${recette.nom}</h5>
          <p class="card-text">${recette.description}</p>
        </div>
      </div>
    `;
    carteRecetteContainer.innerHTML += carteRecette;
  });
}

// Appel à la fonction pour afficher les recettes
afficherRecettes();
