require('dotenv').load();
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var User = require('../models/user')

passport.use(new Strategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ 'twitterId': profile.id }, function(err, user) {
      if (err) return cb(err);
      if (user) {
        return cb(null, user);
      } else {
        // we have a new user via OAuth!
        var newUser = new User({
          id: profile.id,
          username: profile.username,
          displayname: profile.displayName
        });
        newUser.save(function(err) {
          if (err) return cb(err);
          return cb(null, newUser);
        });
      }
    });
  }
));

passport.serializeUser(function(user,cb) {
  cb(null, user);
})

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
})
