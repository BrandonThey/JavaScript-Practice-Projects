//creating a global object that will contain all our global variables
const global = {
    currentPage: window.location.pathname
}

//initializing function
const init = () => {
    //switch statement that determines what action to take
    //based on what page the user is on
    //serves as a simple router
    switch(global.currentPage){
        case "/":
            break;

        case "/index.html":
            console.log("home");
            break;
        case "/shows.html":
            console.log("shows");
            break;
        case "/movie-details.html":
            console.log("movie details");
            break;
        case "/tv-details.html":
            console.log("tv details");
            break;
        case "/search.html":
            console.log("search");
            break;
    }
}

init();