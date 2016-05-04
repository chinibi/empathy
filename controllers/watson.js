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

function textAnalyze(req, res, next) {
  tone_analyzer.tone({ text: 'Greetings from Watson Developer Cloud!'}, function(err, tone) {
    if (err) console.log(err);
    else {
      res.send(JSON.stringify(tone, null, 2))
    }
  })
}

var tone_analyzer = watson.tone_analyzer({
  username: process.env.USERNAME_WATSON,
  password: process.env.PASSWORD_WATSON,
  version:  'v3-beta',
  version_date: '2016-02-11'
});


function index(req, res, next) {
  res.render('watson')
}

function analyze(req, res, next) {
  // get tweet
  client.get('statuses/user_timeline', {screen_name: req.user.username, count: 1}, function(err, tweets, resp) {
    if (err) console.log(err)
    else {
      // plug tweet into watson
      var tweetData = JSON.parse(resp.body)[0]
      tone_analyzer.tone({ text: tweetData.text}, function(err, tone) {
        if (err) console.log(err);
        else {
          // get desired data from returned json
          var result = tone.document_tone.tone_categories
          // save result to data base
          var newReport = new Report({
          user_id: req.user.id,
          tweetId: tweetData.id,
          text: tweetData.text,
          tone_categories: result
        });
          makeReport(tweetData.id, newReport)
          res.render('watson', {
            text: tweetData.text,
            result: result[0].tones
          })
        }
      })
    }
  })
}

function analyzeAll(req, res, next) {
  client.get('statuses/user_timeline', {screen_name: req.user.username}, function(err, tweets, resp) {
    if (err) console.log(err)
    else {
      var tweetData = JSON.parse(resp.body)
      tweetData.forEach((tweet) => {
        tone_analyzer.tone({text: tweet.text}, (err, tone) => {
          if (err) console.log(err)
          else {
            var result = tone.document_tone.tone_categories
            var newReport = new Report({
              user_id: req.user.id,
              tweetId: tweet.id,
              text: tweet.text,
              tone_categories: result
            })
            makeReport(tweet.id, newReport)
            console.log('watson success')
          }
        })
      })
      res.redirect("/")
    }
  })
}



// wrapper functions for analyze and analyzeAll
function makeReport(userId, newEntry) {
  Report.findOne({ 'tweetId': userId }, function (err, report){
    if(!report) {
      newEntry.save(function(err) {
        if (err){
          return (console.log (err));
        }
        else return (console.log('saved to db'))
      });
    }
  })
}

function dateRange(tweet) {
  var since = new Date('2016-02-01')
  var until = new Date('2016-03-01')
  var createdAt = new Date(tweet.created_at)
  return ( createdAt > since && createdAt < until)
}


// watson testing
var text = "hey guys hows it goin kripparrian here"

function test(req, res, next) {
  tone_analyzer.tone({text: text}, function(err, tone) {
    if (err) console.log(err);
    else res.json(tone)
  })
}

var textArr = ["help me", "hi my name is bill", "what the fuck did you just fucking say to me you little bitch?", "that's gross man"]
function testTen(req, res, next) {
  var json = []
  textArr.forEach(function(text) {
    tone_analyzer.tone({text: text}, function(err, tone) {
      if (err) console.log(err);
      else {
        console.log("success: " + text)
        console.log("anger: " + tone.document_tone.tone_categories[0].tones[0].score)
        console.log("disgust: " + tone.document_tone.tone_categories[0].tones[1].score)
        console.log("fear: " + tone.document_tone.tone_categories[0].tones[2].score)
        console.log("joy: " + tone.document_tone.tone_categories[0].tones[3].score)
        console.log("sadness: " + tone.document_tone.tone_categories[0].tones[4].score)
        json.push(tone)
      }
    })
  })
  res.json({text: 'hello'})
}

module.exports = {
  index: index,
  analyze: analyze,
  test: test,
  testTen: testTen,
  analyzeAll: analyzeAll
}
