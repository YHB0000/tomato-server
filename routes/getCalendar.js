var express = require('express')
var List = require('../models/TODO/list')
const moment = require('moment')

var router = express.Router()

router.get('/todo/getCalendar', async (req, res) => {

  var datelist = new Array
  var datalist = new Array
  datelist = await List.find({}, '-_id endDate')
  for (let i = 0; i < datelist.length; i++) {
    const temp = moment.unix(datelist[i].endDate).format('YYYY-MM-DD')
    if (temp != 'Invalid date') {
      datalist.push(temp)
    }
  }

  List
    .find({}, '-_id endDate')
    .then(ret => {
      const data = {
        success: true,
        message: 'success',
        data: datalist
      }
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      })
    })

})

module.exports = router