// routes/userRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/User");
const router = express.Router();

// Route to get all users
router.get("/get-users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//Add user signup page 
router.post("/add-user", async (req, res) => {
    const { firstName, lastName, email, occupation, password } = req.body;
  
    try {
      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "This email is already registered. Please try another one." });
      }
  
      // Create the new user
      const newUser = new User({ firstName, lastName, email, occupation, password });
      const savedUser = await newUser.save();
      res.json({ message: "User created successfully", user: savedUser });
    } catch (err) {
      if (err.code === 11000) {
        // MongoDB Duplicate Key Error (usually happens with unique fields like email)
        return res.status(400).json({ error: "This email is already registered. Please try another one." });
      }
  
      res.status(500).json({ error: "Oops! Something went wrong. Please try again later." });
    }
  });

  // Route to login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request received for email:", email);  // Log incoming request

  try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
          console.log("User not found");  // Log if user is not found
          return res.status(400).json({ error: "Invalid credentials. Please check your email and password." });
      }

      // Compare the password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          console.log("Password mismatch");  // Log if password is incorrect
          return res.status(400).json({ error: "Invalid credentials. Please check your email and password." });
      }

      // Generate JWT token
      const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_SECRET,  // Ensure you have the JWT secret in your environment variables
          { expiresIn: "1h" }  // Token expiration time (1 hour)
      );

      console.log("Login successful, generating token");  // Log successful login

      // Send the token back to the client
      res.json({ message: "Login successful", token });
  } catch (err) {
      console.error("Error occurred during login:", err);  // Log any errors
      res.status(500).json({ error: "An error occurred. Please try again later." });
  }
});

  
    
module.exports = router; // This ensures the router is exported properly
