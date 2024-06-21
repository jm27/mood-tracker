// Import the necessary modules
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const moodsRouter = require("./routes/mood");
const cors = require("cors"); // Import the cors module

// Create an instance of an Express application
const app = express();

// Use cors middleware to enable CORS
app.use(cors());

// Use bodyParser middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Create a new SQLite database connection
app.use("/moods", moodsRouter);

// Define a route that responds with "Hello World!" when a GET request is made
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server on port 3000 and log a message to the console once it's running
app.listen(3001, () => {
  console.log("Server started on port 3001");
});
