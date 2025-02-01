const User = require("../models/user");
const { validatePassword } = require("../utils/validation");

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


//Old Code

// const User = require("../models/user")

// module.exports.renderSignupForm = (req, res) => {
//     res.render("users/signup.ejs")
// }

// module.exports.signup = async(req, res) =>{
//     try{
//         let {username, email, password} = req.body;
//         const newUser = new User({email, username})
//         const registerdUser = await User.register(newUser, password)
//         console.log(registerdUser)
//         req.login(registerdUser, (err) => {
//             if(err) {
//                 return next(err);
//             } 
//             req.flash("success", "Welcome to Wanderlust")
//             res.redirect("/activities");
//         })
//     }catch(e) {
//         req.flash("error", e.message);
//         res.redirect("/signup")
//     }

// }

// module.exports.renderLoginForm = (req, res) => {
//     res.render("users/login.ejs")
// }

// module.exports.login = async(req, res) =>{
//     req.flash("success", "Welcome to Wanderlust You are logged in!")
//     let redirectUrl = res.locals.redirectUrl || "/activities";
//     res.redirect(redirectUrl);
// };


// module.exports.logout = (req, res, next) => {
//     req.logout((err) => {
//         if(err) {
//             return next(err);
//         }
//         req.flash("success", "you are logout noW!")
//         res.redirect("/activities")
//     })
// }
