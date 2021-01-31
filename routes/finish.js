var express = require('express')
var List = require('../models/TODO/list')

var router = express.Router()

router.get('/todo/finish', (req, res) => {
  List
    .findByIdAndUpdate(req.query.id, {
      isFinish: true,
      endDate: req.query.endDate
    })
    .then(ret => {
      res.status(200).json(ret)
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      })
    })
})

module.exports = router