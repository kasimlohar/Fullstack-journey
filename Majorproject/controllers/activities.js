const Activity = require("../models/Activity");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const { cloudinary } = require("../cloudConfig");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// // Improvement Code

module.exports.index = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      
      const activities = await Activity.paginate({}, {
        page,
        limit,
        sort: '-createdAt',
        populate: 'owner'
      });

      res.render("activities/index", { 
        activities,
        currentPage: page,
        totalPages: Math.ceil(activities.total / limit)
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

module.exports.createActivity = async (req, res) => {
    try {
      const geoData = await geocodingClient.forwardGeocode({
        query: req.body.location,
        limit: 1
      }).send();

      if (!geoData.body.features.length) {
        req.flash('error', 'Invalid location');
        return res.redirect('/activities/new');
      }

      const images = req.files.map(file => ({
        url: file.path,
        filename: file.filename
      }));

      const activityData = {
        ...req.body,
        geometry: geoData.body.features[0].geometry,
        owner: req.user._id,
        images
      };

      const activity = await Activity.create(activityData);
      req.flash("success", "Successfully created new activity!");
      res.redirect(`/activities/${activity._id}`);
    } catch (err) {
      // Cleanup uploaded files on error
      if (req.files) {
        await Promise.all(req.files.map(file => 
          cloudinary.uploader.destroy(file.filename)
        ));
      }
      req.flash("error", err.message);
      res.redirect("/activities/new");
    }
}

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