const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');


//themealdb api is used here 
//function to get recipes

const fetchRecipes = async (query)=>{
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response =await data.json();
    
    response.meals.forEach(meal=>{
        const recipeDiv = document.createElement("div");//creating div that is element
        recipeDiv.classList.add("recipe"); //adding classes to newly formed div
        //defining inner html
        recipeDiv.innerHTML = ` 
        <img src = "${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>
        `
        recipeContainer.appendChild(recipeDiv); //adding recipe which is created get add to the recipe container
    })
}



searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
});

