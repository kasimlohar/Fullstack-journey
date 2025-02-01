const express = require("express");
const router = express.Router({ mergeParams: true });

// Middleware & Utilities
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");

// Controllers
const reviewController = require("../controllers/reviews.js");

/**
 * Review Management Routes
 */
router.post("/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

router.delete("/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;