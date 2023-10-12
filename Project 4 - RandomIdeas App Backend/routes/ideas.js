const express = require("express");

//creating an express router
const router = express.Router();

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
router.get("/", (request, response) => {
    //responding with a successful request and the ideas data
    response.json({success: true, data: ideas});
})

//defining a get route for specific ideas based on their ids
//uses a query param to get the id from the get request
router.get("/:id", (request, response) => {
    //finding the idea
    const idea = ideas.find((idea) => idea.id === +request.params.id)
    
    //testing to see if we found the idea
    if(idea){
        //responding with a successful request and the specific idea
        response.json({success: true, data: idea});
    } else{
        //sending a not found status and an error response 
        response.status(404).json({success: false, error: "Idea not found"})
    }
})

//post requesting to add a new idea
router.post("/", (request, response) => {
    //defining idea object to gather data from user and post
    //to database
    const idea = {
        //auto incrementing id that uses the length of ideas
        id: ideas.length + 1,
        text: request.body.text,
        tag: request.body.tag,
        //usually we would authenticate username but we will
        //not here
        username: request.body.username,
        //getting the date the idea was created and slicing out the time
        date: new Date().toISOString().slice(0,10)
    }

    //pushing the new idea into the array
    ideas.push(idea);


    response.json({success: true, data: idea});
})

//exporting routes
module.exports = router;
