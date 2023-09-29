//creating a global object that will contain all our global variables
const global = {
    currentPage: window.location.pathname,
    search: {
        term: "",
        type: "",
        page: 1,
        totalPages: 1
    },
        //in a production enviroment having the key exposed
    //is not advisible, it should be saved in a seperate area
    //or an .env file, but it will be here for convience and learning
    //purposes, as well as the key being free
    //you can register your own key at http://www.themoviedb.org/settings/api
    API_KEY: "a7eb6500d8df4f0a68716fcac20ad57b",
    API_URL: "https://api.themoviedb.org/3/"
}

//asynchronous fetch function that fetches movie/show data from the TMDB API
const fetchAPIData = async (endpoint) => {
    //while fetching the data, show the loading spinner
    showSpinner();

    //fetching at the "url/endpoint?api_key=ourKey&language=en-US"
    //using backticks to wrap our string
    //all query strings found in the documentation here:
    //https://developer.themoviedb.org/docs
    const response = await fetch(
        `${global.API_URL}${endpoint}?api_key=${global.API_KEY}&language=en-US`
    );

    //after done fetching the data hide the spinner
    hideSpinner();

    //converting that response to json
    const data = await response.json();
    return data;
}

//asynchronous fetch function that fetches movie/show data from the TMDB API
//based on search parameters
const searchAPIData = async (endpoint) => {
    //while fetching the data, show the loading spinner
    showSpinner();

    //fetching at the "url/endpoint?api_key=ourKey&language=en-US"
    //using backticks to wrap our string
    //all query strings found in the documentation here:
    //https://developer.themoviedb.org/docs
    const response = await fetch(
        `${global.API_URL}search/${global.search.type}?api_key=${global.API_KEY}&language=en-US&query=${global.search.term}`
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

//displays movie details when a user clicks on the movie's card
const displayMovieDetails = async () => {
    //getting the url search params, and using split to only get the id number
    const movieID = window.location.search.split("=")[1];

    //fetching movie data
    const movie = await fetchAPIData(`movie/${movieID}`)

    //overlay for background image that takes two arugments
    //a type and the path to the background image
    displayBackgroundImage("movie", movie.backdrop_path);

    //creating display for information in the document
    //following a lot of the same stuff we did for the movie
    //display and the tv show display
    const movieDiv = document.createElement("div");
    movieDiv.innerHTML = 
    `<div class="details-top">
        <div>
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
        </div>
        <div>
        <h2>${movie.title}</h2>
        <p>
            <i class="fas fa-star text-primary"></i>
            ${movie.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Release Date: ${movie.release_date}</p>
        <p>
            ${movie.overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
            ${movie.genres.map((genre) => {
                `<li>${genre.name}</li>`
            }).join("")}
        </ul>
        <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
        </div>
    </div>
    <div class="details-bottom">
        <h2>Movie Info</h2>
        <ul>
        <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
        <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
        <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
        <li><span class="text-secondary">Status:</span> ${movie.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">
            ${movie.production_companies
                .map((company) => `<span>${company.name}</span>`).join(", ")}
        </div>
    </div>`;

    document.querySelector("#movie-details").appendChild(movieDiv);
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

//displays show details when a user clicks on the tv show's card
const displayShowDetails = async () => {
    //getting the url search params, and using split to only get the id number
    const showID = window.location.search.split("=")[1];

    //fetching movie data
    const show = await fetchAPIData(`tv/${showID}`)

    //overlay for background image that takes two arugments
    //a type and the path to the background image
    displayBackgroundImage("show", show.backdrop_path);

    //creating display for information in the document
    //following a lot of the same stuff we did for the movie
    //display and the tv show display
    const showDiv = document.createElement("div");
    showDiv.innerHTML = 
    `<div class="details-top">
        <div>
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
        </div>
        <div>
        <h2>${show.name}</h2>
        <p>
            <i class="fas fa-star text-primary"></i>
            ${show.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Air Date: ${show.first_air_date}</p>
        <p>
            ${show.overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
            ${show.genres.map((genre) => {
                `<li>${genre.name}</li>`
            }).join("")}
        </ul>
        <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
        </div>
    </div>
    <div class="details-bottom">
        <h2>Show Info</h2>
        <ul>
        <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
        <li>
            <span class="text-secondary">Last Episode To Air:</span> 
            ${show.last_episode_to_air.name}, Season ${show.last_episode_to_air.season_number}
        </li>
        <li><span class="text-secondary">Status:</span> ${show.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">
            ${show.production_companies
                .map((company) => `<span>${company.name}</span>`).join(", ")}
        </div>
    </div>`;

    document.querySelector("#show-details").appendChild(showDiv);
}

//function that displays the background image, on the details pages
const displayBackgroundImage = (type, background_path) =>{
    const overlayDiv = document.createElement("div");
    //setting the background image to the one we've received
    overlayDiv.style.backgroundImage = 
        `url(https://image.tmdb.org/t/p/original/${background_path})`;

    //stylings for the overlay
    overlayDiv.style.backgroundSize = "cover";
    overlayDiv.style.backgroundPosition = "center";
    overlayDiv.style.backgroundRepeat = "no-repeat";
    overlayDiv.style.height = "100vh";
    overlayDiv.style.width = "100vw";
    overlayDiv.style.position = "absolute";
    overlayDiv.style.top = "0";
    overlayDiv.style.left = "0";
    overlayDiv.style.zIndex = "-1";
    overlayDiv.style.opacity = "0.1";

    //checking the type and appending appropriately
    console.log("in the background image " + type)
    if(type === "movie"){
        console.log("in the background image " + type)
        document.querySelector("#movie-details").appendChild(overlayDiv);
    } else{
        document.querySelector("#show-details").appendChild(overlayDiv);
    }
}

//display movies on a slider using the swiper library
const displaySlider = async () => {
    //getting the results of movies that are now playing in theaters
    const {results} = await fetchAPIData("movie/now_playing");

    results.forEach((movie) => {
        //for each movie, we want to create a slider card 
        const sliderDiv = document.createElement("div");
        sliderDiv.classList.add("swiper-slide");

        sliderDiv.innerHTML = 
        `
        <a href="movie-details.html?id=${movie.id}">
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
        <h4>
            <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10
        </h4>
        `;

        document.querySelector(".swiper-wrapper").appendChild(sliderDiv);
        
        initSwiper();
    })
}

//function that initializes a swiper object
//all the swiper documentation can be found here:
// https://swiperjs.com/get-started
const initSwiper = () => {
    const swiper = new Swiper(".swiper", {
        //number of slides per page, defaulted to 1
        slidesPerView: 1,
        //space between cards of the slider
        spaceBetween: 15,
        //freemode allows users to drag the slider
        freeMode: true,
        //loop and autoplay are self explanatory
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        //breakpoints determine how many movie cards we can display
        //based on how large the window is
        breakpoints: {
            500: {
                slidesPerView: 2
            },
            700: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 4
            }
        }
    })
}

//search function to search from movies or tv shows from the api
const search = async () => {
    //getting the url query 
    const queryString = window.location.search
    //seperating the query for the type and name of the show or movie
    //and setting them into our global variables
    const urlParams = new URLSearchParams(queryString);
    global.search.type = urlParams.get("type");
    global.search.term = urlParams.get("search-term");

    if(global.search.term !== "" && global.search.term !== null){
        //making api request and displaying results
        const results = await searchAPIData();
        console.log(results)
    } else{
        //send an alert to warn the user
        showAlert("Please enter a search term")
    }
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

//adds commas to numbers greater than 100 using regex
const addCommasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//show custom alert
const showAlert = (message, className) => {
    //creating a custom div that will display an alert on the page
    const alertElement = document.createElement("div");
    alertElement.classList.add("alert", className);
    alertElement.appendChild(document.createTextNode(message));
    document.querySelector("#alert").appendChild(alertElement);

    //removes the alert after 3 seconds
    setTimeout(() => alertElement.remove(), 3000);
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
            displaySlider();
            displayPopularMovies();
            break;
        case "/shows.html":
            displayPopularShows();
            break;
        case "/movie-details.html":
            displayMovieDetails();
            break;
        case "/tv-details.html":
            displayShowDetails();
            break;
        case "/search.html":
            search();
            break;
    }

    highlightActiveLink();
}

init();