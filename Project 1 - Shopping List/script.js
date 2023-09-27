//creating variables for the item form, the item input,
//and the item list 
const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

//Function to add items to the list
const addItem = (e) =>{
    //prevent the default action of sumbitting
    e.preventDefault();

    //creating a newItem variable to hold the new item from the form
    const newItem = itemInput.value;

    //adding basic validation
    if(newItem === ""){
        alert("Please add an item");
        return;
    }

    //creating a variable to hold the item
    const listItem = document.createElement("li");
    //appending item data to the list 
    listItem.appendChild(document.createTextNode(newItem))

    //append tab to the item
    const itemTab = createTab("remove-item btn-link text-red");
    listItem.appendChild(itemTab);

    //appending the list item to the items list
    itemList.appendChild(listItem)

    //resetting the item input
    itemInput.value="";
}

//function that creates a item tab given the classes to be used with it
const createTab = (classes) => {
    const item = document.createElement("button");
    item.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    item.appendChild(icon);
    return item;
}

//function that creates an icon for the item given the classes
const createIcon = (classes) => {
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
}

//Adding event listener 
itemForm.addEventListener("submit", addItem);
