// Array to store recipes
let recipes = [];

// Function to add a new recipe
function addRecipe() {
    const recipeName = document.getElementById('recipeName').value;
    const ingredients = document.getElementById('ingredients').value.split(',');
    const steps = document.getElementById('steps').value.split('\n');
    
    // Create a recipe object
    const recipe = {
        name: recipeName,
        ingredients: ingredients,
        steps: steps
    };
    
    // Add the recipe to the recipes array
    recipes.push(recipe);
    
    // Save the recipes to the browser's local storage
    saveRecipes();
    
    // Display the recipes on the page
    displayRecipes();
    
    // Clear the input fields after adding a recipe
    document.getElementById('recipeName').value = '';
    document.getElementById('ingredients').value = '';
    document.getElementById('steps').value = '';
}

// Function to save recipes to local storage
function saveRecipes() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Function to load recipes from local storage when the page loads
function loadRecipes() {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
        recipes = JSON.parse(storedRecipes);
    }
}

// Function to display the recipes on the page
function displayRecipes() {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = ''; // Clear the current list
    
    // Loop through each recipe and display it
    recipes.forEach((recipe, index) => {
        const recipeDiv = document.createElement('div');
        
        recipeDiv.innerHTML = `<h3>${recipe.name}</h3>
                               <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
                               <p><strong>Steps:</strong></p>
                               <ul>${recipe.steps.map(step => `<li>${step}</li>`).join('')}</ul>
                               <button onclick="deleteRecipe(${index})">Delete</button>`;
        
        recipeList.appendChild(recipeDiv);
    });
}

// Function to delete a recipe
function deleteRecipe(index) {
    // Remove the recipe from the array
    recipes.splice(index, 1);
    
    // Save the updated recipes array to local storage
    saveRecipes();
    
    // Refresh the displayed list of recipes
    displayRecipes();
}

// Load recipes from local storage when the page loads
loadRecipes();
displayRecipes();
