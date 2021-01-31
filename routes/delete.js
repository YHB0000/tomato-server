var express = require('express')
var List = require('../models/TODO/list')

var router = express.Router()

router.delete('/todo', (req, res) => {
  List
    .findOneAndRemove(req.query.id)
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