const mongoose = require("mongoose");

//creating a Idea schema/model, which will be the blueprint
//of our idea and what data it contains and how 
//it is stored in our database 
const IdeaSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Please add a text field"],
    },

    tag:{
        type: String,
    },

    username: {
        type: String,
    },

    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Idea", IdeaSchema);