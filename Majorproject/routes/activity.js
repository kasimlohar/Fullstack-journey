const express = require("express");
const router = express.Router({ mergeParams: true });
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

// Middleware
const { requireAuth, checkOwnership, validateActivity } = require("../middleware.js");
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
    requireAuth,
    upload.array("images", 5), // Allow multiple images (max 5)
    validateActivity,
    wrapAsync(activityController.createActivity)
  );

/**
 * New Activity Form
 * 
 * GET /activities/new - Show new activity form
 */
router.get("/new", requireAuth, activityController.renderNewForm);

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
    requireAuth,
    checkOwnership,
    upload.array("images", 1),
    validateActivity,
    wrapAsync(activityController.updateActivity)
  )
  .delete(
    requireAuth,
    checkOwnership,
    wrapAsync(activityController.destroyActivity)
  );

/**
 * Edit Activity Form
 * 
 * GET /activities/:id/edit - Show edit form
 */
router.get("/:id/edit",
  requireAuth,
  checkOwnership,
  wrapAsync(activityController.renderEditForm)
);

module.exports = router;