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
function calculateTotalCalories() {
    let total = 0;
    foodItems.forEach(function(item) {
        total += Number(item.calories);
    });
    return total;
}
function renderApp() {
    foodList.innerHTML = '';

    if (foodItems.length === 0) {
        foodList.innerHTML = '<li>No food items added yet today.</li>';
    } else {
        foodItems.forEach(function(item, index) {
            const li = document.createElement('li');
            
            li.innerHTML = `
                <span>${item.name} - ${item.calories} kcal</span>
                <button onclick="removeFoodItem(${index})">Delete</button>
            `;
            
            li.style.display = 'flex';
            li.style.justifyContent = 'space-between';
            li.style.padding = '8px 0';
            li.style.borderBottom = '1px solid #eee';

            foodList.appendChild(li);
        });
    }

    totalCaloriesDisplay.textContent = calculateTotalCalories();
}