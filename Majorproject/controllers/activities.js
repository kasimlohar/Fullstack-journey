const Activity = require("../models/Activity");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

/**
 * Activity Controller - Handles all activity-related operations
 * @module controllers/activities
 */

module.exports = {
    /**
     * Display all activities
     */
    index: async (req, res) => {
        try {
            const allActivities = await Activity.find({});
            res.render("./activities/index.ejs", { allActivities });
        } catch (error) {
            req.flash("error", "Failed to load activities");
            res.redirect("/");
        }
    },

    /**
     * Render form for creating new activity
     */
    renderNewForm: (req, res) => {
        res.render("activities/new.ejs");
    },

    /**
     * Display single activity details
     */
    showActivity: async (req, res) => {
        try {
            const { id } = req.params;
            const activity = await Activity.findById(id)
                .populate({
                    path: "reviews",
                    populate: { path: "author" }
                })
                .populate("owner");

            if (!activity) {
                req.flash("error", "Activity not found");
                return res.redirect("/activities");
            }

            res.render("./activities/show.ejs", { activity });
        } catch (error) {
            req.flash("error", "Failed to load activity details");
            res.redirect("/activities");
        }
    },

    /**
     * Create new activity
     */
    createActivity: async (req, res, next) => {
        try {
            // Geocode location
            const geoData = await geocodingClient.forwardGeocode({
                query: req.body.location,
                limit: 1,
            }).send();

            if (!geoData.body.features.length) {
                req.flash("error", "Invalid location");
                return res.redirect("/activities/new");
            }

            // Process image upload
            const { path: url, filename } = req.file;

            // Create new activity
            const newActivity = new Activity({
                ...req.body,
                owner: req.user._id,
                image: { url, filename },
                geometry: geoData.body.features[0].geometry
            });

            await newActivity.save();
            
            req.flash("success", "Successfully created new activity!");
            res.redirect(`/activities/${newActivity._id}`);
        } catch (error) {
            req.flash("error", "Failed to create activity");
            res.redirect("/activities/new");
        }
    },

    /**
     * Render activity edit form
     */
    renderEditForm: async (req, res) => {
        try {
            const { id } = req.params;
            const activity = await Activity.findById(id);

            if (!activity) {
                req.flash("error", "Activity not found");
                return res.redirect("/activities");
            }

            // Generate thumbnail version of image URL
            const originalImageUrl = activity.image.url.replace(
                "/upload", 
                "/upload/w_250"
            );

            res.render("./activities/edit.ejs", { 
                activity, 
                originalImageUrl 
            });
        } catch (error) {
            req.flash("error", "Failed to load edit form");
            res.redirect("/activities");
        }
    },

    /**
     * Update existing activity
     */
    updateActivity: async (req, res) => {
        try {
            const { id } = req.params;
            const activity = await Activity.findByIdAndUpdate(
                id, 
                { ...req.body }, 
                { new: true }
            );

            // Handle image update if new file uploaded
            if (req.file) {
                const { path: url, filename } = req.file;
                activity.image = { url, filename };
                await activity.save();
            }

            req.flash("success", "Successfully updated activity!");
            res.redirect(`/activities/${id}`);
        } catch (error) {
            req.flash("error", "Failed to update activity");
            res.redirect(`/activities/${id}/edit`);
        }
    },

    /**
     * Delete activity
     */
    destroyActivity: async (req, res) => {
        try {
            const { id } = req.params;
            await Activity.findByIdAndDelete(id);
            req.flash("success", "Successfully deleted activity");
            res.redirect("/activities");
        } catch (error) {
            req.flash("error", "Failed to delete activity");
            res.redirect(`/activities/${id}`);
        }
    }
};