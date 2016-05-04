var mongoose = require('mongoose')
var Report = require("../models/report")

function create (req, res, next) {
  //save jsons from watson
}


function show (req, res, next){
  Report.find({}, (err, data) => {
    res.json(data)
    console.log("find: ", data)
  })
}

function showCalendar(req, res, next) {
  res.render('query')
}

module.exports = {
  show: show,
  showCalendar: showCalendar
}
