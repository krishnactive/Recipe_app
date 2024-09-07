const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetialsContent = document.querySelector('.recipe-detials-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


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

const openRecipePopup=(meal)=>{
    recipeDetialsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients</h3>
        <ul class = "IngredientList">${fetchIngredients(meal)}</ul>
        <div>
            <h3>Instructions:</h3>
            <p class = "recipeinstructions">${meal.strInstructions}</p>
        </div>
    `
   
    recipeDetialsContent.parentElement.style.display = "block";
}

//function to fetch integredients and measurements
const fetchIngredients=(meal)=>{
    let ingredientslist = "";
    for(let i = 1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientslist+= `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientslist;
}

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetialsContent.parentElement.style.display = "none";
})

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
});

