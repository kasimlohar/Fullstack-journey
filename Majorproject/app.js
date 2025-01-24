const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Activity = require("./models/Activity.js");  // Fix path to relative directory
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {activitySchema} = require("./schema.js");
 
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

const validateActivity = (req, res, next) => {
  let {error} = activitySchema.validate(req.body);
  const newActivity = new Activity(req.body.activity); 
  if(error) { 
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(errMsg, 400)
  } else {
    next()
  }
}

// Index route for displaying all activities
app.get("/activities", async (req, res) => {
  const allActivities = await Activity.find({});
  res.render("./activities/index.ejs", { allActivities });
  // try {
  //   const allActivities = await Activity.find({});
  //   res.render("./activities/index.ejs", { allActivities });
  // } catch (err) {
  //   console.log("Error fetching activities:", err);
  //   res.status(500).send("Error fetching activities.");
  // }
});

// New route for displaying form to add a new activity
app.get("/activities/new", (req, res) => {
  res.render("activities/new.ejs");
});

// Show route for displaying a specific activity
app.get("/activities/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const activity = await Activity.findById(id);
  res.render("./activities/show.ejs", { activity });
  // try {
  //   const activity = await Activity.findById(id);
  //   res.render("./activities/show.ejs", { activity });
  // } catch (err) {
  //   console.log("Error fetching activity:", err);
  //   res.status(404).send("Activity not found.");
  // }
}));

// Create route for adding a new activity to the database
app.post("/activities", validateActivity, wrapAsync(async (req, res, next) => {
   
  await newActivity.save();
  res.redirect(`/activities/${newActivity._id}`);
  // try {
  //   await newActivity.save();
  //   res.redirect(`/activities/${newActivity._id}`);
  // } catch (err) {
  //   // console.log("Error creating activity:", err);
  //   // res.status(400).send("Failed to create activity.");
  //   next(err);
  // }
}));

// Edit route for displaying form to edit an existing activity
app.get("/activities/:id/edit", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const activity = await Activity.findById(id);
  res.render("./activities/edit.ejs", { activity });
  // try {
  //   const activity = await Activity.findById(id);
  //   res.render("./activities/edit.ejs", { activity });
  // } catch (err) {
  //   console.log("Error fetching activity for editing:", err);
  //   res.status(404).send("Activity not found.");
  // }
}));

// Update route for saving the edited activity
app.put("/activities/:id", validateActivity, wrapAsync(async (req, res) => {
  if(!req.body.activity) {
    throw new ExpressError("Invalid Activity Data", 400);
  } 
  const { id } = req.params;
  const activity = await Activity.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
  res.redirect(`/activities/${activity._id}`);
  // try {
  //   const activity = await Activity.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
  //   res.redirect(`/activities/${activity._id}`);
  // } catch (err) {
  //   console.log("Error updating activity:", err);
  //   res.status(400).send("Failed to update activity.");
  // }
}));

// Delete route for deleting an activity
app.delete("/activities/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  await Activity.findByIdAndDelete(id);
  res.redirect("/activities");
  // try {
  //   await Activity.findByIdAndDelete(id);
  //   res.redirect("/activities");
  // } catch (err) {
  //   console.log("Error deleting activity:", err);
  //   res.status(400).send("Failed to delete activity.");
  // }
}));

// Test route to check database contents
app.get("/test", wrapAsync(async (req, res) => {
    const activities = await Activity.find({});
    res.json(activities);
    // try {
    //     const activities = await Activity.find({});
    //     res.json(activities);
    // } catch (err) {
    //     console.error("Error:", err);
    //     res.status(500).json({ error: "Failed to fetch activities" });
    // }
}));

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
  let { message = "Something went wrong", statusCode = 500} = err;
  res.status(statusCode).render("error.ejs", {message})
  // res.status(statusCode).send(message);
  
})

// Server Setup
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
