const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcrypt');
const passport      = require('passport');
const session       = require('express-session');
const User          = require('../models/Users');

passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });
  
  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

  passport.use(new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        // console.log('______++++++++______++++++______++++++______');
        return next(err);
      }
      if (!user) {
        // console.log(':::::_______::::::________::::::________', user);
        // res.redirect('users/user-login-page');
        return next(null, false, { message: "Incorrect username" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        // res.redirect('users/user-login-page');
        return next(null, false, { message: "Incorrect password" });
      }
  
      return next(null, user);
    });
  }));