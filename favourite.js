// get data about favourite meals from Local Storage
let fav_meal_arr = localStorage.fav_meal_arr;
fav_meal_arr = JSON.parse(fav_meal_arr);
let fav_meals_container = document.querySelector("#fav-meals-container")

// adds the fav_meals retrieved from local storage to DOM
for (item of fav_meal_arr) {
  console.log(item);
  let xhr_req = new XMLHttpRequest();
  xhr_req.open("GET", `https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`, true);
  xhr_req.send();
  xhr_req.onload = async function () {
    let matched_meal = JSON.parse(xhr_req.response).meals[0];
    const { strMeal, strMealThumb, strCategory, strArea, strTags, idMeal } = matched_meal;
    // HTML element to be added DOM
    let card = ` <!-- col1 -->
    <div class="col-12 col-md-6   "  id="card-${idMeal}">
      <div class="row bg-light mx-1 py-3 rounded-border">
        <div class="left col-12 col-sm-6 col-md-6  text-center
        ">
          <img src="${strMealThumb}" class="img-card " alt="an image of food">
          <p class="text-center text-nowrap display-6"><a href="" data-name="${strMeal}" class="meal-page-link display-6">${strMeal}</a></p>
        </div>
        <!-- instructions for dish -->
        <!-- col 2 -->
        <div class="col-12 col-sm-6 col-md-6 fs-6 text-center text-muted  text-break "> Category :${strCategory} <br>Origin : ${strArea} <br> Tags :${strTags}
        <br> <img src="https://cdn-icons-png.flaticon.com/512/3221/3221897.png" class="fav-del mt-5 " data-name="${strMeal}" alt="delete from favourites button" id="del-${idMeal}">
        </div>
      </div>
    </div>` ;
    // adds element to DOM
    fav_meals_container.innerHTML = await (fav_meals_container.innerHTML + (card));
  }




}

//this set timeout fn is used to add event listeners to dynamically DoM elements ie card element created 
setTimeout(function () {

  // handles deletion of card
  let delete_buttons = document.querySelectorAll(".fav-del");
  for (del_btn of delete_buttons) {
    del_btn.addEventListener("click", deleteFromFavourites);
  }
  //handles navigation to meal page
  let meal_page_links = document.querySelectorAll(".meal-page-link");
  console.log(meal_page_links)
  for (link of meal_page_links) {
    
    link.addEventListener("click", openMealPage);
  }

}, 1000)



// delete the card element clicked  from favourites and local storage 
function deleteFromFavourites(e) {
  e.stopPropagation();
  let card = document.querySelector(`#card-${(e.target.id).substring(4)}`);
  console.log(card.id);
  // handles vanishing disappearance of cards
  card.classList.add("vanish");
  setTimeout(() => {
    card.remove();
  }, 990);

  // get the name of meal stored as user defined attribute in delete button
  let del_meal = e.target.getAttribute("data-name");
  fav_meal_arr = localStorage.fav_meal_arr;
  fav_meal_arr = JSON.parse(fav_meal_arr);
  // filters the array from local storage and deletes the clicked element
  fav_meal_arr = fav_meal_arr.filter((element) => {
    return element != del_meal;
  });
  fav_meal_arr = JSON.stringify(fav_meal_arr);
  // updating the local storage
  localStorage.fav_meal_arr = fav_meal_arr;

}

// navigates to meal Page
function openMealPage(e) {
  e.preventDefault();
  console.log(e.target.getAttribute("data-name"))
  let current_meal = {
    "name": e.target.getAttribute("data-name")
  };
  current_meal = JSON.stringify(current_meal);
  console.log(current_meal)
  localStorage.current_meal = current_meal;
  window.location = "./meal.html"

}