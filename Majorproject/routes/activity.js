const express = require("express");
const router = express.Router({ mergeParams: true });
const multer = require("multer");
const { storage } = require("../cloudConfig.js");

// Update image upload configuration
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit per file
        files: 5 // Max 5 files
    },
    fileFilter: (req, file, cb) => {
        // Accept only images
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.mimetype)) {
            cb(new Error('Only JPG and PNG images are allowed!'), false);
            return;
        }
        cb(null, true);
    }
});

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
    upload.array("images", 5),
    validateActivity,
    wrapAsync(activityController.updateActivity)
  )
  .delete(
    requireAuth,
    checkOwnership, // Ensures only owner can delete
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