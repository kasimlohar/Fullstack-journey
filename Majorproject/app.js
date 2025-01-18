const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Activity = require("./models/Activity.js");  // Fix path to relative directory
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


// MongoDB connection
async function main() {
    try {
        await mongoose.connect("mongodb://localhost:27017/wanderlust", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("Failed to connect to MongoDB", err);
    }
}

main();

// Setup for EJS and Static Files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));  // Move this line before routes
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Wanderlust App");
});

// Index route for displaying all activities
app.get("/activities", async (req, res) => {
  try {
    const allActivities = await Activity.find({});
    res.render("./activities/index.ejs", { allActivities });
  } catch (err) {
    console.log("Error fetching activities:", err);
    res.status(500).send("Error fetching activities.");
  }
});

// New route for displaying form to add a new activity
app.get("/activities/new", (req, res) => {
  res.render("activities/new.ejs");
});

// Show route for displaying a specific activity
app.get("/activities/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await Activity.findById(id);
    res.render("./activities/show.ejs", { activity });
  } catch (err) {
    console.log("Error fetching activity:", err);
    res.status(404).send("Activity not found.");
  }
});

// Create route for adding a new activity to the database
app.post("/activities", async (req, res) => {
  const newActivity = new Activity(req.body);  // Changed from Listing to Activity
  try {
    await newActivity.save();
    res.redirect(`/activities/${newActivity._id}`);
  } catch (err) {
    console.log("Error creating activity:", err);
    res.status(400).send("Failed to create activity.");
  }
});

// Edit route for displaying form to edit an existing activity
app.get("/activities/:id/edit", async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await Activity.findById(id);
    res.render("./activities/edit.ejs", { activity });
  } catch (err) {
    console.log("Error fetching activity for editing:", err);
    res.status(404).send("Activity not found.");
  }
});

// Update route for saving the edited activity
app.put("/activities/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await Activity.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/activities/${activity._id}`);
  } catch (err) {
    console.log("Error updating activity:", err);
    res.status(400).send("Failed to update activity.");
  }
});

// Delete route for deleting an activity
app.delete("/activities/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Activity.findByIdAndDelete(id);
    res.redirect("/activities");
  } catch (err) {
    console.log("Error deleting activity:", err);
    res.status(400).send("Failed to delete activity.");
  }
});

// Test route to check database contents
app.get("/test", async (req, res) => {
    try {
        const activities = await Activity.find({});
        res.json(activities);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Failed to fetch activities" });
    }
});

// Server Setup
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
