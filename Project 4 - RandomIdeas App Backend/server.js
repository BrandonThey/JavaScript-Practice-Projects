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

//importing the ideas route and assigning it an endpoint and using it 
const ideasRouter = require("./routes/ideas");
app.use("/api/ideas", ideasRouter)


//listening for any requests on our port
app.listen(port, () => console.log("Listening on port " + port));