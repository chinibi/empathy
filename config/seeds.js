var Report = require('../models/report')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/SENTiment');

  var test1 = {
    "tone_categories": [
      {
        "tones": [
          {
            "score": 0.044088,
            "tone_id": "anger",
            "tone_name": "Anger"
          },
          {
            "score": 0.037138,
            "tone_id": "disgust",
            "tone_name": "Disgust"
          },
          {
            "score": 0.055596,
            "tone_id": "fear",
            "tone_name": "Fear"
          },
          {
            "score": 0.612591,
            "tone_id": "joy",
            "tone_name": "Joy"
          },
          {
            "score": 0.134836,
            "tone_id": "sadness",
            "tone_name": "Sadness"
          }
        ],
        "category_id": "emotion_tone",
        "category_name": "Emotion Tone"
      },
      {
        "tones": [
          {
            "score": 0,
            "tone_id": "analytical",
            "tone_name": "Analytical"
          },
          {
            "score": 0,
            "tone_id": "confident",
            "tone_name": "Confident"
          },
          {
            "score": 0,
            "tone_id": "tentative",
            "tone_name": "Tentative"
          }
        ],
        "category_id": "writing_tone",
        "category_name": "Writing Tone"
      },
      {
        "tones": [
          {
            "score": 0.385,
            "tone_id": "openness_big5",
            "tone_name": "Openness"
          },
          {
            "score": 0.978,
            "tone_id": "conscientiousness_big5",
            "tone_name": "Conscientiousness"
          },
          {
            "score": 0.149,
            "tone_id": "extraversion_big5",
            "tone_name": "Extraversion"
          },
          {
            "score": 0.341,
            "tone_id": "agreeableness_big5",
            "tone_name": "Agreeableness"
          },
          {
            "score": 0.192,
            "tone_id": "neuroticism_big5",
            "tone_name": "Emotional Range"
          }
        ],
        "category_id": "social_tone",
        "category_name": "Social Tone"
      }
    ]
  };

  Report.create(test1, function(err, report) {
    if (err) {
      console.log (err);
    } else {
      console.log("Database seeded");
    }
    process.exit();
  })
