var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '2100121',
	database: 'test'
});

connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}

	console.log('connected as id ' + connection.threadId);
});
for (var i = 6; i < 100; i++) {
		connection.query('INSERT INTO class VALUES ('+i+', "David")');
}


connection.end();