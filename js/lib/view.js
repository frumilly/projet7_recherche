// faire l'affichage 
// Fonction pour générer le code HTML d'une carte de recette
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



export function displayRecipes(recipes) {
  // Récupérer l'élément de la page où vous voulez afficher les cartes en utilisant l'ID
  const recipeContainer = document.getElementById('recipeCardContainer');
  let allRecipes="";
  // Générer les cartes de recettes et les ajouter à l'élément container
  recipes.forEach(recipe => {
   
    const recipeCard = generateRecipeCard(recipe);
    allRecipes +=recipeCard;
   
  });
  recipeContainer.innerHTML = allRecipes;
}

export default
{
  displayRecipes
};