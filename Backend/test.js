const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./Model/User"); // Import the User model
const connectDB = require("./db"); // MongoDB connection


// Connect to MongoDB
connectDB();

// Static data for testing
const testUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  occupation: "Teacher",
  password: "password123", // This will be hashed before saving
};

// Function to create and save the user
const createUser = async () => {
  try {
    const newUser = new User(testUser);
    const savedUser = await newUser.save();
    console.log("User created successfully:", savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    mongoose.connection.close(); // Close the connection after the operation
  }
};

// Call the function to create the user
createUser();
