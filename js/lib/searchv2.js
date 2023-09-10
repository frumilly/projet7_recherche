// search.js
function filter(recipes, searchbox, tags) {
    const lowerCaseSearchBox = searchbox.toLowerCase();
    const lowerCaseTags = tags.map(tag => tag.toLowerCase());

    const filteredRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const lowerCaseTitle = recipe.name.toLowerCase();
        const lowerCaseDescription = recipe.description.toLowerCase();
        const ingredientNames = [];
        for (let j = 0; j < recipe.ingredients.length; j++) {
            ingredientNames.push(recipe.ingredients[j].ingredient.toLowerCase());
        }
        const lowerCaseAppliance = recipe.appliance.toLowerCase();
        const lowerCaseUstensils = [];
        for (let k = 0; k < recipe.ustensils.length; k++) {
            lowerCaseUstensils.push(recipe.ustensils[k].toLowerCase());
        }

        const includesSearchBox = (str, searchTerm) => {
            for (let l = 0; l <= str.length - searchTerm.length; l++) {
                let match = true;
                for (let m = 0; m < searchTerm.length; m++) {
                    if (str[l + m] !== searchTerm[m]) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    return true;
                }
            }
            return false;
        };

        const titleMatch = includesSearchBox(lowerCaseTitle, lowerCaseSearchBox);
        const descriptionMatch = includesSearchBox(lowerCaseDescription, lowerCaseSearchBox);
        let ingredientMatch = false;
        for (let n = 0; n < ingredientNames.length; n++) {
            if (includesSearchBox(ingredientNames[n], lowerCaseSearchBox)) {
                ingredientMatch = true;
                break;
            }
        }
        const applianceMatch = includesSearchBox(lowerCaseAppliance, lowerCaseSearchBox);
        let ustensilMatch = false;
        for (let o = 0; o < lowerCaseUstensils.length; o++) {
            if (includesSearchBox(lowerCaseUstensils[o], lowerCaseSearchBox)) {
                ustensilMatch = true;
                break;
            }
        }

        const tagMatch = lowerCaseTags.length === 0 || lowerCaseTags.every(tag => {
            let found = false;
            for (let p = 0; p < ingredientNames.length; p++) {
                if (ingredientNames[p].includes(tag) || lowerCaseAppliance.includes(tag) || lowerCaseUstensils.includes(tag)) {
                    found = true;
                    break;
                }
            }
            return found;
        });

        if ((titleMatch || descriptionMatch || ingredientMatch || applianceMatch || ustensilMatch) && tagMatch) {
            filteredRecipes.push(recipe);
        }
    }

    return filteredRecipes;
}

export {
    filter
};
