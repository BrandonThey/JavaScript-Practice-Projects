//bringing in express and defining our port
const express = require("express");

//importing the env file and using its preset port
require("dotenv").config();
const port = process.env.port || 5000;
//importing connectDB and calling it to connect to the db
const connectDB = require("./config/db.js")
connectDB();
//setting our app to be express
const app = express();

//body parser middleware to parse post requests
//express.json to allow us to post raw json
app.use(express.json());
app.use(express.urlencoded({extended: false}))

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