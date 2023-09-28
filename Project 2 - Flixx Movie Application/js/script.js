//creating a global object that will contain all our global variables
const global = {
    currentPage: window.location.pathname
}

//highlight active link of the page we're on
const highlightActiveLink = () => {
    //grab all the nav links and highlight the links
    //that match our current page
    const links = document.querySelectorAll(".nav-link")
    links.forEach((link) => {
        if(link.getAttribute("href") === global.currentPage){
            link.classList.add("active");
        }
    })
}

//initializing function that runs every time a page is loaded
const init = () => {
    //switch statement that determines what action to take
    //based on what page the user is on
    //serves as a simple router
    switch(global.currentPage){
        // the / and the index.html pages are the same
        case "/":
        case "/index.html":
            break;
        case "/shows.html":
            break;
        case "/movie-details.html":
            break;
        case "/tv-details.html":
            break;
        case "/search.html":
            break;
    }

    highlightActiveLink();
}

init();