const express = require("express");
//creating an express router
const router = express.Router();
//importing the Idea schema
const Idea = require("../models/Idea.js");

//defining a get route for the api's saved ideas 
router.get("/", async (request, response) => {
    try {
        //trying to get the ideas from the database
        const ideas = await Idea.find();
        response.json({success: true, data: ideas})
    } catch (error) {
        //returning an error if finding data was unsuccessful
        res.status(500).json({success: false, error: "Something went wrong"})
    }
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

//put request to update an idea's text or tag based on their id
router.put("/:id", (request, response) => {
    //finding the idea
    const idea = ideas.find((idea) => idea.id === +request.params.id)
    //testing to see if we found the idea
    if(idea){
        //updating the data, or if there was no new data keep the previous values
        idea.text = request.body.text || idea.text;
        idea.tag = request.body.tag || idea.tag;
        response.json({success: true, data: idea});
    } else{
        //sending a not found status and an error response 
        response.status(404).json({success: false, error: "Idea not found"})
    }
})

//delete request to delete a specific idea based on their id
router.delete("/:id", (request, response) => {
    //finding the idea and its index
    const idea = ideas.find((idea) => idea.id === +request.params.id)
    //testing to see if we found the idea
    if(idea){
        //getting the index of the found idea
        const index = ideas.indexOf(idea);
        //deleting the data by splicing it out of the ideas array
        ideas.splice(index, 1);
        response.json({success: true, data: {}});
    } else{
        //sending a not found status and an error response 
        response.status(404).json({success: false, error: "Idea not found"})
    }
})
//exporting routes
module.exports = router;

