// grab tweets then put them through watson

require('dotenv').load();
var Twitter = require('twitter');
var watson = require('watson-developer-cloud');
var locus = require('locus');
var Report = require('../models/report');
var User = require('../models/user');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESSTOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESSTOKEN_SECRET
});

var tone_analyzer = watson.tone_analyzer({
  username: process.env.USERNAME_WATSON,
  password: process.env.PASSWORD_WATSON,
  version:  'v3-beta',
  version_date: '2016-02-11'
});

function authorize(req, res, next) {
  if (!req.user) res.redirect("/login")
  else {
    res.render('query', { error: null, user: req.user })
  }
}

function twitterPromise(username) {
  return (new Promise(function(resolve, reject) {
    // promise to grab tweets
    client.get('statuses/user_timeline', {screen_name: username}, function (err, tweets, resp) {
      if (err) reject(err)
      else resolve(resp.body)
    })
  }))
}

function watsonPromise(str) {
  return (new Promise(function(resolve, reject) {
    // promise to get analysis from Watson
    tone_analyzer.tone({text: str}, function(err2, tone) {
      if (err2) reject(err2)
      else resolve(tone)
    })
  }))
}

function analyze(req, res, next) {
  var queryDate = req.body.daterange.split(" - ")

  twitterPromise(req.user.username)
    .then(tweets => {
      var tweetData = JSON.parse(tweets)
      // filter tweets to date range
      var wantedData = tweetData.filter(tweet => {
        var createdAt = new Date(tweet.created_at)
        var since = new Date(queryDate[0])
        var until = new Date(queryDate[1])
        return (createdAt > since && createdAt < until)
      })
      // concatenate tweets into one string
      var textString = ''
      wantedData.forEach(tweet => {
        textString += `${tweet.text}. `
      })
      // plug textString into Watson engine
      return watsonPromise(textString)
    }, (err) => { // if twitterPromise was rejected
      console.log(err)
      res.redirect('/')
    })
    .then(tone => {
      var newReport = new Report({
        user_id: req.user.id,
        report_name: `${queryDate[0]} to ${queryDate[1]}`,
        created_at: Date.now(),
        tone_categories: tone.document_tone.tone_categories
      })
      newReport.save()
      res.redirect(`/watson/show/${newReport._id}`)
    }, (err) => { // if watsonPromise was rejected
      console.log(err)
      res.render('query', {user: req.user.id, error: err})
    })
};

module.exports = {
  authorize: authorize,
  analyze: analyze
}
