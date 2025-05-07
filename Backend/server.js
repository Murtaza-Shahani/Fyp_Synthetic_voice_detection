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

// Handle audio analysis request for 3 classes (Real, Partial_Fake, Fake)
// ... (keep your existing imports and setup)

app.post("/analyze", upload.single("audio"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const audioFilePath = path.join(uploadsDir, req.file.filename);
  console.log(`Running Python script with file: ${audioFilePath}`);

  const pythonProcess = spawn("python", ["python_scripts/analyze.py", audioFilePath]);

  let result = "";
  let errorOutput = "";

  pythonProcess.stdout.on("data", (data) => {
    console.log("Python Output:", data.toString());
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error("Python Error:", data.toString());
    errorOutput += data.toString();
  });

  pythonProcess.on("close", (code) => {
    // Clean up the uploaded file
    fs.unlink(audioFilePath, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    if (code !== 0) {
      return res.status(500).json({ 
        error: "Analysis failed",
        details: errorOutput 
      });
    }

    try {
      // Find the last valid JSON output
      const jsonLines = result.split('\n')
        .filter(line => line.trim().startsWith('{') && line.trim().endsWith('}'));
      
      if (jsonLines.length === 0) {
        throw new Error("No valid JSON output from Python script");
      }

      const prediction = JSON.parse(jsonLines[jsonLines.length - 1]);
      res.json(prediction);
    } catch (error) {
      console.error("Processing Error:", error);
      res.status(500).json({ 
        error: "Failed to process results",
        details: error.message 
      });
    }
  });
});

// ... (keep the rest of your server.js)
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

      // Update the result to include 3 classes
      res.json({
        label: prediction.label,  // Real, Partial_Fake, Fake
        confidence: prediction.confidence
      });
    } catch (error) {
      console.error("JSON Parse Error:", error.message);
      res.status(500).json({ error: "Invalid response from Python script." });
    }
  });
});

// Routes for other API endpoints
app.use("/api/users", userRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
