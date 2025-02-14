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
        .populate('owner');

      if (!activity) {
        req.flash("error", "Activity not found");
        return res.redirect("/activities");
      }

      res.render("activities/show", { 
        activity,
        averageRating: activity.averageRating 
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
      const activity = await Activity.findById(req.params.id);
      if (!activity) {
        req.flash("error", "Activity not found");
        return res.redirect("/activities");
      }

      // Update images
      const newImages = req.files.map(file => ({
        url: file.path,
        filename: file.filename
      }));
      activity.images.push(...newImages);

      // Delete selected images
      if (req.body.deleteImages) {
        await Promise.all(req.body.deleteImages.map(async filename => {
          await cloudinary.uploader.destroy(filename);
          activity.images = activity.images.filter(
            img => img.filename !== filename
          );
        }));
      }

      Object.assign(activity, req.body);
      await activity.save();

      req.flash("success", "Successfully updated activity!");
      res.redirect(`/activities/${activity._id}`);
    } catch (err) {
      req.flash("error", "Failed to update activity");
      res.redirect(`/activities/${req.params.id}/edit`);
    }
}


module.exports.destroyActivity = async (req, res) => {
    try {
      const activity = await Activity.findById(req.params.id);
      
      // Delete associated images
      await Promise.all(activity.images.map(async image => {
        await cloudinary.uploader.destroy(image.filename);
      }));

      await activity.deleteOne();
      req.flash("success", "Successfully deleted activity");
      res.redirect("/activities");
    } catch (err) {
      req.flash("error", "Failed to delete activity");
      res.redirect(`/activities/${req.params.id}`);
    }
}