//importing mongoose
const mongoose = require("mongoose");
 
//function that will connect to the database using the 
//MONGO URI defined in an env file
const connectDB = async () =>{
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected " + connect.connection.host);
}

module.exports = connectDB;