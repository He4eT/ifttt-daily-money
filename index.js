var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.param('day', addParam('day'))
app.param('key', addParam('key'))
app.param('money', addParam('money'))

app.get('/', function (req, res) {
  res.redirect('http://example.com')
})

app.get('/result/:key/:day/:money', function (req, res) {
  var money = parseInt(req.money)
  var nextPayDay = parseInt(req.day)
  var iftttKey = req.key

  var params = {
    days: getDifference(nextPayDay),
    money: money, 
    key: iftttKey
  }

  res.send(params)
  checkMoney(params)
})

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'))
})

function addParam (paramName) {
  return function (req, res, next, param) {
    req[paramName] = param
    next()
  }
}

function getDifference (paydayNumber) {
  var now = new Date()
  var year = now.getYear()
  var month = now.getMonth()
  var day = now.getDate()

  var today =
    new Date(year, month, day)

  var payday =
    new Date(year, month, paydayNumber)

  var inThisMonth = today <= payday

  var numberOfDays = inThisMonth
    ? paydayNumber - day
    : dayInMonth(month, year) - day + paydayNumber

  return numberOfDays
}

function dayInMonth (month, year) {
  return 32 - new Date(year, month, 32).getDate()
}

function checkMoney (args) {
  console.log({args})
}
