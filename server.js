const express = require('express');
var app = express();
var browserify = require('browserify-middleware');
app.use(require('morgan')('dev'));
var path = require('path');
app.use('/bundle.js', browserify(__dirname + '/medium.js'));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/body.md', function (req, res) {
  res.sendFile(path.join(__dirname, 'body.md'));
});
app.get('/medium.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'medium.css'));
});
app.use(express.static('./static'));
app.listen(3000, function () {
  console.log('listening on 3000');
});
