//bringing in express and defining our port
const express = require("express");
const port = 5000;

//setting our app to be express
const app = express();

//defining out get route for the index page
app.get("/", (request, response) => {
    //currently when some sends a get request for the index page
    //we just respond with hello world
    response.send("Hello World");
})

//listening for any requests on our port
app.listen(port, () => console.log("Listening on port " + port));