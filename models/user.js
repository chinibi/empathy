var mongoose = require('mongoose');
var Report = require('./report');
var schema = mongoose.Schema

var userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  displayName: String,
  reports: [{type: schema.Types.ObjectId, ref: "Report"}]
})

var User = mongoose.model("User", userSchema);

module.exports = User;
