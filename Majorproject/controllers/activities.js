const Activity = require("../models/Activity")


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
    let url = req.file.path;
    let filename = req.file.filename;
    
    const newActivity = new Activity(req.body);
    newActivity.owner = req.user._id;
    newActivity.image = {url, filename};
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
    res.render("./activities/edit.ejs", { activity });
}

module.exports.updateActivity = async (req, res) => {
    const { id } = req.params; // Ensure id is extracted

    if (!req.body) {
        req.flash("error", "Invalid Activity Data");
        return res.redirect(`/activities/${id}/edit`);
    }

    const updatedActivity = await Activity.findByIdAndUpdate(id, { ...req.body }, { new: true });
    console.log("Updated activity:", updatedActivity);

    req.flash("success", "Activity Updated");
    res.redirect(`/activities/${id}`);
};


module.exports.destroyActivity = async (req, res) => {
    const { id } = req.params;
    await Activity.findByIdAndDelete(id);
    req.flash("success", "Activity Deleted");
    res.redirect("/activities");
}
