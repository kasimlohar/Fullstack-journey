const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js");
const Activity = require("../models/Activity.js");
const {isLoggedIn, isOwner, validateActivity} = require("../middleware.js")
 

// Index route for displaying all activities
router.get("/", wrapAsync(async (req, res) => {
    const allActivities = await Activity.find({});
    res.render("./activities/index.ejs", { allActivities });
}));

// New route for displaying form to add a new activity
router.get("/new", isLoggedIn, (req, res) => {
    
     res.render("activities/new.ejs");
});

// Show route for displaying a specific activity
router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate({path:"reviews", populate: { path: "author",},}).populate("owner");
    if(!activity) {
        req.flash("error", "Activity you request to does not exist!")
        res.redirect("/activities")
    }
    console.log(activity);
    res.render("./activities/show.ejs", { activity });
}));

// Create route for adding a new activity to the database
router.post("/", isLoggedIn, validateActivity, wrapAsync(async (req, res, next) => {
    const newActivity = new Activity(req.body);
    newActivity.owner = req.user._id;
    await newActivity.save();
    req.flash("success", "New Activity Created");
    res.redirect(`/activities/${newActivity._id}`);
}));

// Edit route for displaying form to edit an existing activity
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    if(!activity) {
        req.flash("error", "Activity you request to does not exist!")
        res.redirect("/activities")
    }
    res.render("./activities/edit.ejs", { activity });
}));

// Update route for saving the edited activity
router.put("/:id", isLoggedIn, isOwner, validateActivity, wrapAsync(async (req, res) => {
    if (!req.body) {
        throw new ExpressError("Invalid Activity Data", 400);
    }
    // const activity = await Activity.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    await Activity.findByIdAndUpdate(id, {...req.body.activity });
    req.flash("success", "Activity Updated");
    // res.redirect(`/activities/${activity._id}`);
    res.redirect(`/activities/${id}`);
}));

// Delete route for deleting an activity
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Activity.findByIdAndDelete(id);
    req.flash("success", "Activity Deleted");
    res.redirect("/activities");
}));

module.exports = router;