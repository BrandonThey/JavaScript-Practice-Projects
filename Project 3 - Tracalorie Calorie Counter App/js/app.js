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
        
        const remainingCalories = this._calorieLimit - this._totalCalories;
    
        caloriesRemainElement.innerHTML = remainingCalories;
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

//instatiating the tracker
const tracker = new CalorieTracker();

//creating and utilizing some example meals and workouts
//to test the tracker
const breakfast = new Meal("Breakfast", 400);
tracker.addMeal(breakfast);

const running = new Workout("running", 200);
tracker.addWorkout(running);

console.log(tracker._meals)
console.log(tracker._workouts)
console.log(tracker._totalCalories)
