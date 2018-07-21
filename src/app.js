const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const routers = require('./router')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use((req, res) => {
  res.setHeader('Content-Type', 'Application/json')
})

app.use('/', routers)
app.get('/gogo', (req, res, next) => {
  res.send('ok')
})
module.exports = app
