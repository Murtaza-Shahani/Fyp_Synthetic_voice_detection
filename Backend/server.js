const express = require("express");
const multer = require("multer");
const { spawn } = require("child_process");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());


const connectDB = require("./db"); // Import the db.js file
const userRoutes = require("./routes/userRoutes"); // Import the user routes

// Connect to MongoDB
connectDB();
// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Handle audio analysis request (Binary Classification)
app.post("/analyze", upload.single("audio"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const audioFilePath = path.join(uploadsDir, req.file.filename);
  console.log(`Running Python script with file: ${audioFilePath}`);

  const pythonProcess = spawn("python", ["python_scripts/analyze.py", audioFilePath]);

  let result = "";

  pythonProcess.stdout.on("data", (data) => {
    console.log("Python Output:", data.toString());
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error("Python Error:", data.toString());
  });

  pythonProcess.on("close", (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: "Python script execution failed." });
    }

    try {
      // Extract last valid JSON line from Python output
      const lines = result.trim().split("\n");
      const lastLine = lines.reverse().find(line => line.trim().startsWith("{") && line.trim().endsWith("}"));
      const prediction = JSON.parse(lastLine);
      res.json(prediction);
    } catch (error) {
      console.error("JSON Parse Error:", error.message);
      res.status(500).json({ error: "Invalid response from Python script." });
    }
  });
});

// Handle Tempered Audio Analysis request
app.post("/analyze-tempered", upload.single("audio"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const audioFilePath = path.join(uploadsDir, req.file.filename);
  console.log(`Running Python script with file: ${audioFilePath}`);

  const pythonProcess = spawn("python", ["python_scripts/analyze_tempered.py", audioFilePath]);

  let result = "";

  pythonProcess.stdout.on("data", (data) => {
    console.log("Python Output:", data.toString());
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error("Python Error:", data.toString());
  });

  pythonProcess.on("close", (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: "Python script execution failed." });
    }

    try {
      // Extract last valid JSON line from Python output
      const lines = result.trim().split("\n");
      const lastLine = lines.reverse().find(line => line.trim().startsWith("{") && line.trim().endsWith("}"));
      const prediction = JSON.parse(lastLine);
      res.json(prediction);
    } catch (error) {
      console.error("JSON Parse Error:", error.message);
      res.status(500).json({ error: "Invalid response from Python script." });
    }
  });
});
//Routes 
app.use("/api/users", userRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
