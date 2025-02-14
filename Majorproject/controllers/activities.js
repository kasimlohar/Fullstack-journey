const Activity = require("../models/Activity");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const { cloudinary } = require("../cloudConfig");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// // Improvement Code

module.exports.index = async (req, res) => {
    try {
      const allActivities = await Activity.find({});
      res.render("./activities/index.ejs", { allActivities });

      
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

        res.render("activities/show", { 
            activity,
            averageRating: activity.averageRating,
            currUser: req.user // Explicitly pass current user
        });
    } catch (err) {
        req.flash("error", "Failed to load activity");
        res.redirect("/activities");
    }
}

module.exports.createActivity = async (req, res, next) => {
  try {
    // Convert guideRequired to boolean
    req.body.guideRequired = req.body.guideRequired === 'true';
    
    // Validate location first
    const geoResponse = await geocodingClient.forwardGeocode({
      query: req.body.location,
      limit: 1,
    }).send();

    if (!geoResponse.body.features.length) {
      req.flash('error', 'Invalid location. Please enter a valid location.');
      return res.redirect('/activities/new');
    }

    const newActivity = new Activity(req.body);
    newActivity.owner = req.user._id;
    newActivity.geometry = geoResponse.body.features[0].geometry;

    // Process uploaded images
    if (!req.files || !req.files.length) {
      throw new Error('At least one image is required');
    }

    newActivity.images = req.files.map(file => ({
      url: file.path,
      filename: file.filename
    }));

    await newActivity.save();
    req.flash("success", "Successfully created new activity!");
    res.redirect(`/activities/${newActivity._id}`);
  } catch (err) {
    if (req.files) {
      // Cleanup uploaded files on error
      await Promise.all(req.files.map(f => cloudinary.uploader.destroy(f.filename)));
    }
    console.error('Activity creation error:', err);
    req.flash("error", err.message || "Error creating activity");
    res.redirect("/activities/new");
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
        
        // Convert guideRequired to boolean
        req.body.guideRequired = req.body.guideRequired === 'true';
        
        const activity = await Activity.findById(id);

        if (!activity) {
            req.flash('error', 'Cannot find that activity!');
            return res.redirect('/activities');
        }

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

        // Delete images from cloudinary
        for (let image of activity.images) {
            await cloudinary.uploader.destroy(image.filename);
        }
        
        await Activity.findByIdAndDelete(id);
        req.flash('success', 'Successfully deleted activity');
        res.redirect('/activities');
    } catch (err) {
        console.error('Delete error:', err);
        req.flash('error', 'Error deleting activity');
        res.redirect(`/activities/${req.params.id}`);
    }
};