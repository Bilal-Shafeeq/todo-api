const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://bilal:bilalshafeeq786@bilal.3g93dd4.mongodb.net/blog?retryWrites=true&w=majority&appName=Bilal"

const connectDB = async () => {
    const connection = await mongoose.connect(MONGO_URI);
    if (connection)
        console.log("Connected to DB⚡");
    else
        console.log("Database connection failed");
}

module.exports = connectDB 