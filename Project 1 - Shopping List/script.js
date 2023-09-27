//creating variables for the item form, the item input,
//and the item list 
const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

//Function to add items to the list
const addItem = (e) =>{
    //prevent the default action of sumbitting
    e.preventDefault();

    //adding basic validation
    if(itemInput.value === ""){
        alert("Please add an item");
        return;
    }

    console.log("Success");
}

console.log("IN SCRIPT.Js")
//Adding event listener 
itemForm.addEventListener("submit", addItem);
