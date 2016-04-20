var url = require('url');
var querystring=require('querystring');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '2100121',
	database: 'ding'
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/user_login', function(req, res) {
	var num = req.body.num;
  	var psw = req.body.psw;

  	connection.connect(function(err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}
		console.log('connected as id ' + connection.threadId);
	});

	connection.query('SELECT * FROM ding_user_info ', function(err, rows, fields) {
	if (err) {
		console.log(err);
		return;
	}
	console.log('The solution is: ', rows[0].solution);
});

});