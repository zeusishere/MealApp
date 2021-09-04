// get info from Local Storage


let fav_meal_arr=localStorage.fav_meal_arr ;
fav_meal_arr=JSON.parse(fav_meal_arr);
let fav_meals_container=document.querySelector("#fav-meals-container")

for ( item of fav_meal_arr )
{
    console.log(item);
//     let card =` <!-- col1 -->
// <div class="col-12 col-md-6  ">
//   <div class="row bg-danger mx-1">
//     <div class="left col-12 col-sm-6 col-md-6">
//       <img src="${strMealThumb}" class="img-card" alt="an image of food">
//       <p>${strMeal}</p>
//     </div>
//     <!-- instructions for dish -->
//     <!-- col 2 -->
//     <div class="col-12 col-sm-6 col-md-6">${strInstructions}
//     </div>
//   </div>
// </div>`
let xhr_req = new XMLHttpRequest();
xhr_req.open("GET", `https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`, true);
xhr_req.send();
xhr_req.onload = function () {
    let matched_meal = JSON.parse(xhr_req.response).meals[0];
    const {strInstructions,strMeal,strMealThumb} =matched_meal;
    // console.log(matched_meal,strInstructions,strMeal,strMealThumb);
    let card =` <!-- col1 -->
    <div class="col-12 col-md-6  ">
      <div class="row bg-light mx-1">
        <div class="left col-12 col-sm-6 col-md-6">
          <img src="${strMealThumb}" class="img-card" alt="an image of food">
          <p>${strMeal}</p>
        </div>
        <!-- instructions for dish -->
        <!-- col 2 -->
        <div class="col-12 col-sm-6 col-md-6 meal-instructions">${strInstructions}
        </div>
      </div>
    </div>` ;
    fav_meals_container.innerHTML =fav_meals_container.innerHTML+(card);

    
}
}