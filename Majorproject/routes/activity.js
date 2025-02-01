const express = require("express");
const router = express.Router({ mergeParams: true });
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

// Middleware
const { isLoggedIn, isOwner, validateActivity } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");

// Controllers
const activityController = require("../controllers/activities.js");

/** 
 * Activity Routes
 * 
 * GET /activities - List all activities
 * POST /activities - Create new activity
 */
router.route("/")
  .get(wrapAsync(activityController.index))
  .post(
    isLoggedIn,
    upload.array("images", 5), // Allow multiple images (max 5)
    validateActivity,
    wrapAsync(activityController.createActivity)
  );

/**
 * New Activity Form
 * 
 * GET /activities/new - Show new activity form
 */
router.get("/new", isLoggedIn, activityController.renderNewForm);

/**
 * Activity CRUD Operations
 * 
 * GET /activities/:id - Show activity details
 * PUT /activities/:id - Update activity
 * DELETE /activities/:id - Delete activity
 */
router.route("/:id")
  .get(wrapAsync(activityController.showActivity))
  .put(
    isLoggedIn,
    isOwner,
    upload.array("images", 5),
    validateActivity,
    wrapAsync(activityController.updateActivity)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(activityController.destroyActivity)
  );

/**
 * Edit Activity Form
 * 
 * GET /activities/:id/edit - Show edit form
 */
router.get("/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(activityController.renderEditForm)
);

module.exports = router;