// controller, récupére tous les events. si nouvelle saisie --> récupére la valeur saisie et appelle le search.js
// Envoie les recettes , la valeur saisise et le tag
// apelle le view.js pour faire le display
// Met à jour les select box selon le choix des tags , efface et actualise

import * as Search from './lib/search.js';
import * as Display from './lib/view.js';
import { recipes } from '../data/recipes.js'; 
function init(){
    let searchValue="";
    let tags=[];
    const filterRecipes = Search.filter(recipes, searchValue, tags);

    Display.displayRecipes(filterRecipes);
   //console.log(recipes , filterRecipes);
}
init();