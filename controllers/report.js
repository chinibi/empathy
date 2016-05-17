var mongoose = require('mongoose')
var Report = require("../models/report")
var User = require("../models/user")

function showReport(req, res, next) {
  var findReport = {
    data: null,
    promise: Report.findById(req.params.id).exec()
  }

  findReport.promise
    .then((report) => {
      findReport.data = report
      return User.findOne({id: report.user_id}).exec()
    }, (err) => res.redirect('/'))
    .then((user) => {
      res.render('watson', {
        text: findReport.data.text,
        user: (req.user ? req.user.id : null),
        reportId: req.params.id,
        title: findReport.data.report_name,
        whoseReport: user.displayname
      })
    }, (err) => res.redirect('/'))
}

var reportIndex = function (req, res) {
  Report.find({user_id: req.user.id}, function (err, reports){
    if (err) {
      res.send(err)
    }
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
