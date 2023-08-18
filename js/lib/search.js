// faire la recherche - récupére les datas , searchbox et tag --> filtre et renvoie les recettes
// pour la version 2 seul ce fichier sera modifié -- fonctionnel to boucle native

// search.js
function filter(recipes, searchbox, tags) {
    searchbox = searchbox.toLowerCase();

    return recipes.filter(recipe => {
        const title = recipe.name.toLowerCase(); // Utilisez "name" au lieu de "title"
        const description = recipe.description.toLowerCase();
        const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());

        const titleMatch = title.includes(searchbox);
        const descriptionMatch = description.includes(searchbox);
        const ingredientMatch = ingredients.some(ingredient => ingredient.includes(searchbox));

        return titleMatch || descriptionMatch || ingredientMatch;
    });
}

export {
    filter
};
