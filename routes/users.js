var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');

/* GET users listing. */
router.get('/user', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
