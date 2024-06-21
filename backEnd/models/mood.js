// Import the sqlite3 module in verbose mode.
// Verbose mode provides more detailed stack traces for debugging.
const sqlite3 = require("sqlite3").verbose();

// Create a new SQLite database connection.
// "./db/moods.db" is the path to the database file.
// If the file does not exist, SQLite will try to create it.
let db = new sqlite3.Database("./db/moods.db", (err) => {
  // If there's an error during this process, log it to the console.
  if (err) {
    console.error(err.message);
  }
  // If the connection is successful, log a success message.
  console.log("Connected to the moods database.");
});

// Run a SQL command to create a new table named "moods" if it doesn't already exist.
// The table has two columns: "id" and "mood".
// The "id" column is an integer that automatically increments each time a new record is inserted.
// The "mood" column is also an integer and cannot be NULL.
db.run(
  `CREATE TABLE IF NOT EXISTS moods(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mood INTEGER NOT NULL
   )`,
  (err) => {
    // If there's an error during this process, log it to the console.
    if (err) {
      console.error(err.message);
    }
    // If the table is created successfully, log a success message.
    console.log("Moods table created successfully.");
  }
);

// Export the database connection object.
// This allows other modules in your application to use this database connection.
module.exports = db;
