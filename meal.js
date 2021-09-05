let current_meal = localStorage.current_meal ;
console.log(current_meal)
current_meal=JSON.parse(current_meal);
let xhr_req = new XMLHttpRequest();
xhr_req.open("GET", `https://www.themealdb.com/api/json/v1/1/search.php?s=${current_meal.name}`, true);
xhr_req.send();
xhr_req.onload = function () 
{
  
    let meal = JSON.parse(xhr_req.response).meals[0];
    console.log(meal)
    let food_photo = document.querySelector(".food-photo");
    let meal_name=document.querySelector(".meal-name");
    let instructions_container = document.querySelector(".instructions")
    console.log(meal.strMeal,meal_name )
    food_photo.src=meal.strMealThumb ;
    instructions_container.innerHTML ="<span class='text-muted lead'>Instructions :</span>"+meal.strInstructions;
    meal_name.innerHTML=meal.strMeal;
    
}