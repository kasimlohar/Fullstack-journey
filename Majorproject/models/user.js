const mongoose = require("mongoose");
const validator = require("validator");
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: v => validator.isEmail(v),
      message: "Invalid email format"
    }
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    minlength: [3, "Username must be at least 3 characters"],
    maxlength: [30, "Username cannot exceed 30 characters"],
    match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"]
  },
  role: {
    type: String,
    enum: ["user", "guide", "admin"],
    default: "user"
  },
  firstName: {
    type: String,
    trim: true,
    maxlength: [50, "First name cannot exceed 50 characters"]
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: [50, "Last name cannot exceed 50 characters"]
  },
  avatar: {
    type: String,
    validate: {
      validator: v => validator.isURL(v, { protocols: ["http", "https"] }),
      message: "Invalid avatar URL"
    }
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"]
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date,
  lastLogin: Date
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      delete ret.salt;
      delete ret.__v;
      return ret;
    }
  }
});

// Remove the password hashing middleware

// Account locking for failed attempts
userSchema.virtual("isLocked").get(function() {
  return this.lockUntil && this.lockUntil > Date.now();
});

userSchema.methods.incrementLoginAttempts = function() {
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.update({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  if (this.loginAttempts + 1 >= 5) {
    updates.$set = { lockUntil: Date.now() + 15 * 60 * 1000 }; // 15 minute lock
  }
  
  return this.update(updates);
};

userSchema.plugin(passportLocalMongoose, {
  usernameField: "username", // Change this from email to username
  limitAttempts: true,
  maxAttempts: 5,
  unlockInterval: 15 * 60 * 1000, // 15 minutes
  errorMessages: {
    UserExistsError: 'A user with the given username already exists',
    IncorrectPasswordError: 'Password is incorrect',
    IncorrectUsernameError: 'Username is incorrect',
    MissingPasswordError: 'No password was given',
    AttemptTooSoonError: 'Account is currently locked. Try again later'
  }
});

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ createdAt: 1 });

module.exports = mongoose.model("User", userSchema);