var express = require('express')
var List = require('../models/TODO/list')

var router = express.Router()

router.post('/todo/edit', (req, res) => {
  List
    .findByIdAndUpdate(req.body.id, {
      name: req.body.name,
      createDate: req.body.createDate,
      priority: req.body.priority
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