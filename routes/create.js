var express = require('express')
var List = require('../models/TODO/list')
var moment = require('moment')

var router = express.Router()

router.get('/todo', (req, res) => {
  const create = moment().unix()
  List
    .create({
      name: req.query.name,
      createDate: create,
      isFinish: false,
      priority: 1
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