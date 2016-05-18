var mysql = require('mysql');
var nodemailer = require('nodemailer');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '2100121',
	database: 'Ding'
});

var transporter = nodemailer.createTransport({
	host: 'smtp.qq.com',
	port: 465,
	secure: true, // use SSL
	auth: {
		user: '81239691@qq.com',
		pass: 'pyspowcslplcbgii'
	}
});

connection.connect(function(err) {
	if (err) {
		console.log('connect error:', err);
		return;
	}
	console.log('connect success');
	
});


function QueryMysql() {
	console.log('ok');
	connection.query('SELECT * FROM ding_borrow_info', function (err, rows) {
		if (err) {
			console.log(err);
			return;
		}
		var curMonth = new Date().getMonth() + 1;
		var curToday = new Date().getDate();
		var curUser = rows[0].number;
		var sendList = [];
		rows.forEach(function (el, index) {
			var returndate = el.returndate.split('-');
			console.log(rows.length - 1, index);
			if ((returndate[1] == curMonth && returndate[2] - curToday <= 1) || index == rows.length - 1) {
				console.log(el.number, curUser, index, rows.length - 1, sendList.length);
				if ((el.number != curUser || index == rows.length - 1) && sendList.length != 0) {
					console.log('should send');
					var list = '<table>';
					list    += '  <tbody>';
					list    += '    <tr>';
					list    += '      <th>图书信息</th>';
					list    += '      <th>归还日期</th>';
					list    += '    </tr>';
					sendList.forEach(function (sendel) {
						list += '<tr>'
						list += '  <td>' + sendel.book + '</td>';
						list += '  <td>' + sendel.date + '</td>';
						list += '</tr>';
					});
					list    += '  <tbody>';
					list    +='</tabel>';

					connection.query('SELECT email FROM ding_user_info WHERE number = "'+curUser+'"', function (err, rows) {
						if (err) {
							console.log(err);
							return;
						}
						var mailOptions = {
							from: 'Ding图书到期归还提醒 <81239691@qq.com>', // sender address
							to: rows[0].email, // list of receivers
							subject: 'Hello', // Subject line
							text: 'Hello world', // plaintext body
							html: list // html body
						};

						transporter.sendMail(mailOptions, function(error, info) {
							if (error) {
								console.log(error);
							} else {
								console.log('Message sent: ' + info.response);
								curUser = el.number;
								sendList = [];
								sendList.push({
									'book': el.bookinfo,
									'date': el.returndate
								});
							}
						});
					});
				}
				else {
					console.log('should rpush');
					sendList.push({
						'book': el.bookinfo,
						'date': el.returndate
					});
				}
			}
		});
	});
}

QueryMysql();