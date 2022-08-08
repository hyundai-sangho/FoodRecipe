const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");

let searchQuery = "";

const APP_ID = "6e6e4adb";
const APP_KEY = "261ea2f65c901716ad503cf016bac818";
let fetchFoodRecipeURL;

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;

  fetchFoodRecipeURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=30`;

  getFoodRecipes();
});

async function getFoodRecipes() {
  await fetch(fetchFoodRecipeURL)
    .then((response) => response.json())
    .then((data) => {
      displayFoodRecipes(data.hits);
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayFoodRecipes(data) {
  container.classList.remove("initial");
  let generatedHTML = "";
  data.forEach((result) => {
    let foodImage = result.recipe.image;
    let foodImageTitle = result.recipe.label;
    let foodCalories = parseInt(result.recipe.calories).toLocaleString("en-US");
    let foodImageUrl = result.recipe.url;
    let foodDietLabels = result.recipe.dietLabels;
    let foodHealthLabels = result.recipe.healthLabels;

    generatedHTML += `
    <div class="item">
    <a href="${foodImageUrl}" target="_blank">
    <img src="${foodImage}" alt="${foodImageTitle}">
    </a>
    <div class="flex-container">
    <h1 class="title">${foodImageTitle}</h1>
    <a class="view-button" href="${foodImageUrl}" target="_blank">요리법 보기</a>
    </div>
    <p class="item-data">${foodCalories} 칼로리</p>
    <p class="item-data">다이어트 라벨: ${foodDietLabels.length > 0 ? foodDietLabels : "데이터 없음"}</p>
    <p class="item-data">건강 라벨: ${foodHealthLabels}</p>
    </div>
    `;
    searchResultDiv.innerHTML = generatedHTML;
  });
}
