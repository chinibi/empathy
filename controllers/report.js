var mongoose = require('mongoose')
var Report = require("../models/report")
var User = require("../models/user")

function showReport(req, res, next) {
  Report.findById(req.params.id, function (err, report) {
    if (err) res.redirect('/')
    else {
      User.findOne({id: report.user_id}, function (err2, user) {
        if (err) res.redirect('/')
        else {
          var id = (req.user ? req.user.id : null)
          res.render('watson', {
            text: report.text,
            user: id,
            reportId: req.params.id,
            title: report.report_name,
            whoseReport: user.displayname
          })
        }
      })
    }
  })
}

var reportIndex = function (req, res) {
  Report.find({user_id: req.user.id}, function (err, reports){
    if (err) {
      res.send(err)
    }
    console.log ("show the reports")
    res.json(reports)
  })
}

function showCalendar(req, res, next) {
  res.render('query')
}

module.exports = {
  showReport: showReport,
  reportIndex: reportIndex,
  showCalendar: showCalendar
}
