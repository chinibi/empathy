require('dotenv').load();
var Twitter = require('twitter');
var locus = require('locus');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESSTOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESSTOKEN_SECRET
});

// var params = {
//   screen_name: req.user.username,
//   count: 1
// };

function show(req, res, next) {
  client.get('statuses/user_timeline', {screen_name: req.user.username, count: 2}, function(err, tweets, resp) {
    if (err) { console.log(err); res.json(err) }
    else {
      var tweetData = JSON.parse(resp.body)
      res.json(tweetData)
    }
  })
}

module.exports = {
  show: show
}
