var express = require('express')
var List = require('../models/TODO/list')
const moment = require('moment')

var router = express.Router()

router.delete('/todo', (req, res) => {
  var createDate = moment('2021-02-01 02:00', 'YYYY-MM-DD HH:mm').unix()
  var endDate = moment('2021-02-02 23:00', 'YYYY-MM-DD HH:mm').unix()
  List
    .findByIdAndRemove(req.body._id)
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      })
    })

  List
    .find({
      createDate: { $gt: createDate.toString(), $lte: endDate.toString() }
    })
    .limit(50)
    .then(ret => {
      const data = {
        success: true,
        message: 'success',
        data: ret
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