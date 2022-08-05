
const userInput = document.querySelector('.userInput');
const message = document.querySelector('.message');
const myButton = document.querySelector('.myButton');
const content = document.querySelector('#contentContainer')
const splashScreen = document.querySelector('.splash-screen')
const messageFade = document.querySelector('#messageFade')
const nameComp = document.querySelector('.nameComponent')

// Ron
const bios = document.querySelectorAll('.bio-text'),
bio = document.querySelector('#bio');

// Oscar
const container = document.querySelector(".container")
const foodTitle = document.querySelector(".food-title")
const foodResult = document.querySelector(".food-result")
const foodItem = document.querySelector(".food-item")
const foodButton = document.querySelector('.food-ingredient');
const foodRandomButton = document.querySelector('.food-random')
const foodJokeButton = document.querySelector('.food-joke')
const ingredient = document.querySelector('#ingredients')
const allFoodSearchButton = document.querySelector('.food-search')
const cuisineList = document.getElementById('cuisine-list')
const cuisineSearch = document.getElementById('cuisine')
const dietaryChoice = document.getElementById('dietary-choices')
const allergiesChoice = document.getElementById('allergies')
const carbsChoice = document.getElementById('carbs')
const allottedTime = document.getElementById('allotted-time')
const recipeQuantity = document.getElementById('recipe-quantity')
const foodForm = document.querySelector('.food-form')
// const ingredient = document.getElementById('ingredient')

function contentFade() {
    setTimeout(()=>{
        content.classList.add('contentContainerToFade')
        content.classList.add('show')
    }, 5000)
}

myButton.onclick = function() {
    messageFade.classList.add('messageFade')
    nameComp.remove('nameComponent')
    message.innerHTML= `Welcome, ${userInput.value}! Let's get cooking...`
    contentFade()
}

//for actual page content

const itemsList = document.getElementById('items-list'); //caching the ul element
const searchInput = document.getElementById('search');

const itemsContent = [
    'African',
    'American',
    'British',
    'Cajun',
    'Caribbean',
    'Chinese',
    'Eastern European',
    'European',
    'French',
    'German',
    'Greek',
    'Indian',
    'Irish',
    'Italian',
    'Japanese',
    'Jewish',
    'Korean',
    'Latin American',
    'Mediterranean',
    'Mexican',
    'Middle Eastern',
    'Nordic',
    'Southern',
    'Spanish',
    'Thai',
    'Vietnamese'
];

const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon"); 


inputBox.addEventListener('keyup', e => {
    let userData = e.target.value;
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            linkTag.click();
        }
        emptyArray = itemsContent.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
});

//clicking on suggestion puts it in input box
function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        linkTag.click();
    }
    searchWrapper.classList.remove("active");
}

//shows suggestions when start to type
function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const stringified = stringifyFormData(data);
    console.log(stringified);
    const userInput = JSON.parse(stringified)
    getComplexFood(userInput)
  };
  
  foodForm.addEventListener('submit', handleSubmit);

function stringifyFormData(fd) {
    const data = {};
    for (let key of fd.keys()) {
      if (data[key]) {
        // if the key already exists, we need an array of multiple values
        data[key] = fd.getAll(key);
      } else {
        data[key] = fd.get(key);
      }
    }
    return JSON.stringify(data, null, 4);
  }

const getComplexFood = async (formData) => {
    
    const ingredients = formData.ingredients
    const cuisine = formData.cuisine
    const dietaryChoice = formData.dietaryChoices
    const intolerances = formData.allergies
    const lowCarb = formData.lowCarb
    const allottedTime = formData.allottedTime
    const recipeQuantity = formData.recipeQuantity
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?${ingredients?`query=${ingredients}&`:''}${cuisine?`cuisine=${cuisine}&`:''}${dietaryChoice?`diet=${dietaryChoice}&`:''}${intolerances?`intolerances=${intolerances}&`:''}addRecipeInformation=true&addRecipeNutrition=true${lowCarb?"&maxCarbs=10":''}${allottedTime?`&maxReadyTime=${allottedTime}`:''}${recipeQuantity?`&number=${recipeQuantity}`:''}&apiKey=9f84e0adf95c447bac51d4eef9d24191`
  
    const apiData = await fetch(apiUrl)
    const jsonData = await apiData.json()
    const complexResult = jsonData.results

    // foodItem.innerText = ''

    // const nutrition = complexResult.nutrition
    // const cookTime = complexResult.readyInMinutes

    // for(let comRes of complexResult) {
    //     const comResInfo = document.createElement('div')
    //     comResInfo.className = 'recipe-container'
    //     comResInfo = inner.innerHTML = 
    //     `<div>${comRes.title}</div>
    //     <img>${comRes.image}</div>
    //     <div>${nutrition}</div>
    //     <div>${cookTime}</div>
    //     `
    // }

    // foodItem.append(comResInfo)
}


const getRandomFood = async () => {
    const apiData = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=9f84e0adf95c447bac51d4eef9d24191`)
    const jsonData = await apiData.json()
    const foodResult = jsonData.recipes

    foodItem.innerText = ''

    // const foodIngredients = recipe.extendedIngredients
    const foodRecipeTitle = foodResult[0].title
    const foodRecipeImage = foodResult[0].image
    const foodServings = foodResult[0].servings
    const foodReady = foodResult[0].readyInMinutes

    const recipeInfo = document.createElement('div')
    recipeInfo.className = 'random-container'
    recipeInfo.innerHTML = 
    `<h1>${foodRecipeTitle}</h1>
    <img src = "${foodRecipeImage}"></img>
    <h6>"${foodServings} servings"</h6>
    <h6>"${foodReady} minutes to be ready"</h6


    `
    foodItem.append(recipeInfo)
    
    // for(let ingredient of foodIngredients){
    //     const recipeInfo = document.createElement('div')
    //     recipeInfo.className = 'recipe-container'
    //     recipeInfo.innerHTML = 
    //     `<h1>${ingredient.aisle}</h1>
    //     `
    //     foodItem.append(recipeInfo)
    // }
}

const getFoodJoke = async () => {
    const apiData = await fetch (`https://api.spoonacular.com/food/jokes/random?apiKey=9f84e0adf95c447bac51d4eef9d24191`)
    const jsonData = await apiData.json()
    const foodJoke = jsonData.text

    foodItem.innerText = ''

    
    const jokeInfo = document.createElement('div')
    jokeInfo.className = 'joke-container'
    jokeInfo.innerHTML =
    `<p>${foodJoke}</p>
    `

    foodItem.append(jokeInfo)

}



foodRandomButton.addEventListener('click',getRandomFood)
foodJokeButton.addEventListener('click',getFoodJoke)
// allFoodSearchButton.addEventListener('click',getComplexFood)


// bio.addEventListener('click', (e) => {
//     bios.forEach(bio => bio.style.display = 'none')
//     const el = e.target.parentElement;
//     const bioText = el.querySelector('.bio-text')
//     bioText.style.display = 'block';
// });
