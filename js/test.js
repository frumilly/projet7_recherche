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
  // Déclarez et initialisez les sélecteurs 
  const ingredientSelect = document.querySelector('.ingredient-select');
  const appareilSelect = document.querySelector('.appareil-select');
  const ustensileSelect = document.querySelector('.ustensile-select');

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

function updateSelectOptions(selectElement, title, options) {
    // Supprimer toutes les options existantes de la selectbox
    selectElement.innerHTML = '';

    // Ajouter le titre
    const titleOption = document.createElement('option');
    titleOption.textContent = title;
    titleOption.disabled = true;
    selectElement.appendChild(titleOption);

    // Ajouter les nouvelles options à la selectbox
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
    selectElement.selectedIndex = 0;
}
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

function init(){
    let searchValue= "";
    const filterRecipes = Search.filter(recipes, searchValue, tags);
    const searchInput = document.querySelector('.search-input');
    const recipeCardContainer = document.getElementById('recipeCardContainer');
    const recetteCountElement = document.querySelector('.recette-count');
      
        updateSelectOptions(ingredientSelect, 'Ingrédient', getFilteredIngredients(recipes));
        updateSelectOptions(appareilSelect, 'Appareils', getFilteredAppareils(recipes));
        updateSelectOptions(ustensileSelect, 'Ustensiles', getFilteredUstensiles(recipes));
    
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
        
         updateSelectOptions(ingredientSelect, 'Ingrédient', getFilteredIngredients(filterRecipes));
         updateSelectOptions(appareilSelect, 'Appareils', getFilteredAppareils(filterRecipes));
         updateSelectOptions(ustensileSelect, 'Ustensiles', getFilteredUstensiles(filterRecipes));
        }
        else if (searchValue.length === 0) { // Si la recherche est vide
            const filterRecipes = Search.filter(recipes, searchValue, tags);
            console.log(filterRecipes);
            Display.displayRecipes(filterRecipes, recipeCardContainer);
            recetteCountElement.textContent = `${filterRecipes.length} recette(s)`;
            // Réinitialiser les selectbox avec toutes les options
            updateSelectOptions(ingredientSelect, 'Ingrédient', getFilteredIngredients(filterRecipes));
            updateSelectOptions(appareilSelect, 'Appareils', getFilteredAppareils(filterRecipes));
            updateSelectOptions(ustensileSelect, 'Ustensiles', getFilteredUstensiles(filterRecipes));
        }
    });
    Display.displayRecipes(filterRecipes);
   //console.log(recipes , filterRecipes);
   ingredientSelect.addEventListener('change', (event) => {
    const selectedIngredient = event.target.value;
    if (selectedIngredient !== 'Ingrédient') {
        tags.push(selectedIngredient);
        updateTags();
        const filterRecipes = Search.filter(recipes, searchValue, tags);
        Display.displayRecipes(filterRecipes, recipeCardContainer);
        // Mettre à jour le compteur de recettes
   const recetteCountElement = document.querySelector('.recette-count');
   recetteCountElement.textContent = `${filterRecipes.length} recette(s)`;
    // Mettre à jour les selectbox
   
    updateSelectOptions(ingredientSelect, 'Ingrédient', getFilteredIngredients(filterRecipes));
    updateSelectOptions(appareilSelect, 'Appareils', getFilteredAppareils(filterRecipes));
    updateSelectOptions(ustensileSelect, 'Ustensiles', getFilteredUstensiles(filterRecipes));
       // filterAndDisplayRecipes();
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
   
    updateSelectOptions(ingredientSelect, 'Ingrédient', getFilteredIngredients(filterRecipes));
    updateSelectOptions(appareilSelect, 'Appareils', getFilteredAppareils(filterRecipes));
    updateSelectOptions(ustensileSelect, 'Ustensiles', getFilteredUstensiles(filterRecipes));
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
   
    updateSelectOptions(ingredientSelect, 'Ingrédient', getFilteredIngredients(filterRecipes));
    updateSelectOptions(appareilSelect, 'Appareils', getFilteredAppareils(filterRecipes));
    updateSelectOptions(ustensileSelect, 'Ustensiles', getFilteredUstensiles(filterRecipes));
    }
});
}

init();