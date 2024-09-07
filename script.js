const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipedetialscontentr = document.querySelector('.recipe-detials-content');


//themealdb api is used here 
//function to get recipes

const fetchRecipes = async (query)=>{
    recipeContainer.innerHTML = "Fetching Recipes...";//to which i will add recipe divs...

    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response =await data.json();

    recipeContainer.innerHTML = "";

    response.meals.forEach(meal=>{
        const recipeDiv = document.createElement("div");//creating div that is element
        recipeDiv.classList.add("recipe"); //adding classes to newly formed div
        //defining inner html
        recipeDiv.innerHTML = ` 
        <img src = "${meal.strMealThumb}">
        <h4>${meal.strMeal}</h4>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `
        const button = document.createElement('button');
        button.textContent = "view Recipe";
        recipeDiv.appendChild(button);

        // Adding addEventListener to recipe button
        button.addEventListener('click',()=>{
            openRecipePopup(meal);
        })
        recipeContainer.appendChild(recipeDiv); //adding recipe which is created get add to the recipe container
    })
}



searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
});

