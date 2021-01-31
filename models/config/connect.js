var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/tomato', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('database success'))
  .catch(() => console.log('database error'))