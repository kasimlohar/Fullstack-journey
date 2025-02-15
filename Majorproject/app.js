/* --------------------------
   Environment Configuration
   -------------------------- */
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

/* --------------------------
Core Dependencies
-------------------------- */
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const { rateLimit } = require("express-rate-limit");

/* --------------------------
  Custom Modules
  -------------------------- */
const ExpressError = require("./utils/ExpressError");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

/* --------------------------
  Route Imports
  -------------------------- */
const activityRouter = require("./routes/activity");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");

/* --------------------------
  Initialization
  -------------------------- */
const app = express();

/* --------------------------
   Environment Variables
   -------------------------- */
const port = process.env.PORT || 8080;
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/wildspire";
const SESSION_SECRET = process.env.SESSION_SECRET || "wildspireSecret";

/* --------------------------
   Database Connection
   -------------------------- */
   async function connectDB() {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ Connected to MongoDB");
    } catch (err) {
      console.error("❌ MongoDB connection error:", err);
      process.exit(1);
    }
  }
  
  connectDB();
/* --------------------------
View Engine Configuration
-------------------------- */
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* --------------------------
Middleware Stack
-------------------------- */
// Security Middleware
// app.use(helmet());
// app.use(mongoSanitize());

// Rate Limiting - Adjust these values to be more lenient
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Increased from 100 to 1000 requests per window
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
    // Add skip function for development
    skip: () => process.env.NODE_ENV === 'development'
});

// Only apply rate limiting to API routes if needed
app.use('/api', limiter); // Apply to API routes only
// Remove or comment out the global rate limiter
// app.use(limiter);

// Static Assets
app.use(express.static(path.join(__dirname, "public")));

// Request Parsing
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Session Configuration
const sessionConfig = {
  name: "adventureSession",
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};
app.use(session(sessionConfig));

// Flash Messages
app.use(flash());

// Authentication Setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Local Variables Middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    res.locals.currentUrl = req.originalUrl; // Add this line for hero section visibility
    next();
});

/* --------------------------
Route Handlers
-------------------------- */
app.use("/activities", activityRouter);
app.use("/activities/:id/reviews", reviewRouter);
app.use("/", userRouter);

/* --------------------------
   Error Handling
   -------------------------- */
// 404 Handler
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// Global Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  
  // Handle Mongoose Errors
  if (err.name === "ValidationError") {
    err.message = Object.values(err.errors).map(val => val.message).join(", ");
    err.statusCode = 400;
  }
  
  if (err.code === 11000) {
    err.message = "Duplicate field value entered";
    err.statusCode = 400;
  }

  // Development vs Production error handling
  if (process.env.NODE_ENV === "development") {
    console.error("💥 Error Stack:", err.stack);
  }

  res.status(statusCode).render("error", { 
    message: err.message,
    statusCode,
    stack: process.env.NODE_ENV === "development" ? err.stack : null
  });
});

/* --------------------------
Server Initialization
-------------------------- */
app.listen(port, () => {
console.log(`🚀 Server running on port ${port}`);
console.log(`🌐 Environment: ${process.env.NODE_ENV || "development"}`);
});