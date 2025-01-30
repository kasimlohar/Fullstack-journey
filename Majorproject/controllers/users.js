const User = require("../models/user")

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs")
}

module.exports.signup = async(req, res) =>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username})
        const registerdUser = await User.register(newUser, password)
        console.log(registerdUser)
        req.login(registerdUser, (err) => {
            if(err) {
                return next(err);
            } 
            req.flash("success", "Welcome to Wanderlust")
            res.redirect("/activities");
        })
    }catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup")
    }

}

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs")
}

module.exports.login = async(req, res) =>{
    req.flash("success", "Welcome to Wanderlust You are logged in!")
    let redirectUrl = res.locals.redirectUrl || "/activities";
    res.redirect(redirectUrl);
};


module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "you are logout noW!")
        res.redirect("/activities")
    })
}
