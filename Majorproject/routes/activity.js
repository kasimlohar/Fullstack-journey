const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { activitySchema } = require("../schema.js");
const Activity = require("../models/Activity.js");

// Middleware to validate activity data using Joi schema
const validateActivity = (req, res, next) => {
    let { error } = activitySchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(errMsg, 400);
    } else {
        next();
    }
};

// Index route for displaying all activities
router.get("/", wrapAsync(async (req, res) => {
    const allActivities = await Activity.find({});
    res.render("./activities/index.ejs", { allActivities });
}));

// New route for displaying form to add a new activity
router.get("/new", (req, res) => {
    res.render("activities/new.ejs");
});

// Show route for displaying a specific activity
router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate("reviews");
    if(!activity) {
        req.flash("error", "Activity you request to does not exist!")
        res.redirect("/activities")
    }
    res.render("./activities/show.ejs", { activity });
}));

// Create route for adding a new activity to the database
router.post("/", validateActivity, wrapAsync(async (req, res, next) => {
    const newActivity = new Activity(req.body);
    await newActivity.save();
    req.flash("success", "New Activity Created");
    res.redirect(`/activities/${newActivity._id}`);
}));

// Edit route for displaying form to edit an existing activity
router.get("/:id/edit", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    if(!activity) {
        req.flash("error", "Activity you request to does not exist!")
        res.redirect("/activities")
    }
    res.render("./activities/edit.ejs", { activity });
}));

// Update route for saving the edited activity
router.put("/:id", validateActivity, wrapAsync(async (req, res) => {
    if (!req.body) {
        throw new ExpressError("Invalid Activity Data", 400);
    }
    const { id } = req.params;
    const activity = await Activity.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    req.flash("success", "Activity Updated");
    res.redirect(`/activities/${activity._id}`);
}));

// Delete route for deleting an activity
router.delete("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Activity.findByIdAndDelete(id);
    req.flash("success", "Activity Deleted");
    res.redirect("/activities");
}));

module.exports = router;