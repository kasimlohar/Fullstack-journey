const User = require("../models/user");
const { validatePassword } = require("../utils/validation");

// Improve code 

module.exports = {
  renderSignupForm: (req, res) => {
    res.render("users/signup");
  },

  signup: async (req, res) => {
    try {
      const { email, username, password } = req.body;
      
      // Check existing user
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        req.flash("error", "Email or username already exists");
        return res.redirect("/signup");
      }

      // Password validation
      const passwordError = validatePassword(password);
      if (passwordError) {
        req.flash("error", passwordError);
        return res.redirect("/signup");
      }

      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);

      req.login(registeredUser, err => {
        if (err) return next(err);
        req.flash("success", "Welcome to AdventureHub!");
        res.redirect("/activities");
      });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  },

  renderLoginForm: (req, res) => {
    res.render("users/login");
  },

  login: (req, res) => {
    const redirectUrl = res.locals.returnTo || "/activities";
    delete req.session.returnTo;
    req.flash("success", `Welcome back, ${req.user.username}!`);
    res.redirect(redirectUrl);
  },

  logout: (req, res) => {
    req.logout(err => {
      if (err) return next(err);
      req.flash("success", "Successfully logged out!");
      res.redirect("/activities");
    });
  }
};
