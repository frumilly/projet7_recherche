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
    let searchValue = "";
    const filterRecipes = Search.filter(recipes, searchValue, tags);
    const searchInput = document.querySelector('.search-input');
    const recipeCardContainer = document.getElementById('recipeCardContainer');
    const recetteCountElement = document.querySelector('.recette-count');
    Display.majSelect(recipes);


    recetteCountElement.textContent = `${recipes.length} recette(s)`;
    searchInput.addEventListener('input', (event) => {
        searchValue = event.target.value.trim();
        if (searchValue.length >= 3) {
            const filterRecipes = Search.filter(recipes, searchValue, tags);
            Display.displayRecipes(filterRecipes, recipeCardContainer);
            // Mettre à jour le compteur de recettes
            const recetteCountElement = document.querySelector('.recette-count');
            recetteCountElement.textContent = `${filterRecipes.length} recette(s)`;
            // Mettre à jour les selectbox

            Display.majSelect(filterRecipes);
        }
        else if (searchValue.length === 0) { // Si la recherche est vide
            const filterRecipes = Search.filter(recipes, searchValue, tags);
            console.log(filterRecipes);
            Display.displayRecipes(filterRecipes, recipeCardContainer);
            recetteCountElement.textContent = `${filterRecipes.length} recette(s)`;
            Display.majSelect(filterRecipes);
        }
    });
    Display.displayRecipes(filterRecipes);
    //console.log(recipes , filterRecipes);
    ingredientSelect.addEventListener('change', (event) => {
        const selectedIngredient = event.target.value;
        if (selectedIngredient !== 'Ingrédient') {
            tags.push(selectedIngredient);
            updateTags();
            // Supprimer l'élément sélectionné de la liste des options de ingredientSelect
            const filterRecipes = Search.filter(recipes, searchValue, tags);
            Display.displayRecipes(filterRecipes, recipeCardContainer);
            // Mettre à jour le compteur de recettes
            const recetteCountElement = document.querySelector('.recette-count');
            recetteCountElement.textContent = `${filterRecipes.length} recette(s)`;
            // Mettre à jour les selectbox
            const selectedIngredientOption = ingredientSelect.querySelector('option:checked');
            const selectedIngredient2 = selectedIngredientOption.value;
            Display.majSelect2(filterRecipes, selectedIngredient2);



        }
    });

    appareilSelect.addEventListener('change', (event) => {
        const selectedAppareil = event.target.value;
        if (selectedAppareil !== 'Appareils') {
            tags.push(selectedAppareil);
            updateTags();
            const filterRecipes = Search.filter(recipes, searchValue, tags);
            Display.displayRecipes(filterRecipes, recipeCardContainer);
            // Mettre à jour le compteur de recettes
            const recetteCountElement = document.querySelector('.recette-count');
            recetteCountElement.textContent = `${filterRecipes.length} recette(s)`;
            // Mettre à jour les selectbox
            const selectedAppareilOption = appareilSelect.querySelector('option:checked');
            const appareil = selectedAppareilOption.value;
            Display.majSelect2(filterRecipes, appareil);

        }
    });

    ustensileSelect.addEventListener('change', (event) => {
        const selectedUstensile = event.target.value;
        if (selectedUstensile !== 'Ustensiles') {
            tags.push(selectedUstensile);
            updateTags();
            const filterRecipes = Search.filter(recipes, searchValue, tags);
            Display.displayRecipes(filterRecipes, recipeCardContainer);
            // Mettre à jour le compteur de recettes
            const recetteCountElement = document.querySelector('.recette-count');
            recetteCountElement.textContent = `${filterRecipes.length} recette(s)`;
            // Mettre à jour les selectbox
            const selectedUstensileOption = ustensileSelect.querySelector('option:checked');
            const ustensil = selectedUstensileOption.value;
            Display.majSelect2(filterRecipes, ustensil);
        }
    });
}

init();