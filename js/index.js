// controller, récupére tous les events. si nouvelle saisie --> récupére la valeur saisie et appelle le search.js
// Envoie les recettes , la valeur saisise et le tag
// apelle le view.js pour faire le display
// Met à jour les select box selon le choix des tags , efface et actualise

import * as Search from './lib/search.js';
import * as Display from './lib/view.js';
import { recipes } from '../data/recipes.js';

// index.js
let searchValue = "";
let tags = [];
const ingredientSelect = document.querySelector('.ingredient-select');
const appareilSelect = document.querySelector('.appareil-select');
const ustensileSelect = document.querySelector('.ustensile-select');
const recipeCardContainer = document.getElementById('recipeCardContainer');

function updateTags() {
    const selectedTagsContainer = document.getElementById('selected__tag');
    selectedTagsContainer.innerHTML = '';
    tags.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.classList.add('tag');
        tagElement.textContent = tag;
        selectedTagsContainer.appendChild(tagElement);
    });
}

function init() {
    const searchInput = document.querySelector('.search-input');
    let searchValue = searchInput.value.trim();
    const filterRecipes = Search.filter(recipes, searchValue, tags);
   
  
    const recetteCountElement = document.querySelector('.recette-count');
    if(searchValue==""){
        recetteCountElement.textContent = `${recipes.length} recette(s)`;
        Display.majSelect(recipes);
    }
    else{
    recetteCountElement.textContent = `${filterRecipes.length} recette(s)`;
    Display.majSelect(filterRecipes);
    }
    


   
    searchInput.addEventListener('input', (event) => {
        searchValue = event.target.value.trim();
        if (searchValue.length >= 3) {
            const filterRecipes = Search.filter(recipes, searchValue, tags);
            Display.displayRecipes(filterRecipes, recipeCardContainer);
            // Mettre à jour le compteur de recettes
            const recetteCountElement = document.querySelector('.recette-count');
            recetteCountElement.textContent = `${filterRecipes.length} recettes`;
            // Mettre à jour les selectbox

            Display.majSelect(filterRecipes);
        }
        else if (searchValue.length === 0) { // Si la recherche est vide
            const filterRecipes = Search.filter(recipes, searchValue, tags);
            console.log(filterRecipes);
            Display.displayRecipes(filterRecipes, recipeCardContainer);
            const pluriel = filterRecipes.length > 1 ? "s" : ""; 
            recetteCountElement.textContent = `${filterRecipes.length} recette${pluriel}`;
            Display.majSelect(filterRecipes);
        }
    });
    Display.displayRecipes(filterRecipes);
    //console.log(recipes , filterRecipes);
    ingredientSelect.addEventListener('change', (event) => {
        const selectedIngredient = event.target.value;
        if (selectedIngredient !== 'Ingrédient') {
            tags.push(selectedIngredient);
            selection(recipes, searchValue, tags,ingredientSelect);



        }
    });

    appareilSelect.addEventListener('change', (event) => {
        const selectedAppareil = event.target.value;
        if (selectedAppareil !== 'Appareils') {
            tags.push(selectedAppareil);
            selection(recipes, searchValue, tags,appareilSelect);

        }
    });

    ustensileSelect.addEventListener('change', (event) => {
        const selectedUstensile = event.target.value;
        if (selectedUstensile !== 'Ustensiles') {
            tags.push(selectedUstensile);
            selection(recipes, searchValue, tags, ustensileSelect);
        }
    });
}
function selection(recipes, searchValue, tags,typeS){
    updateTags();
    const filterRecipes = Search.filter(recipes, searchValue, tags);
    Display.displayRecipes(filterRecipes, recipeCardContainer);
    // Mettre à jour le compteur de recettes
    const recetteCountElement = document.querySelector('.recette-count');
    const pluriel = filterRecipes.length > 1 ? "s" : ""; 
    recetteCountElement.textContent = `${filterRecipes.length} recette${pluriel}`;
    // Mettre à jour les selectbox
    const selectedOption = typeS.querySelector('option:checked');
    const valeurS = selectedOption.value;
    Display.majSelect2(filterRecipes, valeurS);
}
init();