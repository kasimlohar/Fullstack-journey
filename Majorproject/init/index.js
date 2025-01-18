const mongoose = require("mongoose");
const activities = require("./data.js");
const Activity = require("../models/Activity.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function initDB() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB Connected...");

        // Delete existing activities
        const deleted = await Activity.deleteMany({});
        console.log(`Deleted ${deleted.deletedCount} activities`);

        // Insert new activities
        const inserted = await Activity.insertMany(activities);
        console.log(`Added ${inserted.length} new activities`);

        console.log("Database initialized successfully!");

    } catch (err) {
        console.error("ERROR: ", err);
    } finally {
        mongoose.connection.close();
    }
}

// Run the function
initDB().then(() => {
    console.log("Finished database initialization");
});
