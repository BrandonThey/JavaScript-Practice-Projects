//class that tracks the calories consumed/burned through adding/removing
//food and adding/removing workouts
class CalorieTracker{

    //default constructor that initializes vars 
    constructor(){
        //calorie limit is the calorie goal the user can set but is default 2000
        //taken from the local storage
        this._calorieLimit = Storage.getCalorieLimit();
        //totalCalories are the total calories accumated after adding meals and workouts
        this._totalCalories = Storage.getTotalCalories();
        //arrays to contains lists of meals and workouts
        this._meals = Storage.getItems("meals");
        this._workouts = Storage.getItems("workouts");

        //rendering all the calorie data
        this._displayCaloriesLimit();
        this._render();
    }

    // PUBLIC METHODS/API//
    //add meals function that adds the user entered meal to the meals array
    //and adds that meal's calories to the total calories consumed
    //takes a meal object and does not return anything
    addMeal(meal){
        this._meals.push(meal);
        this._totalCalories += meal.calories;
        //storing the totalCalories
        Storage.setTotalCalories(this._totalCalories);
        //storing the array of meals
        Storage.saveItem(meal, "meals")
        //displaying new meal item
        this._displayNewItem("meal",meal);
        //rerendering
        this._render();
    }

    //add workout function that adds the user entered workout to the workout array
    //and subtracts that workout's calories from the total calories consumed
    //takes a workout object and does not return anything
    addWorkout(workout){
        this._workouts.push(workout);
        this._totalCalories -= (workout.calories);
        //storing the totalCalories
        Storage.setTotalCalories(this._totalCalories);
        //storing the array of meals
        Storage.saveItem(workout, "workouts")
        //displaying new workout
        this._displayNewItem("workout",workout);
        //rerendering
        this._render();
    }
    
    //remove meal function that removes a meal from the meals list using its id
    //and remove its calorie count from the total calories
    removeMeal(id){
        //finding the item based on id from the meals list
        const index = this._meals.findIndex((meal) => meal.id === id)

        //if we the item was found we can delete it
        if(index !== -1){
            const meal = this._meals[index];
            this._totalCalories -= meal.calories;
            //storing the totalCalories
            Storage.setTotalCalories(this._totalCalories);
            //splice the element out of the array
            this._meals.splice(index, 1);
            //removing element from local storage
            Storage.removeItem(id, "meals");
            this._render()
        }
    }
    
    //remove workout function that removes a workout from the workoutss list using its id
    //and adding its calorie count tp the total calories
    removeWorkout(id){
        //finding the item based on id from the meals list
        const index = this._workouts.findIndex((workout) => workout.id === id)

        //if we the item was found we can delete it
        if(index !== -1){
            const workout = this._workouts[index];
            this._totalCalories += workout.calories;
            //storing the totalCalories
            Storage.setTotalCalories(this._totalCalories);
            //splice the element out of the array
            this._workouts.splice(index, 1);
            //removing element from local storage
            Storage.removeItem(id, "workouts");
            this._render()
        }
    }

    //reset function that resets the meals and workouts arrays as well as the total calories
    reset(){
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
        this._render();
    }

    //set limit function that updates the calorieLimit of the tracker to a new
    //user entered limit
    setLimit(newLimit){
        this._calorieLimit = newLimit;
        //locally storing the new calorie limit
        Storage.setCalorieLimit(newLimit);
        this._displayCaloriesLimit();
        this._render();
    }

    //function that loads items from local storage onto the dom on page start up
    loadItems(){
        this._meals.forEach(meal => this._displayNewItem("meal",meal));
        this._workouts.forEach(workout => this._displayNewItem("workout",workout));
    }

    //PRIVATE METHODS//
    //function that displays the calorie total by 
    //manipulating the html of the calories total element
    _displayCaloriesTotal(){
        const totalCaloriesElement = document.getElementById("calories-total");
        totalCaloriesElement.innerHTML = this._totalCalories;
    }

    //function that displays the calorie limit by 
    //manipulating the html of the calories limit element
    _displayCaloriesLimit(){
        const calorieLimitElement = document.getElementById("calories-limit");
        calorieLimitElement.innerHTML = this._calorieLimit;
    }

    //function that displays how many calories have been consumed through food
    _displayCaloriesConsumed(){
        const caloriesConsumedElement = document.getElementById("calories-consumed");
        
        //using the reduce method and a callback function to calculate
        //all the calories in the meals array
        const consumedCalories = this._meals.reduce((total, meal) => total + meal.calories, 0);
    
        caloriesConsumedElement.innerHTML = consumedCalories;
    }

    //function that displays how many calories have been burned through workouts
    _displayCaloriesBurned(){
        const caloriesBurnedElement = document.getElementById("calories-burned");
        
        //using the reduce method and a callback function to calculate
        //all the calories in the workout array
        const burnedCalories = this._workouts.reduce((total, workout) => total + workout.calories, 0);
    
        caloriesBurnedElement.innerHTML = burnedCalories;
    }

    //function that displays how many calories remain by subtracting total calories from calorie limit
    _displayCaloriesRemaining(){
        const caloriesRemainElement = document.getElementById("calories-remaining");
        const progressElement = document.getElementById("calorie-progress");
        const remainingCalories = this._calorieLimit - this._totalCalories;
    
        caloriesRemainElement.innerHTML = remainingCalories;

        //if the remaining calories is <= 0 then change the progress bar and calories 
        //remaining to display as red instead of green, otherwise set it as green
        if(remainingCalories <= 0){
            caloriesRemainElement.parentElement.parentElement.classList.remove("bg-light");
            caloriesRemainElement.parentElement.parentElement.classList.add("bg-danger");
            progressElement.classList.remove("bg-success");
            progressElement.classList.add("bg-danger");
        } else{
            caloriesRemainElement.parentElement.parentElement.classList.add("bg-light");
            caloriesRemainElement.parentElement.parentElement.classList.remove("bg-danger");
            progressElement.classList.add("bg-success");
            progressElement.classList.remove("bg-danger");
        }
    }

    //function that will display the progress bar and adjust it based on how many calories were consumed
    _displayCaloriesProgress(){
        const progressElement = document.getElementById("calorie-progress");
        //calculating a percent to set the progress bar
        const percentage = (this._totalCalories / this._calorieLimit) * 100;
        const width = Math.min(percentage, 100);

        progressElement.style.width = `${width}%`
    }
    
    //creates and displays meal list items on the webpage
    _displayNewItem(type, item){
        //grabbing the items list container
        const itemsElement = document.getElementById(`${type}-items`);
        //making a item div
        const itemElement = document.createElement("div");
        itemElement.classList.add("card", "my-2");
        //setting the item element's div id to item's id
        itemElement.setAttribute("data-id", item.id);
        
        //creating the html item tab based on if it is a meal or workout
        if(type === "meal"){
            itemElement.innerHTML = 
            `
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                    <h4 class="mx-1">${item.name}</h4>
                    <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
                        ${item.calories}
                    </div>
                    <button class="delete btn btn-danger btn-sm mx-2">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
            `
        } else{
            itemElement.innerHTML = 
            `
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${item.name}</h4>
                  <div class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">
                    ${item.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
            </div>
            `
        }

        //appending the meal element to the list
        itemsElement.append(itemElement);
    }

    //function that rerenders the html elements whenever they have been changed
    _render(){
        //displaying the adjusted total
        this._displayCaloriesTotal();
        //displaying adjusted consumed calories
        this._displayCaloriesConsumed();
        //displaying adjusted burned calories
        this._displayCaloriesBurned();
        //displaying adjusted remaining calorie count
        this._displayCaloriesRemaining();
        //displaying adjusted progress bar
        this._displayCaloriesProgress();
    }
}

//meal class that has a name, id, and calories variables
//to track that meal's information
class Meal {
    constructor(name, calories){
        //generating a random hexadecimal (toString(16)) id
        //and slicing out the starting Ox from the value (slice(2))
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories
    }
}

//workout class that has a name, id, and calories variables
//to track that workout's information
class Workout {
    constructor(name, calories){
        //generating a random hexadecimal (toString(16)) id
        //and slicing out the starting Ox from the value (slice(2))
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories
    }
}

//Storage class that stores the tracker data into local web storage
class Storage{
    //all methods in the storage class will be static since we dont need 
    //multiple instances of storages

    //function that retrieve the calorie limit from local storage and returns it
    //default limit is set at 2000
    static getCalorieLimit(defaultLimit = 2000){
        //calorieLimit variable that will be returned after retrieving the limit from 
        //storage
        let calorieLimit;
        //if we dont have a calorie limit set in storage yet and is null, 
        //then set it to default of 2000
        //else get the limit from local storage
        if(localStorage.getItem("calorieLimit") == null){
            calorieLimit = defaultLimit
        } else{
            calorieLimit = +localStorage.getItem("calorieLimit");
        }
        return calorieLimit;
    }

    //function that stores a new calorie limit into local storage
    static setCalorieLimit(calorieLimit){
        localStorage.setItem("calorieLimit", calorieLimit);
    }

    //function that gets the total calories accumulated from the meals and workouts
    static getTotalCalories(defaultTotal = 0){
        let totalCalories;
        if(localStorage.getItem("totalCalories") == null){
            totalCalories = defaultTotal
        } else{
            totalCalories = +localStorage.getItem("totalCalories");
        }
        return totalCalories;
    }

    //function that stores a new total calories accumulated from the meals and workouts
    static setTotalCalories(totalCalories){
        localStorage.setItem("totalCalories", totalCalories);
    }

    //function gets the array of items(meals or workouts) from storage
    static getItems(type){
        let items;
        if(localStorage.getItem(`${type}`) == null){
            items = [];
        } else{
            //parsing the json string into an array
            items = JSON.parse(localStorage.getItem(`${type}`));
        }
        return items;
    }

    //function that pushes a new item (meal or workout) into the stored array of said item
    static saveItem(newItems, type){
        //getting the current local storage of meals
        const items = Storage.getItems(`${type}`);
        console.log(items)
        items.push(newItems);
        //stringify the array into a json string
        localStorage.setItem(`${type}`, JSON.stringify(items))
    }

    //function that removes an item (meal or workout) using its id from local storage
    static removeItem(id, type){
        //getting the items array
        const items = Storage.getItems(type);

        //removing item similar to that of removing from the tracker
        items.forEach((item, index) => {
            if(item.id === id){
                items.splice(index, 1)
            }
        });

        //restoring the new array with the item spliced out
        localStorage.setItem(`${type}`, JSON.stringify(items))
    }
}

//App class that acts as a driver object for the application
class App {

    //constructor that instatiates a calorie tracker object and adds listeners
    constructor(){
        this._tracker = new CalorieTracker();
        //function that loads all the event listeners
        this._loadEventListeners();
        //loading items from storage onto the dom
        this._tracker.loadItems();
    }

    _loadEventListeners(){
        //listener for meal form, for adding meals, that calls the _newItem with a type of meal function when 
        //submitted, and binding the function to the app
        document.getElementById("meal-form")
        .addEventListener("submit", this._newItem.bind(this, "meal"));
        //listener for workouts
        document.getElementById("workout-form")
            .addEventListener("submit", this._newItem.bind(this, "workout"));
        //listener for remove button on meals
        document.getElementById("meal-items")
            .addEventListener("click", this._removeItem.bind(this, "meal"));
        //listener for remove button on workout
        document.getElementById("workout-items")
            .addEventListener("click", this._removeItem.bind(this, "workout"));
        //listener for meals filter input
        document.getElementById("filter-meals")
            .addEventListener("keyup", this._filterItems.bind(this, "meal"));
        //listener for workout filter input
        document.getElementById("filter-workouts")
            .addEventListener("keyup", this._filterItems.bind(this, "workout"));
        //listener for reset button
        document.getElementById("reset")
            .addEventListener("click", this._reset.bind(this));
        //listener for set daily limit button
        document.getElementById("limit-form")
            .addEventListener("submit", this._setLimit.bind(this));
    }
    //new item function that gets info from the form and verifies it
    //creates new type object and adds it to the CalorieTracker
    //arguments come first then event object
    _newItem(type, e){
        e.preventDefault();
        const name = document.getElementById(`${type}-name`);
        const calories = document.getElementById(`${type}-calories`);
        
        //validating input
        if(name.value === "" || calories.value === ""){
            alert(`Please enter ${type} information`);
            return;
        }
        //creating object and adding it to the tracker
        //the + in front of the calories converts it to a number from a string
        //no need to validate if the calories are a number since the form only allows 
        //number inputs for that field
        if(type === "meal"){
            const newItem = new Meal(name.value, +calories.value);
            this._tracker.addMeal(newItem);
        } else{
            const newItem = new Workout(name.value, +calories.value);
            this._tracker.addWorkout(newItem);
        }

        //resetting inputs
        name.value = "";
        calories.value = "";

        //collapsing form menu after getting the values
        //we can use the bootstrap.Collapse because we have the bootstrap javascript file
        const collapse = document.getElementById(`collapse-${type}`);
        const bsCollapse = new bootstrap.Collapse(collapse, {
            toggle: true
        });
    }

    //remove item function that removes an item from the item's list and the dom
    _removeItem(type, e){
        //checking to see if the delete/x mark button was clicked and if it was then delete the item
        if(e.target.classList.contains("delete") || e.target.classList.contains("fa-xmark")){
            if(confirm("Did you want to delete this item?")){
                //getting the id of the card closest to the event target
                const id = e.target.closest(".card").getAttribute("data-id");

                //checking if it was a meal or workout and removing it from the tracker
                type === "meal" 
                    ? this._tracker.removeMeal(id)
                    : this._tracker.removeWorkout(id);
                e.target.closest(".card").remove();
            }
        }
    }

    //function that filters items of a meal/workout list based on user input
    _filterItems(type, e){
        //getting the filtering text
        const filterText = e.target.value.toLowerCase();

        //selecting all items of the type and filtering out the ones that dont match
        document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
            //getting the item's name
            const name = item.firstElementChild.firstElementChild.textContent.toLowerCase();

            //if the text does match (not equal to -1) then we display, otherwise dont display
            if(name.indexOf(filterText) !== -1){
                item.style.display = "block";
            } else{
                console.log("In else")
                item.style.display = "none";
            }
        })
    }

    //reset function that removes all meals and workouts from each list
    _reset(){

        if(confirm("Are you sure you want to reset?")){
            //tracker reset function
            this._tracker.reset();

            //resetting meal and workout list containters as well as the filters
            document.getElementById("meal-items").innerHTML = "";
            document.getElementById("workout-items").innerHTML = "";
            document.getElementById("filter-meals").innerHTML = "";
            document.getElementById("filter-workouts").innerHTML = "";
        }
    }

    //set limit function that changes the daily caloric limit for the tracker
    _setLimit(e){
        e.preventDefault();

        //getting the user inputted limit element
        const limit = document.getElementById("limit")
        
        //if the user hasnt entered a new limit send an alert 
        if(limit.value === "" || isNaN(+limit.value)){
            alert("Please add a valid limit");
            return;
        }

        //setting the new limit
        this._tracker.setLimit(+limit.value);
        limit.value = "";

        //similar to closing a collapsable form, we close the modal form after submittion
        const modalElement = document.getElementById("limit-modal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
    }
}

//instatiating a new App object
const app = new App();