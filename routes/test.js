const express = require('express')
const List = require('../models/TODO/list')
const Random = require('random-string')
const moment = require('moment')

const router = express.Router()

const randomDate = (startDate, endDate) => {
  let date = new Date(+startDate + Math.random() * (endDate - startDate))
  return date
}

router.get('/test', (req, res) => {

  for (let i = 10; i < 30; i++) {

    (i => {
      setInterval(() => {
        // 生产当月的开始日期
        const startDate = moment().year(2020).month(12).date(i).hour(5).toDate()
        // 截止日期
        const endDate = moment().year(2020).month(12).date(i).hour(23).toDate()

        List
          // .remove({ priority: 0 })
          .create({
            name: Random({ length: 6, letters: true }),
            createDate: moment(randomDate(startDate, endDate)).format('X'),
            // endDate: moment(randomDate(startDate, endDate)).format('X'),
            isFinish: false,
            priority: Random({ length: 1, number: true })
          })
          .catch(err => {
            // console.log(err)
          })
      }, 800);
    })(i)
  }

})

module.exports = router