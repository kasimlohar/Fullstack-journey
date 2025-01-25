// Import required modules
const express = require("express");
// Initialize Express app
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");


const activities = require("./routes/activity.js")
const reviews = require("./routes/review.js")


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


// Root route
app.get("/", (req, res) => {
    res.send("Welcome to the Wanderlust App");
});

 

app.use("/activities", activities)
app.use("/activities/:id/reviews", reviews)


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