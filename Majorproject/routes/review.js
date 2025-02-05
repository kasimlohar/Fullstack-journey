const express = require("express");
const router = express.Router({ mergeParams: true });

// Middleware & Utilities
const { validateReview, requireAuth, checkReviewAuthor } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");

// Controllers
const reviewController = require("../controllers/reviews.js");

/**
 * Review Management Routes
 */
router.post("/",
  requireAuth,
  checkReviewAuthor,
  wrapAsync(reviewController.createReview)
);

router.delete("/:reviewId",
  requireAuth,
  checkReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;