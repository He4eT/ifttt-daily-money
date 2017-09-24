var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.redirect('http://example.com');
})

app.param('day', function(req, res, next, day) {
  req.day = day
  next() 
})

app.param('key', function(req, res, next, key) {
  req.key = key
  next() 
})

app.get('/result/:key/:day', function (req, res) {
  var nextPayDay = parseInt(req.day)

  res.send({
    n: getDifference(nextPayDay),
    k: req.key
  })
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

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

function dayInMonth(month, year) {
  return 32 - new Date(year, month, 32).getDate()
}
