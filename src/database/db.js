const mongoose = require('mongoose');

const connection = async () => {
    const uri = process.env.MONGO_URI; // Ensure your .env file has MONGO_URI defined
    if (!uri) {
        console.error("MongoDB connection string is missing!");
        process.exit(1); // Exit the app if no URI is provided
    }

    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the app if connection fails
    }
};

module.exports = connection;

