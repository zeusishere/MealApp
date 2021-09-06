// select search object
let search_input = document.querySelector("#search");
// search match container obj
let matches_container = document.querySelector("#matches-container");
// add a eventlistener whenever the user types in searchbox
search_input.addEventListener("input", function () {

    if (search_input.value == "") {
        matches_container.classList.add("display-none")
        return;
    }

    matches_container.classList.remove("display-none")

    // get the list of matching results
    let xhr_req = new XMLHttpRequest();
    xhr_req.open("GET", `https://www.themealdb.com/api/json/v1/1/search.php?s=${search_input.value}`, true);
    xhr_req.send();
    xhr_req.onload = function () {
        let matched_meals_list = JSON.parse(xhr_req.response).meals;
        // deletes the result of previous search from matches container
        matches_container.innerHTML = "";
        // create and add search result to match container
        for (let item of matched_meals_list) {

            let match_item = createResultElement(item.strMeal, item.strMealThumb);

            matches_container.appendChild(match_item);
        }
    }
})


// fn returns a p element coressponding to each search result
function createResultElement(meal_name, meal_link) 
{
    // handles the marking up the matched chars from the whole search-result
    let index = meal_name.toLowerCase().indexOf(search_input.value.toLowerCase());
    let list_element = document.createElement("li");
    list_element.innerHTML = `${meal_name.substring(0, index)}<span class="text-dark">${meal_name.substring(index, index + search_input.value.length)}</span>${meal_name.substring(index + search_input.value.length, meal_name.length)}
    <img src="https://cdn-icons-png.flaticon.com/512/3237/3237429.png" class=" fav-icon float-right">`;
    list_element.setAttribute("class", "text-muted bg-light search-result");
    // event handler stores current meal in local storage 
    list_element.addEventListener("click", () => {
        storeCurrentMeal(meal_name);
        window.location = "./meal.html" ;
    });

    let fav_element = list_element.querySelector(".fav-icon");
    // adds a meal to fav meals arr in local storage
    fav_element.addEventListener("click", (event) => {
        event.stopPropagation();
        storeFavouriteMeals(meal_name);

    })
    return list_element;
}




// handles local storage manipulation
// stores current meal in local storage
function storeCurrentMeal(meal_name) {
    console.log("inside store Current Meal")
    let current_meal = {
        "name": meal_name
    };
    current_meal = JSON.stringify(current_meal);
    localStorage.current_meal = current_meal;
}
function storeFavouriteMeals(meal_name) {
    
    // recieved as an array or null
    let fav_meal_arr = localStorage.getItem("fav_meal_arr");
   
    if (fav_meal_arr === null) {
        fav_meal_arr = [];
        fav_meal_arr.push(meal_name);

    }
    else {
        fav_meal_arr = JSON.parse(fav_meal_arr);
        // meal_name already exists in the fav_meal_arr do nothing and return
       let index = fav_meal_arr.find( (item) =>
       {
           return item === meal_name ;
       });
       if(index !== undefined)
       {
           return ;
       }
        fav_meal_arr.push(meal_name);
    }
   
    // converted into string
    fav_meal_arr = JSON.stringify(fav_meal_arr);
    localStorage.setItem("fav_meal_arr",fav_meal_arr) ;
}
