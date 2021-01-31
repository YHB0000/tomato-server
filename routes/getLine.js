var express = require('express')
var List = require('../models/TODO/list')
const moment = require('moment')

var router = express.Router()

router.get('/todo/getLine', async (req, res) => {
  const Date = '2021-01-11'
  var createDate = moment(Date + ' 00:00', 'YYYY-MM-DD HH:mm').unix()
  var endDate = moment(Date + ' 03:00', 'YYYY-MM-DD HH:mm').unix()
  var countList = new Array
  var weekData = new Array

  for (let i = 0; i < 56; i = i + 3) {
    createDate = createDate + i * 3600
    endDate = endDate + i * 3600
    countList[i / 3] = await List
      .countDocuments({ createDate: { $gt: createDate.toString(), $lte: endDate.toString() } })
  }

  for (let j = 0; j < 7; j++) {
    let week
    switch (j) {
      case 0:
        week = 'Mon'
        break
      case 1:
        week = 'Tue'
        break
      case 2:
        week = 'Wed'
        break
      case 3:
        week = 'Thu'
        break
      case 4:
        week = 'Fri'
        break
      case 5:
        week = 'Sta'
        break
      case 6:
        week = 'Sun'
        break
    }
    for (let z = 0; z < 8; z++) {
      weekData.push({
        week: week,
        hour: z * 3,
        value: countList[z]
      })
    }
  }

  List
    .find({ endDate: { $gt: createDate, $lte: endDate } })
    .then(ret => {
      res.status(200).json({
        success: true,
        message: 'success',
        data: weekData
      })
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      })
    })

})

module.exports = router