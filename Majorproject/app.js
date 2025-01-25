// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
// const mongoSanitize = require("express-mongo-sanitize");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { activitySchema, reviewSchema } = require("./schema.js");
const Activity = require("./models/Activity.js");
const Review = require("./models/review.js");

// Initialize Express app
const app = express();

// Environment variables
const port = process.env.PORT || 8080;
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/wanderlust";

// MongoDB connection
async function main() {
    try {
        await mongoose.connect(mongoURI, {
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
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

// // Security middleware
// app.use(helmet());

// Rate limiting
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // Limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// // Sanitize user input
// app.use(mongoSanitize());

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to the Wanderlust App");
});

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

// Middleware to validate review data using Joi schema
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(errMsg, 400);
    } else {
        next();
    }
};

// app.use((req, res, next) => {
//     res.setHeader(
//       "Content-Security-Policy",
//       "default-src 'self'; img-src 'self' https://images.unsplash.com data:; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' https://cdn.jsdelivr.net; font-src 'self';"
//     );
//     next();
// });


// Index route for displaying all activities
app.get("/activities", wrapAsync(async (req, res) => {
    const allActivities = await Activity.find({});
    res.render("./activities/index.ejs", { allActivities });
}));

// New route for displaying form to add a new activity
app.get("/activities/new", (req, res) => {
    res.render("activities/new.ejs");
});

// Show route for displaying a specific activity
app.get("/activities/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate("reviews");
    res.render("./activities/show.ejs", { activity });
}));

// Create route for adding a new activity to the database
app.post("/activities", validateActivity, wrapAsync(async (req, res, next) => {
    const newActivity = new Activity(req.body);
    await newActivity.save();
    res.redirect(`/activities/${newActivity._id}`);
}));

// Edit route for displaying form to edit an existing activity
app.get("/activities/:id/edit", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    res.render("./activities/edit.ejs", { activity });
}));

// Update route for saving the edited activity
app.put("/activities/:id", validateActivity, wrapAsync(async (req, res) => {
    if (!req.body) {
        throw new ExpressError("Invalid Activity Data", 400);
    }
    const { id } = req.params;
    const activity = await Activity.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/activities/${activity._id}`);
}));

// Delete route for deleting an activity
app.delete("/activities/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Activity.findByIdAndDelete(id);
    res.redirect("/activities");
}));

// Reviews
// POST route for adding a review to an activity
app.post("/activities/:id/reviews", validateReview, wrapAsync(async (req, res) => {
    const activity = await Activity.findById(req.params.id);
    const newReview = new Review(req.body.review);

    activity.reviews.push(newReview);
    await newReview.save();
    await activity.save();
    res.redirect(`/activities/${activity._id}`);
}));

// DELETE route for deleting a review
app.delete("/activities/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Activity.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/activities/${id}`);
}));

// Test route to check database contents
app.get("/test", wrapAsync(async (req, res) => {
    const activities = await Activity.find({});
    res.json(activities);
}));

// Catch-all route for 404 errors
app.all("*", (req, res, next) => {
    next(new ExpressError("Page not found", 404));
});

// Error handling middleware
app.use((err, req, res, next) => {
    let { message = "Something went wrong", statusCode = 500 } = err;

    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
        message = Object.values(err.errors).map((el) => el.message).join(",");
        statusCode = 400;
    }

    // Handle duplicate key errors
    if (err.code === 11000) {
        message = "Duplicate field value entered";
        statusCode = 400;
    }

    res.status(statusCode).render("error.ejs", { message });
});

 
// Server Setup
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});