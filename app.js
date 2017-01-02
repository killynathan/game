var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

require('./models/Users');
mongoose.connect('mongodb://test:1234@ds151078.mlab.com:51078/browserquest')

var api = require('./routes/api');

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', api);

module.exports = app;
