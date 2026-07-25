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
function addFoodItem(name, calories) {
    foodItems.push({ name: name, calories: Number(calories) });
    saveToLocalStorage();
    renderApp();
}
function removeFoodItem(index) {
    foodItems.splice(index, 1);
    //the splice() method id used to add, remove, replace elements directly in an array
    saveToLocalStorage();
    renderApp();
}
function resetCalories() {
    if (confirm("Are you sure you want to reset today's calorie data?")) {
        foodItems = [];
        saveToLocalStorage();
        renderApp();
    }
}
function getFoodData() {
    simulateFetchBtn.textContent = "Loading...";
    simulateFetchBtn.disabled = true;

    const barcodes = [
        "3017624010701", //Nutella
        "5449000000996", //Coca-Cola
        "3274080005003"  //Evian Water
    ];
    //Picks a random barcode from the array to simulate scanning a product
    const randomBarcode = barcodes[Math.floor(Math.random() * barcodes.length)];
    // Combines the baseURL, endpoint path, random barcode, and file extension to build the full API URL
    const url = baseURL + "/api/v2/product/" + randomBarcode + ".json";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.product) {
                let productName = data.product.product_name;
                if (!productName) {
                    productName = "Food Item";
                }

                let calories = data.product.nutriments['energy-kcal_100g'];
                if (!calories) {
                    calories = 200;
                }

                foodNameInput.value = productName;
                foodCaloriesInput.value = calories;
            } else {
                alert("Product not found.");
            }
        })
        .catch(error => {
            console.error("Error fetching food data", error);
            alert("Could not fetch data from Open Food Facts.");
        })
        .finally(() => {
            simulateFetchBtn.textContent = "Fetch from API";
            simulateFetchBtn.disabled = false;
        });
}
