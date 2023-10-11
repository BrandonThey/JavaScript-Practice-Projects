//bringing in express and defining our port
const express = require("express");
const port = 5000;

//setting our app to be express
const app = express();

//defining a get route for the index
app.get("/", (request, response) => {
    //currently when some sends a get request for the index
    //we just respond with hello world
    //for example if you start the server and send a get request
    //through postman or the url (http://localhost:5000) it will return a hello world
    response.json({message: "Welcome to the Random Ideas API"});
})


//some placeholder idea data (array of idea objects) 
//to be sent back as a response to
//the api/ideas route
const ideas = [
    {
        id: 1,
        text: "Some text here",
        tag: "Tech",
        username: "BThey",
        date: "2023-01-01"
    },
    {
        id: 2,
        text: "Some other text here",
        tag: "Marketing",
        username: "JasonB",
        date: "2023-03-04"
    }
]
//defining a get route for the api's saved ideas 
app.get("/api/ideas", (request, response) => {
    //responding with a successful request and the ideas data
    response.json({success: true, data: ideas});
})

//listening for any requests on our port
app.listen(port, () => console.log("Listening on port " + port));