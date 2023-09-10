// controller, récupére tous les events. si nouvelle saisie --> récupére la valeur saisie et appelle le search.js
// Envoie les recettes , la valeur saisise et le tag
// apelle le view.js pour faire le display
// Met à jour les select box selon le choix des tags , efface et actualise

import * as Search from './lib/searchv2.js';
import * as Display from './lib/view.js';
import { recipes } from '../data/recipes.js';

// index.js
let searchValue = "";
let tags = [];
const ingredientSelect = document.querySelector('.ingredient-select');
const appareilSelect = document.querySelector('.appareil-select');
const ustensileSelect = document.querySelector('.ustensile-select');
const recipeCardContainer = document.getElementById('recipeCardContainer');
function updateRecipeCount(count) {
    const recetteCountElement = document.querySelector('.recette-count');
    const pluriel = count > 1 ? "s" : "";
    recetteCountElement.textContent = `${count} recette${pluriel}`;
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

function init() {
    const searchInput = document.querySelector('.search-input');
    let searchValue = searchInput.value.trim();

    const filterRecipes = Search.filter(recipes, searchValue, tags);
    Display.displayRecipes(filterRecipes, recipeCardContainer);
    updateRecipeCount(filterRecipes.length);
    Display.majSelect(filterRecipes, tags);
    searchInput.addEventListener('input', (event) => {
        searchValue = event.target.value.trim();
        if (searchValue.length >= 3) {

            const filterRecipes = Search.filter(recipes, searchValue, tags);
            Display.displayRecipes(filterRecipes, recipeCardContainer);
            updateRecipeCount(filterRecipes.length);
            // Mettre à jour les selectbox

            Display.majSelect(filterRecipes, tags);
            const ingredientListItems = document.querySelectorAll('#ingredientDropdownList li');
            ingredientListItems.forEach((listItem) => {
                listItem.addEventListener('click', function () {
                    const selectedIngredient = listItem.textContent;
                    if (selectedIngredient !== 'Ingrédient') {
                        tags.push(selectedIngredient);
                        selection(recipes, searchValue, tags, selectedIngredient);
                        console.log("oui");


                    }
                });
            });
            const appareilListItems = document.querySelectorAll('#appareilDropdownList li');
            appareilListItems.forEach((listItem) => {
                listItem.addEventListener('click', function () {
                    const selectedAppareil = listItem.textContent;
                    if (selectedAppareil !== 'Appareil') {
                        tags.push(selectedAppareil);
                        selection(recipes, searchValue, tags, appareilSelect);
                    }
                });
            });
            const ustensileListItems = document.querySelectorAll('#ustensileDropdownList li');
            ustensileListItems.forEach((listItem) => {
                listItem.addEventListener('click', function () {
                    const selectedUstensile = listItem.textContent;
                    if (selectedUstensile !== 'Ustensile') {
                        tags.push(selectedUstensile);
                        selection(recipes, searchValue, tags, ustensileSelect);
                    }
                });
            });

        }
        else if (searchValue.length === 0) { // Si la recherche est vide
            const filterRecipes = Search.filter(recipes, searchValue, tags);
            Display.displayRecipes(filterRecipes, recipeCardContainer);
            updateRecipeCount(filterRecipes.length);
            Display.majSelect(filterRecipes, tags);
        }
    });
    Display.displayRecipes(filterRecipes);
    //console.log(recipes , filterRecipes);
    const ingredientListItems = document.querySelectorAll('#ingredientDropdownList li');
    ingredientListItems.forEach((listItem) => {
        listItem.addEventListener('click', function () {
            const selectedIngredient = listItem.textContent;
            if (selectedIngredient !== 'Ingrédient') {
                tags.push(selectedIngredient);
                selection(recipes, searchValue, tags, selectedIngredient);
                console.log("oui");


            }
        });
    });

    const appareilListItems = document.querySelectorAll('#appareilDropdownList li');
    appareilListItems.forEach((listItem) => {
        listItem.addEventListener('click', function () {
            const selectedAppareil = listItem.textContent;
            if (selectedAppareil !== 'Appareil') {
                tags.push(selectedAppareil);
                selection(recipes, searchValue, tags, appareilSelect);
            }
        });
    });

    const ustensileListItems = document.querySelectorAll('#ustensileDropdownList li');
    ustensileListItems.forEach((listItem) => {
        listItem.addEventListener('click', function () {
            const selectedUstensile = listItem.textContent;
            if (selectedUstensile !== 'Ustensile') {
                tags.push(selectedUstensile);
                selection(recipes, searchValue, tags, ustensileSelect);
            }
        });
    });

    var tagsContainer = document.querySelector('.tags-container');
    //suppression du tag
    tagsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('tag')) {
            var tagElmt = event.target.textContent.trim();
            tags = tags.filter(tag => tag !== tagElmt);
            const filterRecipes = Search.filter(recipes, searchValue, tags);
            Display.displayRecipes(filterRecipes, recipeCardContainer);
            updateRecipeCount(filterRecipes.length);
            // Mettre à jour les selectbox
            Display.majSelect(filterRecipes, tags);
            console.log(tagElmt + ' supprimé');
            event.target.remove();
            const ingredientListItems = document.querySelectorAll('#ingredientDropdownList li');
            ingredientListItems.forEach((listItem) => {
                listItem.addEventListener('click', function () {
                    const selectedIngredient = listItem.textContent;
                    if (selectedIngredient !== 'Ingrédient') {
                        tags.push(selectedIngredient);
                        selection(recipes, searchValue, tags, selectedIngredient);
                        console.log("oui");


                    }
                });
            });
            const appareilListItems = document.querySelectorAll('#appareilDropdownList li');
            appareilListItems.forEach((listItem) => {
                listItem.addEventListener('click', function () {
                    const selectedAppareil = listItem.textContent;
                    if (selectedAppareil !== 'Appareil') {
                        tags.push(selectedAppareil);
                        selection(recipes, searchValue, tags, appareilSelect);
                    }
                });
            });
            const ustensileListItems = document.querySelectorAll('#ustensileDropdownList li');
            ustensileListItems.forEach((listItem) => {
                listItem.addEventListener('click', function () {
                    const selectedUstensile = listItem.textContent;
                    if (selectedUstensile !== 'Ustensile') {
                        tags.push(selectedUstensile);
                        selection(recipes, searchValue, tags, ustensileSelect);
                    }
                });
            });

        }
    });
}
function selection(recipes, searchValue, tags, typeS) {
    updateTags();
    const filterRecipes = Search.filter(recipes, searchValue, tags);
    Display.displayRecipes(filterRecipes, recipeCardContainer);
    // Mettre à jour le compteur de recettes
    updateRecipeCount(filterRecipes.length);
    // Mettre à jour les selectbox

    Display.majSelect(filterRecipes, tags);
    const ingredientListItems = document.querySelectorAll('#ingredientDropdownList li');
    ingredientListItems.forEach((listItem) => {
        listItem.addEventListener('click', function () {
            const selectedIngredient = listItem.textContent;
            if (selectedIngredient !== 'Ingrédient') {
                tags.push(selectedIngredient);
                selection(recipes, searchValue, tags, selectedIngredient);
                console.log("oui");


            }
        });
    });
    const appareilListItems = document.querySelectorAll('#appareilDropdownList li');
    appareilListItems.forEach((listItem) => {
        listItem.addEventListener('click', function () {
            const selectedAppareil = listItem.textContent;
            if (selectedAppareil !== 'Appareil') {
                tags.push(selectedAppareil);
                selection(recipes, searchValue, tags, appareilSelect);
            }
        });
    });
    const ustensileListItems = document.querySelectorAll('#ustensileDropdownList li');
    ustensileListItems.forEach((listItem) => {
        listItem.addEventListener('click', function () {
            const selectedUstensile = listItem.textContent;
            if (selectedUstensile !== 'Ustensile') {
                tags.push(selectedUstensile);
                selection(recipes, searchValue, tags, ustensileSelect);
            }
        });
    });

}
init();