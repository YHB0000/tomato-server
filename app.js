const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const route = require('./route')

const app = express()

/**
 * 数据库 配置
 */
require('./models/config/connect')

/**
 * bodyParser 配置
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * Session 配置
 */
app.use(session({
  secret: 'tomatoserver',
  resave: false,
  saveUninitialized: false
}))

/**
 *  跨域 和相应 数据格式
 */
app.all('*', function (req, res, next) {
  // 设置允许跨域的域名，* 代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', 'http://localhost:3333')
  // 允许的 header 类型
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept,X-Requested-With')
  // 跨域允许的请求方式 
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', '3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Credentials', 'true')
  if (req.method == 'OPTIONS') res.sendStatus(200)
  /*让options请求快速返回*/ else next()
})

/**
 * 路由 配置
 */
route.init(app, path.join(process.cwd(), '/routes/'))


app.listen(8888, () => {
  console.log('http://localhost:8888 running successfully')
})