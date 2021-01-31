var express = require('express')
var List = require('../models/TODO/list')

var router = express.Router()

router.get('/todo/getList', (req, res) => {
  if (!req.query.id) {
    List
      .find({})
      .then(ret => {
        const data = {
          "success": true,
          "message": '"success"',
          "data": ret
        }
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          message: err.message
        })
      })
  } else {
    List
      .find({ _id: req.query.id })
      .then(ret => {
        const data = {
          "success": true,
          "message": 'success',
          "data": ret
        }
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          message: err.message
        })
      })
  }
})

module.exports = router