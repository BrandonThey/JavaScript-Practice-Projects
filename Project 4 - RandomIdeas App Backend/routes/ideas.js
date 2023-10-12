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
        console.log(error);
        res.status(500).json({success: false, error: "Something went wrong"})
    }
})

//defining a get route for specific ideas based on their ids
//uses a query param to get the id from the get request
router.get("/:id", async (request, response) => {
    try {
        //finding the idea by id and sending it as a response
        const idea = await Idea.findById(request.params.id);
        response.json({success: true, data: idea})
    } catch (error) {
        //returning an error if finding data was unsuccessful
        console.log(error);
        res.status(500).json({success: false, error: "Could not find idea"})
    }
})

//post requesting to add a new idea
router.post("/", async (request, response) => {
    //defining idea object to gather data from user and post
    //to database
    const idea = new Idea({
        text: request.body.text,
        tag: request.body.tag,
        //usually we would authenticate username but we will
        //not here
        username: request.body.username,
    })

    try {
        const savedIdea = await idea.save();
        response.json({success: true, data: savedIdea});
    } catch (error) {
        //respone if saving the idea was unsuccessful
        console.log(error);
        response.status(500).json({success: false, error: "Could not save idea"})
    }
})

//put request to update an idea's text or tag based on their id
router.put("/:id", async(request, response) => {
    try {
        //finding the idea by id and updating it
        const updatedIdea = await Idea.findByIdAndUpdate(
            request.params.id,
            {
                $set:{
                    text: request.body.text,
                    tag: request.body.tag,
                }
            },
            {new: true}
            );
        response.json({success: true, data: updatedIdea});
    } catch (error) {
        //returning an error if finding/updating data was unsuccessful
        console.log(error);
        res.status(500).json({success: false, error: "Could not update idea"})
    }
})

//delete request to delete a specific idea based on their id
router.delete("/:id", async (request, response) => {
    try {
        await Idea.findByIdAndDelete(request.params.id)
        response.json({success: true, data: {}});
    } catch (error) {
        //returning an error if finding/deleting data was unsuccessful
        console.log(error);
        res.status(500).json({success: false, error: "Could not delete idea"})
    }
})
//exporting routes
module.exports = router;

