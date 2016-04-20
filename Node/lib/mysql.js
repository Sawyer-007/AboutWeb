var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '2100121',
		database: 'test'
	});

connection.connect(function (err) {
	if (err) {
		console.log('connect error:', err);
		return;
	}
	console.log('connect success');
});

app.get('/user_info_test',function (req, res) {
	res.header("Access-Control-Allow-Origin", "http://192.168.252.130");
	var opt = req.query.opt;
	
	if (opt == 'select') {
		var page = req.query.page;
		var sql = 'SELECT * FROM class limit '+(page-1)*10+',10';
		var data = [];
		
		connection.query(sql, function(err, rows, fields) {
			if (err) {
				console.log(err);
				return;
			}
			data = rows;
			console.log('The solution is: connecting', data);
			res.send(data);
		});
	}

	if (opt == 'get') {
		connection.query('SELECT COUNT(*) as count FROM class', function(err, rows, fields) {
			if (err) {
				console.log(err);
				return;
			}
			console.log('The solution is: connecting', rows[0]);
			res.send(rows[0]);
		});
	};
});

app.post('/user_info_test', function (req, res) {
	res.header("Access-Control-Allow-Origin", "http://192.168.252.130");
	var opt = req.body.opt;

	if (opt == 'delete') {
		var ids = req.body.ids;
		var sql = 'DELETE FROM class WHERE id in (';

		for (var i = 0; i < ids.length - 1; i++) {
			sql = sql + ids[i] + ',';
		}
		sql = sql + ids[i] + ')';
		console.log(sql);

		connection.query(sql, function(err, rows, fields) {
			if (err) {
				console.log(err);
				return;
			}
			console.log('The solution is: connecting', rows);
			res.send(rows);
		});
	}
});

app.listen(3000, function (req, res) {
  console.log('app is running at port 3000');
});