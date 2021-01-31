var express = require('express')
var List = require('../models/TODO/list')
const moment = require('moment')

var router = express.Router()

router.get('/todo/getHeat', async (req, res) => {
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
    for (let z = 0; z < 8; z++) {
      weekData.push({
        week: j,
        hour: z,
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