//creating variables for the item form, the item input,
//and the item list, and the clear button
const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearButton = document.getElementById("clear");
//variable for the item filter
const itemFilter = document.getElementById("filter");

//function that will display all the items in the list onto the web page
const displayItems = () => {
    //getting items from storage then adding them to the dome
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => {
        addItemToDOM(item);
    })
    checkUI();
}

//Function to add items to the list
const onAddItemSubmit = (e) =>{
    //prevent the default action of sumbitting
    e.preventDefault();

    //creating a newItem variable to hold the new item from the form
    const newItem = itemInput.value;

    //adding basic validation
    if(newItem === ""){
        alert("Please add an item");
        return;
    }

    //create dom element
    addItemToDOM(newItem);
    
    //add item to local storage
    addItemToStorage(newItem);

    //after adding a child to the items list, we want to check the ui again
    checkUI();

    //resetting the item input
    itemInput.value="";
}

//function that adds the item to the dom/webpage
const addItemToDOM = (item) => {
    //creating a variable to hold the item tab
    const listItem = document.createElement("li");
    //appending item data to the list 
    listItem.appendChild(document.createTextNode(newItem))

    //append button to the item
    const itemButton = createButton("remove-item btn-link text-red");
    listItem.appendChild(itemButton);

    //appending the list item to the items list
    itemList.appendChild(listItem)
}

//Function to add items to local storage so our items
//persist on page reload
const addItemToStorage = (item) => {
    const itemsFromStorage = getItemsFromStorage();

    //adding our new item
    itemsFromStorage.push(item);

    //convert our new storage array to a JSON String and set them
    //into the local storage, with the key of "items"
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

//function that creates a item remove button
// given the classes to be used with it
const createButton = (classes) => {
    const item = document.createElement("button");
    item.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    item.appendChild(icon);
    return item;
}

//function that creates the "X" icon for the button given the classes
const createIcon = (classes) => {
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
}

//function that will retrieve items from the local storage and returns them
const getItemsFromStorage = () => {
    //array variable to hold items from the local stroage
    let itemsFromStorage;

    //checking and getting anything in the local storage
    //if local storage is empty then our array variable is also empty
    if(localStorage.getItem("items") === null){
        itemsFromStorage = []
    } else{
        //getting items from storage, since local storage is a json
        //string we must use the parse method to parse that string
        itemsFromStorage = JSON.parse(localStorage.getItem("items"));
    }

    return itemsFromStorage;
}

//function that removes individual list items
const removeItem = (e) => {
    //where e is the X icon, its parent is the X button, and its parent
    //is the item tab
    //checking if the target has a remove button
    if(e.target.parentElement.classList.contains("remove-item")){
        //if the item tab has a remove button then we can remove
        //the item
        if(confirm("Did you want to remove this item?")){
            e.target.parentElement.parentElement.remove();
            checkUI();
        }
    }
}

//function that removes all items in the list
const clearItems = () => {
    if(confirm("Did you want to remove all items?")){
         //while the item list has children, remove them
        while(itemList.firstChild){
            itemList.removeChild(itemList.firstChild)
        }
    }
    checkUI();
}

//function that occasionally checks the ui for items
//to conditionally render certain elements
const checkUI = () => {
    //variable to hold all the list items in the list
    const items = itemList.querySelectorAll("li");
    
    //if there aren't any items in the list then
    //there is no need for a clear button or an item filter
    //so hide them, other wise we display them
    if(items.length === 0){
        clearButton.style.display = "none";
        itemFilter.style.display = "none";
    } else{
        clearButton.style.display = "block";
        itemFilter.style.display = "block";
    }
}

//function that will filter out list items based on the value of itemFilter
const filterItems = (e) => {
    const filter = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll("li");

    //for each item,
    items.forEach(item => {
        //we want to grab the text of the item
        const itemName = item.firstChild.textContent.toLowerCase();

        //and compare the text to our filter, using indexOf
        //indexOf finds substrings of the filter inside the itemName
        //and returns -1 if not found
        if(itemName.indexOf(filter) != -1){
            item.style.display = "flex"
        } else{
            item.style.display = "none";
        }
    })

}

//initiallizing function
const init = () => {
    //Adding event listeners for submittion of new items
    //and for removal of items 
    itemForm.addEventListener("submit", onAddItemSubmit);
    itemList.addEventListener("click", removeItem);
    //listening for the clear all button
    clearButton.addEventListener("click", clearItems);
    //listening to the item filter
    itemFilter.addEventListener("input", filterItems);
    //listening to document, whenever the DOM is loaded we want to display the item list
    document.addEventListener("DOMContentLoaded", displayItems);
    checkUI();
}

init();