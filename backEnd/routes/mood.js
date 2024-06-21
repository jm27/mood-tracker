// Import the express module to create an Express application.
const express = require("express");

// Create a new router object. This will be used to define routes for your application.
const router = express.Router();

// Import the database connection object from the "mood" model.
const db = require("../models/mood");

// Define a route for creating a new mood. This route responds to POST requests at the root ("/") path.
router.post("/", (req, res) => {
  // Extract the "mood" property from the request body.
  const { mood } = req.body;

  // Define a SQL query to insert a new mood into the "moods" table.
  const query = `INSERT INTO moods(mood) VALUES(?)`;

  // Run the query, passing the "mood" value as a parameter.
  db.run(query, [mood], function (err) {
    // If there's an error, log it and send a 500 response with the error message.
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    }

    // If the query is successful, send a response with the id and mood of the last inserted row.
    res.send({ id: this.lastID, mood: mood });
  });
});

// Define a route for reading all moods. This route responds to GET requests at the root ("/") path.
router.get("/", (req, res) => {
  // Define a SQL query to select all moods from the "moods" table.
  const query = `SELECT * FROM moods`;

  // Run the query.
  db.all(query, [], (err, rows) => {
    // If there's an error, log it and send a 500 response with the error message.
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    }

    // If the query is successful, send a response with the rows selected.
    res.send(rows);
  });
});

// Define a route for updating a mood. This route responds to PUT requests at the "/:id" path.
router.put("/:id", (req, res) => {
  // Extract the "mood" property from the request body and the "id" parameter from the request parameters.
  const { mood } = req.body;
  const { id } = req.params;

  // Define a SQL query to update the mood with the specified id in the "moods" table.
  const query = `UPDATE moods SET mood = ? WHERE id = ?`;

  // Run the query, passing the "mood" and "id" values as parameters.
  db.run(query, [mood, id], function (err) {
    // If there's an error, log it and send a 500 response with the error message.
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    }

    // If the query is successful, send a response with the new updated row.
    res.send({ id: id, mood: mood });
  });
});

// Define a route for deleting a mood. This route responds to DELETE requests at the "/:id" path.
router.delete("/:id", (req, res) => {
  // Extract the "id" parameter from the request parameters.
  const { id } = req.params;

  // Define a SQL query to delete the mood with the specified id from the "moods" table.
  const query = `DELETE FROM moods WHERE id = ?`;

  // Run the query, passing the "id" value as a parameter.
  db.run(query, [id], function (err) {
    // If there's an error, log it and send a 500 response with the error message.
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    }

    // If the query is successful, send a response with the number of rows deleted.
    res.send({ changes: this.changes });
  });
});

// Export the router object. This allows other modules in your application to use the routes defined in this module.
module.exports = router;
