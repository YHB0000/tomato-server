var express = require('express')
var List = require('../models/TODO/list')

var router = express.Router()

router.get('/todo/collect', (req, res) => {
  List
    .findByIdAndUpdate(req.query.id, {
      priority: 99
    })
    .then(ret => {
      res.status(200).json(ret)
      console.log(req.query._id)
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      })
    })
})

module.exports = router