const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js");
const Activity = require("../models/Activity.js");
const {isLoggedIn, isOwner, validateActivity} = require("../middleware.js")

const activitycontroller = require("../controllers/activities.js")
const renderNewForm = require("../controllers/activities.js")
const showActivity = require("../controllers/activities.js")
const multer = require("multer")
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage})



router
.route("/")
.get( wrapAsync(activitycontroller.index))
.post( isLoggedIn, upload.single("activity[image]"), validateActivity, wrapAsync(activitycontroller.creatActivity)); 

// New route for displaying form to add a new activity
router
.route("/new")
.get( isLoggedIn, activitycontroller.renderNewForm);

router
.route("/:id")
.get( wrapAsync(activitycontroller.showActivity))
.put( isLoggedIn, isOwner, upload.single("activity[image]"), validateActivity, wrapAsync(activitycontroller.updateActivity))
.delete( isLoggedIn, isOwner, wrapAsync(activitycontroller.destroyActivity));




// Edit route for displaying form to edit an existing activity
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(activitycontroller.renderEditForm));


module.exports = router;