var mongoose = require('mongoose')
var Promise = require('bluebird')

var Schema = mongoose.Schema

var list = new Schema({
  name: {
    type: String,
    required: true
  },
  createDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: false
  },
  isFinish: {
    type: Boolean,
    required: true
  },
  priority: {
    type: Number,
    required: false
  }
})

var List = mongoose.model('List', list)

Promise.promisifyAll(List)
Promise.promisifyAll(List.prototype)

module.exports = List