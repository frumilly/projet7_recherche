function filter(recipes, searchbox, tags) {
  // searchbox = searchbox.toLowerCase();

  return recipes.filter((recipe) => {
    const lowerCaseTags = tags.map((tag) => tag.toLowerCase());

    const title = recipe.name.toLowerCase();
    const description = recipe.description.toLowerCase();
    /* eslint-disable */
    const ingredientNames = recipe.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase());
    const appliance = recipe.appliance.toLowerCase();
    const ustensils = recipe.ustensils.map((ustensil) => ustensil.toLowerCase());
    // La fonction includesSearchBox est une fonction qui renvoie true si le terme de recherche (recherché en minuscules) est inclus dans la chaîne de caractères donnée (convertie en minuscules).
    const includesSearchBox = (str) => str.includes(searchbox);
/* eslint-disable */
    const titleMatch = includesSearchBox(title);
    const descriptionMatch = includesSearchBox(description);
    const ingredientMatch = ingredientNames.some(includesSearchBox);
    const applianceMatch = includesSearchBox(appliance);
    const ustensilMatch = ustensils.some(includesSearchBox);

    const tagMatch = lowerCaseTags.length === 0 || lowerCaseTags.every((tag) => ingredientNames.includes(tag) || appliance.includes(tag) || ustensils.includes(tag));

    return (titleMatch || descriptionMatch || ingredientMatch || applianceMatch || ustensilMatch) && tagMatch;
  });
}

export {
  filter,
};
