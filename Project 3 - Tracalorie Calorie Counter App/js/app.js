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
    }

    //add meals function that adds the user entered meal to the meals array
    //and adds that meal's calories to the total calories consumed
    //takes a meal object and does not return anything
    addMeal(meal){
        this._meals.push(meal);
        this._totalCalories += meal.calories;
    }

    //add workout function that adds the user entered workout to the workout array
    //and subtracts that workout's calories from the total calories consumed
    //takes a workout object and does not return anything
    addWorkout(workout){
        this._workouts.push(workout);
        this._totalCalories -= (workout.calories);
    }
}

//meal class that has a name, id, and calories variables
//to track that meal's information
class Meal {
    constructor(name, calories){
        //generating a random hexadecimal (toString(16)) number
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
        //generating a random hexadecimal (toString(16)) number
        //and slicing out the starting Ox from the value (slice(2))
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories
    }
}