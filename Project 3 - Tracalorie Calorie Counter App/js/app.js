//class that tracks the calories consumed/burned through adding/removing
//food and adding/removing workouts
class CalorieTracker{

    //default constructor that initializes vars 
    constructor(){
        //calorie limit is the calorie goal the user can set but is default 2000
        this._calorieLimit = 2000;
        //totalCalories are the total calories accumated after adding meals and workouts
        this._totalCalories = 0;
        //arrays to contains lists of meals and workouts
        this._meals = [];
        this._workouts = [];

        //diplaying total
        this._displayCaloriesTotal();
        //displaying limit
        this._displayCaloriesLimit();
        //displaying calories consumed
        this._displayCaloriesConsumed();
        //displaying the calories burned
        this._displayCaloriesBurned();
        //displaying remaining calorie count
        this._displayCaloriesRemaining();
        //displaying progress bar
        this._displayCaloriesProgress();
    }

    // PUBLIC METHODS/API//
    //add meals function that adds the user entered meal to the meals array
    //and adds that meal's calories to the total calories consumed
    //takes a meal object and does not return anything
    addMeal(meal){
        this._meals.push(meal);
        this._totalCalories += meal.calories;
        //rerendering
        this._render();
    }

    //add workout function that adds the user entered workout to the workout array
    //and subtracts that workout's calories from the total calories consumed
    //takes a workout object and does not return anything
    addWorkout(workout){
        this._workouts.push(workout);
        this._totalCalories -= (workout.calories);
        //rerendering
        this._render();
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

//App class that acts as a driver object for the application
class App {

    //constructor that instatiates a calorie tracker object and adds listeners
    constructor(){
        this._tracker = new CalorieTracker();
        //listener for meal form, for adding meals, that calls the _newItem with a type of meal function when 
        //submitted, and binding the function to the app
        document.getElementById("meal-form").addEventListener("submit", this._newItem.bind(this, "meal"));
        //listener for workouts
        document.getElementById("workout-form").addEventListener("submit", this._newItem.bind(this, "workout"));
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
}

//instatiating a new App object
const app = new App();