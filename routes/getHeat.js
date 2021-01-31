var express = require('express')
var List = require('../models/TODO/list')
const moment = require('moment')

var router = express.Router()

router.get('/todo/getHeat', async (req, res) => {
  const Date = '2021-01-11'
  var createDate = moment(Date + ' 00:00', 'YYYY-MM-DD HH:mm').unix()
  var endDate = moment(Date + ' 02:00', 'YYYY-MM-DD HH:mm').unix()
  var countList = new Array
  // var arr2 = new Array
  var dayData = new Array
  var weekData = new Array

  for (let i = 0; i < 12; i = i + 2) {
    createDate = createDate + i * 3600
    endDate = endDate + i * 3600
    countList[i / 2] = await List
      .countDocuments({ createDate: { $gt: createDate.toString(), $lte: endDate.toString() } })
    // arr2[i / 7200] = await List
    //   .find({ createDate: { $gt: createDate.toString(), $lte: endDate.toString() } }, 'isFinish -_id')
  }

  for (let j = 0; j < 12; j++) {
    dayData.push({
      endDate: Date + ' ' + (j * 2) + ':00',
      value: countList[j],
      tag: countList[j] == 0 ? 0 : 1
    })
  }

  List
    .find({ endDate: { $gt: createDate, $lte: endDate } })
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