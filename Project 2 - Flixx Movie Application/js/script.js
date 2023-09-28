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
    const API_KEY = "a7eb6500d8df4f0a68716fcac20ad57b";
    const API_URL = "https://api.themoviedb.org/3/";

    //fetching at the "url/endpoint?api_key=ourKey&language=en-US"
    //using backticks to wrap our string
    //all query strings found in the documentation here:
    //https://developer.themoviedb.org/docs
    const response = await fetch(
        `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
    );

    //converting that response to json
    const data = await response.json();
    return data;
}

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
                alt="Movie Poster"
            />` 
            : 
            `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="Movie Poster"
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