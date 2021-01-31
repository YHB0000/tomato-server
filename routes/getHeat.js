var express = require('express')
var List = require('../models/TODO/list')
const moment = require('moment')

var router = express.Router()

router.get('/todo/getHeat', async (req, res) => {
  const Date = '2021-01-12'
  var createDate = moment(Date + ' 00:00', 'YYYY-MM-DD HH:mm').unix()
  var endDate = moment(Date + ' 02:00', 'YYYY-MM-DD HH:mm').unix()
  var countList = new Array
  var dayData = new Array

  for (let i = 0; i < 24; i = i + 2) {
    createDate = createDate + i * 3600
    endDate = endDate + i * 3600
    countList[i / 2] = await List
      .countDocuments({ endDate: { $gt: createDate.toString(), $lte: endDate.toString() } })
    dayData.push({
      endDate: Date + ' ' + i + ':00',
      value: countList[i / 2],
      tag: countList[i / 2] == 0 ? 0 : 1
    })
  }

  List
    .find()
    .then(ret => {
      res.status(200).json({
        success: true,
        message: 'success',
        data: dayData
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