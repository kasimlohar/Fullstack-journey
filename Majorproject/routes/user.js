const express = require("express");
const router = express.Router();
const passport = require("passport");
const rateLimit = require("express-rate-limit");

// Middleware & Utilities
const { preserveReturnTo } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const userController = require("../controllers/users.js");

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per window
  message: "Too many attempts, please try again later"
});

/**
 * User Authentication Routes
 */
router.route("/signup")
  .get(userController.renderSignupForm)
  .post(
    authLimiter,
    wrapAsync(userController.signup)
  );

router.route("/login")
  .get(userController.renderLoginForm)
  .post(
    authLimiter,
    preserveReturnTo,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: "Invalid email or password",
      keepSessionInfo: true
    }),
    userController.login
  );

/**
 * User Session Management
 */
router.get("/logout", userController.logout);

module.exports = router;