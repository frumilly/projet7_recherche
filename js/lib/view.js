// faire l'affichage 
// Fonction pour générer le code HTML d'une carte de recette
  // Déclarez et initialisez les sélecteurs 
  const ingredientSelect = document.querySelector('.ingredient-select');
  const appareilSelect = document.querySelector('.appareil-select');
  const ustensileSelect = document.querySelector('.ustensile-select');
  function sortAlphabetically(arr) {
    return arr.map(item => item.charAt(0).toUpperCase() + item.slice(1)) // Capitaliser la première lettre
              .sort((a, b) => a.localeCompare(b));
}
function generateRecipeCard(recipe) {
  const ingredients = recipe.ingredients;
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
  const allIngredients = recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()));
  const uniqueIngredients = Array.from(new Set(allIngredients));  
  return uniqueIngredients;
}

function getFilteredAppareils(recipes) {
  const allAppareils = recipes.map(recipe => recipe.appliance.toLowerCase());
  const uniqueAppareils = Array.from(new Set(allAppareils));
  return uniqueAppareils;
}

function getFilteredUstensiles(recipes) {
  const allUstensiles = recipes.flatMap(recipe => recipe.ustensils.map(ustensile => ustensile.toLowerCase()));
  const uniqueUstensiles = Array.from(new Set(allUstensiles));
  return uniqueUstensiles;
}
//fin affichage

function updateSelectOptions(selectElement, title, options,selectedElmt) {
  // Supprimer toutes les options existantes de la selectbox
  selectElement.innerHTML = '';

  // Ajouter le titre
  const titleOption = document.createElement('option');
  titleOption.textContent = title;
  titleOption.disabled = true;
  selectElement.appendChild(titleOption);

  // Ajouter les nouvelles options à la selectbox
  options.forEach(option => {
    if (option != selectedElmt){
      const optionElement = document.createElement('option');
      optionElement.textContent = option;
      selectElement.appendChild(optionElement);
    
  }
  });
  selectElement.selectedIndex = 0;
}

export function displayRecipes(recipes) {
  // Récupérer l'élément de la page où vous voulez afficher les cartes en utilisant l'ID
  const recipeContainer = document.getElementById('recipeCardContainer');
  const searchInput = document.querySelector('.search-input');
  let searchValue = searchInput.value.trim();
    // Si aucune recette n'est trouvée, afficher le message d'erreur
    // Aucune recette ne contient ‘XXX ’ vous pouvez chercher «tarte aux pommes », « poisson », etc.
    if (recipes.length === 0) {
      if (searchValue.length >= 3) {
        var errorMessage = "Aucune recette ne contient ‘" + searchValue + "’. Vous pouvez chercher «tarte aux pommes», «poisson», etc.";
        recipeContainer.innerHTML = '<div class="error-message">' + errorMessage + '</div>';
    } else {
      recipeContainer.innerHTML = '<div class="error-message">Aucune recette trouvée.</div>';
    }
     
      return;
    }
  let allRecipes="";
  // Générer les cartes de recettes et les ajouter à l'élément container
  recipes.forEach(recipe => {
   
    const recipeCard = generateRecipeCard(recipe);
    allRecipes +=recipeCard;
   
  });
  recipeContainer.innerHTML = allRecipes;
}
export function majSelect(recipes){
  updateSelectOptions(ingredientSelect, 'Ingrédient', sortAlphabetically(getFilteredIngredients(recipes)));
    updateSelectOptions(appareilSelect, 'Appareils', sortAlphabetically(getFilteredAppareils(recipes)));
    updateSelectOptions(ustensileSelect, 'Ustensiles', sortAlphabetically(getFilteredUstensiles(recipes)));
}
export function majSelect2(recipes, removedIngredient) {
 
  const filteredIngredients = sortAlphabetically(getFilteredIngredients(recipes));
  const filteredAppareils = sortAlphabetically(getFilteredAppareils(recipes));
  const filteredUstensiles = sortAlphabetically(getFilteredUstensiles(recipes));
  
  updateSelectOptions(ingredientSelect, 'Ingrédient', filteredIngredients,removedIngredient);
 updateSelectOptions(appareilSelect, 'Appareils', filteredAppareils,removedIngredient);
  updateSelectOptions(ustensileSelect, 'Ustensiles', filteredUstensiles,removedIngredient);
}

export default
{
  displayRecipes,
  majSelect,
  majSelect2

};