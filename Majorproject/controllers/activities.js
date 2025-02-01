const Activity = require("../models/Activity")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken});

module.exports.index = async (req, res) => {
    const allActivities = await Activity.find({});
    res.render("./activities/index.ejs", { allActivities });
};

module.exports.renderNewForm = (req, res) => {
    
    res.render("activities/new.ejs");
};


module.exports.showActivity = async (req, res) => {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate({path:"reviews", populate: { path: "author",},}).populate("owner");
    if(!activity) {
        req.flash("error", "Activity you request to does not exist!")
        res.redirect("/activities")
    }
    console.log(activity);
    res.render("./activities/show.ejs", { activity });
}

module.exports.creatActivity = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.location,
        limit: 1,
      })
        .send()

    let url = req.file.path;
    let filename = req.file.filename;
    
    const newActivity = new Activity(req.body);
    newActivity.owner = req.user._id;
    newActivity.image = {url, filename};

    newActivity.geometry = response.body.features[0].geometry;

    let savedActivity = await newActivity.save();
    console.log(savedActivity)
    
    await newActivity.save();
    req.flash("success", "New Activity Created");
    res.redirect(`/activities/${newActivity._id}`);
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    if(!activity) {
        req.flash("error", "Activity you request to does not exist!")
        res.redirect("/activities")
    }
    let originalImageUrl = activity.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("./activities/edit.ejs", { activity, originalImageUrl });
}

module.exports.updateActivity = async (req, res) => {
    const { id } = req.params; // Ensure id is extracted

    if (!req.body) {
        req.flash("error", "Invalid Activity Data");
        return res.redirect(`/activities/${id}/edit`);
    }

    let activity = await Activity.findByIdAndUpdate(id, { ...req.body });
    console.log(activity)
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        activity.image = {url , filename}
        await activity.save();
    }
    req.flash("success", "Activity Updated");
    res.redirect(`/activities/${id}`);
};


module.exports.destroyActivity = async (req, res) => {
    const { id } = req.params;
    await Activity.findByIdAndDelete(id);
    req.flash("success", "Activity Deleted");
    res.redirect("/activities");
}
