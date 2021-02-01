var express = require('express')
var List = require('../models/TODO/list')
const moment = require('moment')

var router = express.Router()

router.get('/todo/getHeat', async (req, res) => {
  // const Date = '2021-01-11'
  let Date = req.query.week;
  // if (req.query.thisMonday) {
  //   Date = req.query.thisMonday
  // } else if (req.query.nextMonday) {
  //   req.query.nextMonday
  // } else {
  //   Date = req.query.lastMonday
  // }
  var createDate = moment(Date + ' 00:00', 'YYYY-MM-DD HH:mm').unix()
  var endDate = moment(Date + ' 03:00', 'YYYY-MM-DD HH:mm').unix()
  var countList = new Array
  var weekData = new Array

  for (let i = 0; i < 56; i++) {
    createDate = createDate + (Math.floor(i / 3) + 1) * 3 * 3600
    endDate = endDate + (Math.floor(i / 3) + 1) * 3 * 3600
    countList[i] = await List
      .countDocuments({
        $and: [{
          createDate: { $gt: createDate.toString(), $lte: endDate.toString() }
        }, {
          isFinish: true
        }]
      })
  }
  console.log(countList)

  for (let j = 0; j < 7; j++) {
    for (let z = 0; z < 8; z++) {
      weekData.push({
        week: j,
        hour: z,
        value: countList[(j + 1) * (z + 1) - 1]
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
      console.log('todo/getHeat success')
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      })
    })

})

module.exports = router