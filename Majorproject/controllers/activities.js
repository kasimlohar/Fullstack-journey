const Activity = require("../models/Activity");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const { cloudinary } = require("../cloudConfig");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// // Improvement Code

module.exports.index = async (req, res) => {
    try {
        const allActivities = await Activity.find({});
        res.render("activities/index.ejs", { 
            allActivities,
            currentUrl: req.originalUrl // Add this line
        });
    } catch (err) {
        req.flash('error', 'Failed to load activities');
        res.redirect('/');
    }
}

module.exports.renderNewForm = (req, res) => {  
    res.render("activities/new.ejs");
};


module.exports.showActivity = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id)
            .populate({
                path: 'reviews',
                populate: { path: 'author' }
            })
            .populate('owner'); // Ensure owner is populated

        if (!activity) {
            req.flash("error", "Activity not found");
            return res.redirect("/activities");
        }

        // Ensure geometry exists
        if (!activity.geometry) {
            activity.geometry = {
                type: 'Point',
                coordinates: [0, 0] // Default coordinates if none exist
            };
        }

        res.render("activities/show", { 
            activity,
            mapToken: process.env.MAP_TOKEN // Pass mapToken to template
        });
        // Check the log in controllers/activities.js
    } catch (err) {
        console.error("Map error:", err);
        req.flash("error", "Failed to load activity");
        res.redirect("/activities");
    }
}

module.exports.createActivity = async (req, res, next) => {
  try {
    // Remove guide required handling
    
    // Process images first
    if (!req.files || !req.files.length) {
      req.flash('error', 'At least one image is required');
      return res.redirect('/activities/new');
    }

    // Create activity with processed data
    const newActivity = new Activity({
      ...req.body,
      images: req.files.map(f => ({
        url: f.path,
        filename: f.filename
      })),
      owner: req.user._id,
      guideRequired: false // Set default value
    });

    // Get location coordinates
    const geoResponse = await geocodingClient.forwardGeocode({
      query: req.body.location,
      limit: 1,
    }).send();

    if (!geoResponse.body.features.length) {
      req.flash('error', 'Invalid location. Please enter a valid location.');
      return res.redirect('/activities/new');
    }

    newActivity.geometry = geoResponse.body.features[0].geometry;
    await newActivity.save();

    req.flash('success', 'Successfully created new activity!');
    res.redirect(`/activities/${newActivity._id}`);
  } catch (err) {
    // ...existing error handling...
  }
};

module.exports.renderEditForm = async (req, res) => {
    try {
      const activity = await Activity.findById(req.params.id);
      if (!activity) {
        req.flash("error", "Activity not found");
        return res.redirect("/activities");
      }

      res.render("activities/edit", { activity });
    } catch (err) {
      req.flash("error", "Failed to load edit form");
      res.redirect("/activities");
    }
}

module.exports.updateActivity = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Fix: Handle guideRequired boolean conversion
        req.body.guideRequired = Boolean(req.body.guideRequired === 'true');
        
        const activity = await Activity.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        // Handle image deletion
        if (req.body.deleteImages) {
            for (let filename of req.body.deleteImages) {
                await cloudinary.uploader.destroy(filename);
            }
            await activity.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
        }

        // Add new images
        const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
        activity.images.push(...imgs);

        // Update other fields
        const updates = { ...req.body };
        delete updates.deleteImages; // Remove deleteImages from updates
        Object.assign(activity, updates);
        
        await activity.save();
        req.flash('success', 'Successfully updated activity!');
        res.redirect(`/activities/${activity._id}`);
    } catch (err) {
        console.error('Update error:', err);
        req.flash('error', 'Error updating activity');
        res.redirect(`/activities/${req.params.id}/edit`);
    }
};

module.exports.destroyActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity.findById(id);
        
        if (!activity) {
            req.flash('error', 'Activity not found');
            return res.redirect('/activities');
        }

        // Delete images from cloudinary first
        if (activity.images && activity.images.length > 0) {
            try {
                await Promise.all(activity.images.map(image => 
                    cloudinary.uploader.destroy(image.filename)
                ));
            } catch (cloudinaryErr) {
                console.error('Error deleting images:', cloudinaryErr);
            }
        }
        
        // Delete the activity and associated reviews
        await Activity.findByIdAndDelete(id);
        
        req.flash('success', 'Successfully deleted activity');
        return res.redirect('/activities');
    } catch (err) {
        console.error('Delete error:', err);
        req.flash('error', 'Error deleting activity');
        return res.redirect(`/activities/${req.params.id}`);
    }
};