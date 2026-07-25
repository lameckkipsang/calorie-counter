const foodForm = document.getElementById('food-form');
const foodNameInput = document.getElementById('food-name');
const foodCaloriesInput = document.getElementById('food-calories');
const foodList = document.getElementById('food-list');
const totalCaloriesDisplay = document.getElementById('total-calories');
const resetBtn = document.getElementById('reset-btn');
const simulateFetchBtn = document.getElementById('simulate-fetch-btn');
const baseURL = "https://world.openfoodfacts.org";
let foodItems = JSON.parse(localStorage.getItem('foodItems')) || [];
function init() {
    renderApp();
}
function saveToLocalStorage() {
    localStorage.setItem('foodItems', JSON.stringify(foodItems));
}