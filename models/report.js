var mongoose = require('mongoose');


var toneSchema = new mongoose.Schema({
  score: Number,
  tone_id: String,
  tone_name: String
})
var toneCategoriesSchema = new mongoose.Schema({
  tones: [toneSchema],
  category_id: String,
  category_name: String
})

var reportSchema = new mongoose.Schema({
  user_id: Number,
  tweetId: {type: Number, unique: true},
  text: String,
  tone_categories: [toneCategoriesSchema],
  created_at: Date,
  updated_at: Date
})

var Report = mongoose.model("Report", reportSchema);

module.exports = Report;
