var express = require('express')
var List = require('../models/TODO/list')
const moment = require('moment')

var router = express.Router()

router.get('/todo/getBar', async (req, res) => {
  // const Date = '2021-01-11';
  let Date = req.query.day;
  // const Date = req.query.day
  var createDate = moment(Date + ' 00:00', 'YYYY-MM-DD HH:mm').unix()
  var endDate = moment(Date + ' 02:00', 'YYYY-MM-DD HH:mm').unix()
  var doneList = new Array
  var undoneList = new Array
  var dayData = new Array

  for (let i = 0; i < 24; i = i + 2) {
    createDate = createDate + i * 3600
    endDate = endDate + i * 3600
    doneList[i / 2] = await List
      .countDocuments({
        $and: [{
          createDate: { $gt: createDate.toString(), $lte: endDate.toString() }
        }, {
          isFinish: true
        }]
      })
    undoneList[i / 2] = await List
      .countDocuments({
        $and: [{
          createDate: { $gt: createDate.toString(), $lte: endDate.toString() }
        }, {
          isFinish: false
        }]
      })
  }
  console.log(doneList)

  for (let z = 0; z < 2; z++) {
    for (let j = 0; j < 12; j++) {
      dayData.push({
        date: Date + ' ' + (j < 5 ? '0' + j * 2 : j * 2) + ':00',
        value: z == 0 ? doneList[j] : undoneList[j],
        name: z == 0 ? '完成' : '未完成'
      })
    }
  }

  List
    .find()
    .then(ret => {
      res.status(200).json({
        success: true,
        message: 'success',
        data: dayData
      })
      console.log('todo/getBar success')
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      })
    })

})

module.exports = router