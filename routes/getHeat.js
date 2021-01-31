var express = require('express')
var List = require('../models/TODO/list')
const moment = require('moment')

var router = express.Router()

router.get('/todo/getHeat', (req, res) => {
  const createDate = moment(req.query.createDate, 'YYYY-MM-DD HH:mm').valueOf()
  const endDate = moment(req.query.endDate, 'YYYY-MM-DD HH:mm').valueOf()
    List
      .find({createDate: {$in: [createDate, endDate]}})
      .then(ret => {
        res.status(200).json(ret)
        console.log(endDate)
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          message: err.message
        })
      })
})

module.exports = router