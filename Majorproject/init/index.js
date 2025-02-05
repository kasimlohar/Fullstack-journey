const mongoose = require("mongoose");
const activities = require("./data.js");
const Activity = require("../models/Activity.js");

// Use the environment variable for MongoDB URL if provided, otherwise default to localhost
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

/**
 * Initializes the database by:
 *  - Connecting to MongoDB
 *  - Deleting any existing activities
 *  - Inserting new activity data from the data.js file
 */
async function initDB() {
  try {
    // Connect to MongoDB using the specified URL
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB Connected...");

    // Delete all existing activities from the collection
    const deleted = await Activity.deleteMany({});
    console.log(`Deleted ${deleted.deletedCount} activities`);

    // Insert new activities from the data array
    const inserted = await Activity.insertMany(activities);
    console.log(`Added ${inserted.length} new activities`);

    console.log("Database initialized successfully!");
  } catch (err) {
    // Log any errors that occur during initialization
    console.error("ERROR during database initialization:", err);
  } finally {
    // Ensure the MongoDB connection is closed whether or not an error occurred
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}

// Execute the initialization function
initDB().then(() => {
  console.log("Finished database initialization");
});
