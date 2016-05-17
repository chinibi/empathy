var express = require('express');
var router = express.Router();
var passport = require('passport');

var watsonController = require('../controllers/watson');
var reportController = require('../controllers/report');
var apiController    = require('../controllers/api');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.user });
});



// twitter oauth login
router.get('/login', passport.authenticate('twitter'))

// twitter oauth callback
router.get('/oauthcallback',
  passport.authenticate('twitter', {failureRedirect:'/'}),
  function(req, res) {
    res.redirect('/watson/setup');
  }
);

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

// query page
router.get('/watson/setup', watsonController.authorize)

router.get('/watson/setup/ajax', reportController.reportIndex)

// third party api calls
router.get('/watson', watsonController.analyze)
router.post('/watson/analyze', watsonController.analyze)

// show report from db
router.get('/watson/show/:id', reportController.showReport)

// homegrown api calls
router.get('/api/users/id/:id', apiController.findUserById)
router.get('/api/users/username/:username', apiController.findUserByUsername)
router.get('/api/users/displayname/:displayname', apiController.findUserByDisplayname)
router.get('/api/reports/:id', apiController.findReportById)

module.exports = router;
