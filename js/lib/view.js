// faire l'affichage
// Fonction pour générer le code HTML d'une carte de recette
// Déclarez et initialisez les sélecteurs
function sortAlphabetically(arr) {
  /* eslint-disable */
  return arr.map((item) => item.charAt(0).toUpperCase() + item.slice(1)) // Capitaliser la première lettre
  /* eslint-disable */
    .sort((a, b) => a.localeCompare(b));
}
function escapeUserInput(input) {
  // Échappez les caractères spéciaux en utilisant des expressions régulières
  return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function generateRecipeCard(recipe) {
  const { ingredients } = recipe;
  const ingredientsCount = ingredients.length;
  const halfIngredientsCount = Math.ceil(ingredientsCount / 2);

  let firstColumn = '';
  let secondColumn = '';

  for (let i = 0; i < ingredientsCount; i++) {
    const ingredient = ingredients[i];
    const quantity = ingredient.quantity || '';
    const unit = ingredient.unit || '';

    const ingredientMarkup = `
        <li class="titre_ing">${ingredient.ingredient}</li>
        <li class="col1">${quantity} ${unit}</li>
      `;

    if (i < halfIngredientsCount) {
      firstColumn += ingredientMarkup;
    } else {
      secondColumn += ingredientMarkup;
    }
  }

  return `
      <div class="col-md-4">
        <div class="recipe-card">
          <img src="asset/images/${recipe.image}" class="img-fluid" alt="Recipe Image">
          <div class="time-badge">${recipe.time}min</div>
          <h3>${recipe.name}</h3>
          <p class="description_recette">${recipe.description}</p>
          <p>INGRÉDIENTS</p>
          <div class="row">
            <div class="col-md-6">
              <ul>${firstColumn}</ul>
            </div>
            <div class="col-md-6">
              <ul>${secondColumn}</ul>
            </div>
          </div>
        </div>
      </div>
    `;
}

// affichage des selctbox mise à jour --> view.js
function getFilteredIngredients(recipes) {
  const allIngredients = recipes.flatMap((recipe) => recipe.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase()));
  const uniqueIngredients = Array.from(new Set(allIngredients));
  return uniqueIngredients;
}

function getFilteredAppareils(recipes) {
  const allAppareils = recipes.map((recipe) => recipe.appliance.toLowerCase());
  const uniqueAppareils = Array.from(new Set(allAppareils));
  return uniqueAppareils;
}

function getFilteredUstensiles(recipes) {
  const allUstensiles = recipes.flatMap((recipe) => recipe.ustensils.map((ustensile) => ustensile.toLowerCase()));
  const uniqueUstensiles = Array.from(new Set(allUstensiles));
  return uniqueUstensiles;
}
// fin affichage

export function displayRecipes(recipes) {
  // Récupérer l'élément de la page où vous voulez afficher les cartes en utilisant l'ID
  const recipeContainer = document.getElementById('recipeCardContainer');
  const searchInput = document.querySelector('.search-input');
  let searchValue = searchInput.value.trim();
  // Si aucune recette n'est trouvée, afficher le message d'erreur
  // Aucune recette ne contient ‘XXX ’ vous pouvez chercher «tarte aux pommes », « poisson », etc.
  if (recipes.length === 0) {
    if (searchValue.length >= 3) {
      searchValue = escapeUserInput(searchValue);
      const errorMessage = `Aucune recette ne contient ‘${searchValue}’. Vous pouvez chercher «tarte aux pommes», «poisson», etc.`;
      recipeContainer.innerHTML = `<div class="error-message">${errorMessage}</div>`;
    } else {
      recipeContainer.innerHTML = '<div class="error-message">Aucune recette trouvée.</div>';
    }

    return;
  }
  let allRecipes = '';
  // Générer les cartes de recettes et les ajouter à l'élément container
  recipes.forEach((recipe) => {
    const recipeCard = generateRecipeCard(recipe);
    allRecipes += recipeCard;
  });
  recipeContainer.innerHTML = allRecipes;
}
function updateSelectOptions(ulElement, options, tags) {
  // Supprimer tous les éléments <li> existants de la liste
  ulElement.innerHTML = '';

  // Ajouter les nouveaux éléments <li> à la liste
  options.forEach((option) => {
    // Vérifier si l'option n'est pas déjà dans les tags sélectionnés
    if (!tags.includes(option)) {
      const liElement = document.createElement('li');
      liElement.className = 'list-group-item';
      liElement.textContent = option;
      liElement.style.cursor = 'pointer';
      // Ajouter un gestionnaire d'événements pour la sélection de l'élément
      // liElement.addEventListener('click', function() {
      // Votre logique de sélection d'élément ici
      // Par exemple, vous pouvez appeler une fonction pour gérer la sélection
      // console.log("non");
      // });

      ulElement.appendChild(liElement);
    }
  });
}
export function majSelect(recipes, removedIngredient) {
  const filteredIngredients = sortAlphabetically(getFilteredIngredients(recipes));
  const filteredAppareils = sortAlphabetically(getFilteredAppareils(recipes));
  const filteredUstensiles = sortAlphabetically(getFilteredUstensiles(recipes));
  const ingredientList = document.querySelector('#ingredientDropdownList');
  const appareilList = document.querySelector('#appareilDropdownList');
  const ustensileList = document.querySelector('#ustensileDropdownList');
  updateSelectOptions(ingredientList, filteredIngredients, removedIngredient);
  updateSelectOptions(appareilList, filteredAppareils, removedIngredient);
  updateSelectOptions(ustensileList, filteredUstensiles, removedIngredient);
}

export default
{
  displayRecipes,
  majSelect,

};
