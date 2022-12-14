const appId = "&app_id=287a773f";
const appKey = "&app_key=080726096a3b8d16c8a969402882bab9";
const mealForm = document.querySelector("#mealSearchForm");
const mealDataDiv = document.querySelector("#mealData");
// const mealImg = carouselLi.querySelectorAll("#mealImg");
const mealImg1 = document.querySelector("#mealImg1");
const mealImg2 = document.querySelector("#mealImg2");
const mealImg3 = document.querySelector("#mealImg3");
const mealImg4 = document.querySelector("#mealImg4");
const mealImg5 = document.querySelector("#mealImg5");

const cocktailCard = $("#cocktailData");
const cocktailIngrd = $("#cocktailIngredients");

const randRecipe = document.querySelector("#random-list");
const randButton = document.querySelector("#get-random-recipe");
const menuContentEl = document.querySelector("#mealData");
const randFoodDataUl = document.querySelector("#randomFoodData");

mealForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // console.dir is a way to see all the properties of a javascript object.
  // in this case i use console.dir(form) to find the value for the input
  console.dir(mealForm.elements.query.value);
  const mealSearchTerm = mealForm.elements.query.value;
  fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&q=${mealSearchTerm}${appId}${appKey}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      event.target.reset();
      mealDataDiv.innerHTML = "";
      showRecipeCarousel(data);
      showMealRecipe(data);
      return;
    });
});

const showRecipeCarousel = function (data) {
  const largeImg1 = data.hits[0].recipe.image;
  const largeImg2 = data.hits[1].recipe.image;
  const largeImg3 = data.hits[2].recipe.image;
  const largeImg4 = data.hits[3].recipe.image;
  const largeImg5 = data.hits[4].recipe.image;
  mealImg1.setAttribute("src", largeImg1);
  mealImg2.setAttribute("src", largeImg2);
  mealImg3.setAttribute("src", largeImg3);
  mealImg4.setAttribute("src", largeImg4);
  mealImg5.setAttribute("src", largeImg5);
};

const showMealRecipe = function (data) {
  console.log(data.hits);
  for (let i = 0; i < data.hits.length; i++) {
    //recipe card elements

    const div = document.createElement("div");
    const labelP = document.createElement("p");
    const img = document.createElement("img");
    const aTag = document.createElement("a");

    //dropdown elements
    const drpdwnDivParent = document.createElement("div");
    const drpdwnBtn = document.createElement("button");
    const drpdwnDivChild = document.createElement("div");
    const drpdwnUl = document.createElement("ul");
    const drpdwnLi = document.createElement("li");
    const drpdwnLi2 = document.createElement("li");
    const drpdwnLi3 = document.createElement("li");
    const drpdwnLi4 = document.createElement("li");

    const recipeUrl = data.hits[i].recipe.url;
    const recipeLabel = data.hits[i].recipe.label;
    const thumbImg = data.hits[i].recipe.images.THUMBNAIL.url;
    const calories = Math.round(data.hits[i].recipe.calories);
    const cautions = data.hits[i].recipe.cautions;
    const carbs = Math.round(data.hits[i].recipe.digest[1].total);
    const protein = Math.round(data.hits[i].recipe.digest[2].total);

    drpdwnDivParent.classList.add("uk-inline");
    drpdwnDivChild.classList.add("box-shadow");
    drpdwnBtn.classList.add("uk-button", "uk-button-default", "more-info");
    drpdwnUl.classList.add("new-ul");
    img.classList.add("img", "box-shadow");
    aTag.classList.add("uk-align-center", "meal-anchor", "meal-anchor:hover");
    labelP.classList.add("label-p");
    //Use these to populate results onto page.
    div.classList.add(
      "meal-list",
      "uk-card",
      "uk-card-default",
      "uk-card-body",
      "box-shadow",
      "card-color"
    );

    aTag.href = recipeUrl;
    img.src = thumbImg;
    drpdwnBtn.textContent = "More Info";
    drpdwnLi.textContent = `Calories: ${calories}`;
    drpdwnLi2.textContent = `Warning this recipe contains: ${cautions}`;
    drpdwnLi3.textContent = `Protein: ${protein}g`;
    drpdwnLi4.textContent = `Carbs: ${carbs}g`;
    aTag.textContent = "Get Recipe!";
    labelP.textContent = recipeLabel;

    if (cautions.length > 0) {
      drpdwnLi2.textContent = `Warning this recipe contains: ${cautions}`;
    } else {
      drpdwnLi2.textContent = "";
    }

    drpdwnBtn.setAttribute("type", "button");
    drpdwnDivChild.setAttribute(
      "uk-dropdown",
      "animation: reveal-left; animate-out: true; duration: 1000"
    );
    aTag.setAttribute("target", "_blank");

    //card structure
    div.append(labelP);
    div.append(img);
    div.append(aTag);
    div.append(drpdwnDivParent);
    drpdwnDivParent.append(drpdwnBtn);
    drpdwnDivParent.append(drpdwnDivChild);
    drpdwnDivChild.append(drpdwnUl);
    drpdwnUl.append(drpdwnLi);
    drpdwnUl.append(drpdwnLi3);
    drpdwnUl.append(drpdwnLi4);
    drpdwnUl.append(drpdwnLi2);
    // div.append(ul);

    mealDataDiv.append(div);
  }
};

//random recipe fetch
randButton.addEventListener("click", function () {
  const randParam = randRecipe.selectedOptions[0].value;

  fetch(
    `https://api.edamam.com/api/recipes/v2?type=public${appId}${appKey}&cuisineType=${randParam}&random=true`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      randFoodDataUl.innerHTML = "";
      showRandomRecipe(data);
      populateRandRecipe(data);
      console.log("foodRandom", data);
      return;
    });
});

//shows random recipe images in the carousel
const showRandomRecipe = function (data) {
  const largeImg1 = data.hits[0].recipe.image;
  const largeImg2 = data.hits[1].recipe.image;
  const largeImg3 = data.hits[2].recipe.image;
  const largeImg4 = data.hits[3].recipe.image;
  const largeImg5 = data.hits[4].recipe.image;

  mealImg1.setAttribute("src", largeImg1);
  mealImg2.setAttribute("src", largeImg2);
  mealImg3.setAttribute("src", largeImg3);
  mealImg4.setAttribute("src", largeImg4);
  mealImg5.setAttribute("src", largeImg5);
};

//creates div with random recipe info
const populateRandRecipe = function (data) {
  for (let i = 0; i < data.hits.length; i++) {
    const randDiv = document.createElement("div");
    const randP = document.createElement("p");
    const randImg = document.createElement("img");
    const randAnchor = document.createElement("a");

    const recipeUrl = data.hits[i].recipe.url;
    const recipeLabel = data.hits[i].recipe.label;
    const thumbImg = data.hits[i].recipe.images.THUMBNAIL.url;

    const drpdwnDivParent = document.createElement("div");
    const drpdwnDivChild = document.createElement("div");
    const drpdwnBtn = document.createElement("button");

    drpdwnDivParent.classList.add("uk-inline");
    drpdwnBtn.classList.add("uk-button", "uk-button-default");
    drpdwnBtn.setAttribute("type", "button");
    drpdwnDivChild.setAttribute("uk-dropdown", "mode: hover");

    randImg.classList.add("img", "box-shadow");
    randAnchor.classList.add(
      "uk-align-center",
      "meal-anchor",
      "meal-anchor:hover"
    );
    randP.classList.add("label-p");

    randDiv.classList.add(
      "meal-list",
      "uk-card",
      "uk-card-default",
      "uk-card-body",
      "box-shadow",
      "card-color"
    );

    randAnchor.href = recipeUrl;
    randImg.src = thumbImg;

    randAnchor.textContent = "Get Recipe!";
    randP.textContent = recipeLabel;

    randAnchor.setAttribute("target", "_blank");

    randDiv.append(randP);
    randDiv.append(randImg);
    randDiv.append(randAnchor);

    randFoodDataUl.append(randDiv);
  }
};

// cocktail search function.
$(document).ready(function () {
  $("#cocktailSearchForm").on("submit", function (event) {
    event.preventDefault();
    var cocktailSearch = $("#inputValue").val().trim();
    console.log(cocktailSearch);

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "a1e0ee4284mshd4935eda2ae1e5bp1efdf4jsnf6a5c60bb746",
        "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
      },
    };

    fetch(
      "https://the-cocktail-db.p.rapidapi.com/search.php?s=" + cocktailSearch,
      options
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        const drinks = Object.assign({}, data);
        console.log(drinks.drinks);
        for (let i = 0; i < drinks.drinks.length; i++) {
          const ingredient = drinks.drinks[i];
          console.log("drinkName" + ingredient["strDrink"]);
          const div = $("<div>");
          const paragraph = $("<p>");
          const pDrinkIngredient = $("<p>");
          const pDrinkInst = $("<p>");
          div.addClass(
            "meal-list uk-card uk-card-default uk-card-body box-shadow card-color"
          );
          paragraph.text(data.drinks[i].strDrink);
          paragraph.addClass("label-p");
          pDrinkInst.text(data.drinks[i].strInstructions);

          cocktailCard.append(div);
          div.append(paragraph);
          div.append(pDrinkIngredient);
          div.append(pDrinkInst);
          for (let j = 1; j < drinks.drinks.length - 1; j++) {
            console.log("drinkName" + ingredient["strDrink"]);
            const div = $("<div>");
            div.addClass("meal-list uk-card uk-card-default uk-card-body");

            const pDrinkIngredient = $("<p>");
            div.append(pDrinkIngredient);
            pDrinkIngredient.text(ingredient["strIngredient" + j]);
            cocktailCard.append(pDrinkIngredient);

            if (ingredient["strIngredient" + j] != null)
              console.log(ingredient["strIngredient" + j]);
          }
        }

        const drinkImg = [
          data.drinks[0].strDrinkThumb,
          data.drinks[1].strDrinkThumb,
          data.drinks[2].strDrinkThumb,
          data.drinks[3].strDrinkThumb,
          data.drinks[4].strDrinkThumb,
        ];

        $("#cocktailImage").attr("src", drinkImg[0]);
        $("#cocktailImage1").attr("src", drinkImg[1]);
        $("#cocktailImage2").attr("src", drinkImg[2]);
        $("#cocktailImage3").attr("src", drinkImg[3]);
        $("#cocktailImage4").attr("src", drinkImg[4]);
      });
  });
});

// cocktail search function.
$(document).ready(function () {
  $("#cocktailSearchForm").on("submit", function (event) {
    event.preventDefault();
    var cocktailSearch = $("#inputValue").val().trim();
    console.log(cocktailSearch);

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "a1e0ee4284mshd4935eda2ae1e5bp1efdf4jsnf6a5c60bb746",
        "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
      },
    };

    fetch(
      "https://the-cocktail-db.p.rapidapi.com/search.php?s=" + cocktailSearch,
      options
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        getCocktailName(data);
      });
  });
});

randButton.addEventListener("click", function () {
  const randParam = randRecipe.selectedOptions[0].value;

  fetch(
    `https://api.edamam.com/api/recipes/v2?type=public${appId}${appKey}&cuisineType=${randParam}&random=true`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      showRandomRecipe(data);
      console.log("foodRandom", data);
      return;
    });
});
