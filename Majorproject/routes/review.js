const express = require("express");
const router = express.Router({ mergeParams: true }); // Make sure mergeParams is true

// Middleware & Utilities
const { validateReview, requireAuth, checkReviewAuthor } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");

// Controllers
const reviewController = require("../controllers/reviews.js");

/**
 * Review Management Routes
 */
router.post("/",
  requireAuth, // Must be logged in
  validateReview, // Validate review data
  wrapAsync(reviewController.createReview)
);

router.delete("/:reviewId",
  requireAuth, // Must be logged in
  checkReviewAuthor, // Must be review author
  wrapAsync(reviewController.destroyReview)  // Make sure this matches the exported method name
);

module.exports = router;