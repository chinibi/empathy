google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawEmotionChart);
google.charts.setOnLoadCallback(drawLanguageChart);
google.charts.setOnLoadCallback(drawSocialChart);

var emotionScore = {},
    writingScore = {},
    socialScore  = {}


function drawEmotionChart() {
  // Define the chart to be drawn.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Emotion');
  data.addColumn('number', 'Probability');
  data.addColumn({type: 'string', role: 'style'})
  data.addRows([
   ['Anger', emotionScore.anger, 'red'],
   ['Disgust', emotionScore.disgust, 'purple'],
   ['Fear', emotionScore.fear, 'black'],
   ['Joy', emotionScore.joy, 'yellow'],
   ['Sadness', emotionScore.sadness, 'blue']
  ]);

  var options = {
    title: 'Emotions',
    legend: {position: 'none'},
    hAxis: {maxValue: 1.0}
  }
  var chart = new google.visualization.BarChart(document.getElementById('emo-chart'));
  chart.draw(data, options);
}

function drawLanguageChart() {
  // Define the chart to be drawn.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Writing Style');
  data.addColumn('number', 'Raw Score');
  data.addColumn({type: 'string', role: 'style'})
  data.addRows([
   ['Analytical', writingScore.analytical, 'red'],
   ['Confident', writingScore.confident, 'purple'],
   ['Tentative', writingScore.tentative, 'black']
  ]);

  var options = {
    title: 'Language Style',
    legend: {position: 'none'},
    hAxis: {maxValue: 1.0}
  }
  var chart = new google.visualization.BarChart(document.getElementById('lang-chart'));
  chart.draw(data, options);
}

function drawSocialChart() {
  // Define the chart to be drawn.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Social Tones');
  data.addColumn('number', 'Raw Score');
  data.addColumn({type: 'string', role: 'style'})
  data.addRows([
   ['Openness', socialScore.openness, 'red'],
   ['Conscientiousness', socialScore.conscientiousness, 'purple'],
   ['Extraversion', socialScore.extraversion, 'black'],
   ['Agreeableness', socialScore.agreeableness, 'yellow'],
   ['Neuroticism', socialScore.neuroticism, 'blue']
  ]);

  var options = {
    title: 'Social Tones',
    legend: {position: 'none'},
    hAxis: {maxValue: 1.0},
    chartArea: {left: 120}
  }
  var chart = new google.visualization.BarChart(document.getElementById('soc-chart'));
  chart.draw(data, options);
}

$.ajax({
  url: '/api/reports/' + window.location.pathname.split('/')[3],
  method: 'GET'
}).then(function(doc){
  // emotion section
  var tones = doc.tone_categories[0].tones
  var emotions = ['anger', 'disgust', 'fear', 'joy', 'sadness']
  emotions.forEach(function(emotion, index) {
    emotionScore[emotion] = tones[index].score
  })

  // language style section
  var style = doc.tone_categories[1].tones
  var langStyles = ['analytical', 'confident', 'tentative']
  langStyles.forEach(function(langStyle, index) {
    writingScore[langStyle] = style[index].score
  })

  // social section
  var soc = doc.tone_categories[2].tones
  var personalities = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism']
  personalities.forEach(function(personality, index) {
    socialScore[personality] = soc[index].score
  })
})

$(window).resize(function() {
  drawEmotionChart()
  drawLanguageChart()
  drawSocialChart()
})
