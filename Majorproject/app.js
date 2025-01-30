if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

// Import required modules
const express = require("express");
// Initialize Express app
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js")
const activityRouter = require("./routes/activity.js")
const reviewRouter = require("./routes/review.js")
const userRouter = require("./routes/user.js")

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

const sessionOptions = {
    secret: "mySuperSeceretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
}

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to the Wanderlust App");
});


app.use(session(sessionOptions))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();

})



// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "kasim-lohar",
//     });

//     let registerdUser = await User.register( fakeUser, "helloworld");
//     res.send(registerdUser)
// })
 

app.use("/activities", activityRouter);
app.use("/activities/:id/reviews", reviewRouter);
app.use("/", userRouter);


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