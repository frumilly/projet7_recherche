/* eslint-disable */
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
    const toggleButton = document.getElementById("bustensile");

    toggleButton.addEventListener("click", function () {
        toggleDropdownList("ustensileDropdownList");
    });
    const toggleButtonIng = document.getElementById("bing");

    toggleButtonIng.addEventListener("click", function () {
        toggleDropdownList("ingredientDropdownList");
    });
    const toggleButtonApp = document.getElementById("bapp");

    toggleButtonApp.addEventListener("click", function () {
        toggleDropdownList("appareilDropdownList");
    });
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
                        const searchIngredientInput = document.getElementById('searchIngredient');
                        searchIngredientInput.value = ""; // Cette ligne vide le champ d'entrée
                        console.log(searchIngredientInput);


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
                        const searchAppareilInput = document.getElementById('searchAppareilInput');
                        searchAppareilInput.value = ""; // Cette ligne vide le champ d'entrée
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
                        const searchUstensileInput = document.getElementById('searchUstensileInput');
                        searchUstensileInput.value = "";
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
            console.log("ici");
            if (selectedIngredient !== 'Ingrédient') {
                tags.push(selectedIngredient);
                selection(recipes, searchValue, tags, selectedIngredient);
                const searchIngredientInput = document.getElementById('searchIngredient');
                searchIngredientInput.value = ""; // Cette ligne vide le champ d'entrée


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
                const searchAppareilInput = document.getElementById('searchAppareilInput');
                        searchAppareilInput.value = "";
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
                const searchUstensileInput = document.getElementById('searchUstensileInput');
                searchUstensileInput.value = "";
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
                        const searchIngredientInput = document.getElementById('searchIngredient');
                        searchIngredientInput.value = ""; // Cette ligne vide le champ d'entrée


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
                        const searchAppareilInput = document.getElementById('searchAppareilInput');
                        searchAppareilInput.value = "";
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
                        const searchUstensileInput = document.getElementById('searchUstensileInput');
                        searchUstensileInput.value = "";
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
                const searchIngredientInput = document.getElementById('searchIngredient');
                searchIngredientInput.value = ""; // Cette ligne vide le champ d'entrée


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
                const searchAppareilInput = document.getElementById('searchAppareilInput');
                        searchAppareilInput.value = "";
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
                const searchUstensileInput = document.getElementById('searchUstensileInput');
                searchUstensileInput.value = "";
            }
        });
    });

}
// Fonction pour filtrer la liste d'ingrédients en fonction de la saisie de l'utilisateur
document.getElementById("searchIngredient").addEventListener("input", function() {
  var searchInput = this.value.toLowerCase().trim();
  var ingredientList = document.getElementById("ingredientDropdownList").getElementsByTagName("li");

  for (var i = 0; i < ingredientList.length; i++) {
    var ingredientText = ingredientList[i].innerText.toLowerCase();
    if (ingredientText.includes(searchInput)) {
      ingredientList[i].style.display = "block";
    } else {
      ingredientList[i].style.display = "none";
    }
  }
});
// Fonction pour filtrer la liste d'appareils en fonction de la saisie de l'utilisateur
document.querySelector("#searchAppareilInput").addEventListener("input", function() {
var searchInput = this.value.toLowerCase().trim();
var appareilList = document.querySelectorAll("#appareilDropdownList li");

for (var i = 0; i < appareilList.length; i++) {
var appareilText = appareilList[i].innerText.toLowerCase();
if (appareilText.includes(searchInput)) {
  appareilList[i].style.display = "block";
} else {
  appareilList[i].style.display = "none";
}
}
});

// Fonction pour filtrer la liste d'ustensiles en fonction de la saisie de l'utilisateur
document.querySelector("#searchUstensileInput").addEventListener("input", function() {
var searchInput = this.value.toLowerCase().trim();
var ustensileList = document.querySelectorAll("#ustensileDropdownList li");

for (var i = 0; i < ustensileList.length; i++) {
var ustensileText = ustensileList[i].innerText.toLowerCase();
if (ustensileText.includes(searchInput)) {
  ustensileList[i].style.display = "block";
} else {
  ustensileList[i].style.display = "none";
}
}
});
  // Fonction pour afficher ou masquer la liste déroulante
 function toggleDropdownList(id) {
  const dropdownList = document.getElementById(id);
  dropdownList.style.display = dropdownList.style.display === "block" ? "none" : "block";
}
export {
  toggleDropdownList
};

init();