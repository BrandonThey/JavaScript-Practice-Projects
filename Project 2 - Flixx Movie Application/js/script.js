//creating a global object that will contain all our global variables
const global = {
    currentPage: window.location.pathname
}

//asynchronous fetch function that fetches movie data from the TMDB API
const fetchAPIData = async (endpoint) => {
    //in a production enviroment having the key exposed
    //is not advisible, it should be saved in a seperate area
    //or an .env file, but it will be here for convience and learning
    //purposes, as well as the key being free
    //you can register your own key at http://www.themoviedb.org/settings/api
    const API_KEY = "a7eb6500d8df4f0a68716fcac20ad57b";
    const API_URL = "https://api.themoviedb.org/3/";

    //while fetching the data, show the loading spinner
    showSpinner();

    //fetching at the "url/endpoint?api_key=ourKey&language=en-US"
    //using backticks to wrap our string
    //all query strings found in the documentation here:
    //https://developer.themoviedb.org/docs
    const response = await fetch(
        `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
    );

    //after done fetching the data hide the spinner
    hideSpinner();

    //converting that response to json
    const data = await response.json();
    return data;
}

//a function that displays the 20 most popular movies, by creating a 
//html div element that shows up as a card for each movie
const displayPopularMovies = async () => {
    //passing the endpoint to the api function to get 
    //popular movies from the api
    //destructure the results array to retrieve it from the API data
    const {results} = await fetchAPIData("movie/popular");

    //creating a movie card for each movie we fetched
    results.forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("card");
        
        //creating the html element and replacing hardcoded
        //values with our data 
        //the image uses a ternary operator to determine
        //if the movie has an image or not. if it does
        //then use the movie poster path otherwise use
        //the default picture
        movieDiv.innerHTML = 
        `<a href="movie-details.html?id=${movie.id}">
        ${
            movie.poster_path?
            `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title} Poster"
            />` 
            : 
            `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title} Poster"
            />`
        }
        </a>
        
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>`;

        //appending the div to the document
        document.querySelector("#popular-movies").appendChild(movieDiv);

    })
}

//a function that displays the 20 most popular tv shows, by creating a 
//html div element that shows up as a card for each show
const displayPopularShows = async () => {
    //passing the endpoint to the api function to get 
    //popular tv from the api
    //destructure the results array to retrieve it from the API data
    const {results} = await fetchAPIData("tv/popular");

    //creating a tv show card for each tv show we fetched
    results.forEach((show) => {
        const showDiv = document.createElement("div");
        showDiv.classList.add("card");
        
        //creating the html element and replacing hardcoded
        //values with our data
        showDiv.innerHTML = 
        `<a href="tv-details.html?id=${show.id}">
        ${
            show.poster_path?
            `<img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name} Poster"
            />` 
            : 
            `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${show.name} Poster"
            />`
        }
        </a>
        
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
            <small class="text-muted">Air Date: ${show.first_air_date}</small>
          </p>
        </div>`;

        //appending the div to the document
        document.querySelector("#popular-shows").appendChild(showDiv);

    })
}

//function that displays the loading spinner
const showSpinner = () => {
    document.querySelector(".spinner").classList.add("show");
}
//function that hides the loading spinner
const hideSpinner = () => {
    document.querySelector(".spinner").classList.remove("show");
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
    });
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
            displayPopularMovies();
            break;
        case "/shows.html":
            displayPopularShows();
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