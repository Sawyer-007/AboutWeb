var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var querystring = require('querystring');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var fs = require('fs')

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '2100121',
	database: 'Ding'
});

connection.connect(function(err) {
	if (err) {
		console.log('connect error:', err);
		return;
	}
	console.log('connect success');
});

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing application/x-www-form-urlencoded

app.post('/user_login', function(req, eres) {
	eres.header("Access-Control-Allow-Origin", "*");
	console.log(req.body);
	var num = req.body.num;
	var psw = req.body.psw;
	var isExsitDb = false;
	var items = {
		state: '',
		avtice: '',
		avatar: '',
		data: [],
	};

	connection.query('SELECT * FROM ding_user_info WHERE number =  "' + num + '" AND password = "' + psw + '"', function(err, rows, fields) {
		if (err) {
			console.log(err);
			return;
		}
		if (rows[0]) {
			isExsitDb = true;
			items.active = rows[0].state;
			items.avatar = rows[0].avatar;
		}

		if (isExsitDb) {
			connection.query('SELECT * FROM ding_borrow_info WHERE number =  "' + num + '"', function(err, rows, fields) {
				if (err) {
					console.log(err);
					return;
				}
				var itemsName = ['barcode', 'bookinfo', 'borrowdate', 'returndate', 'renewcount', 'location', 'other', 'renew'];
				rows.forEach(function(el) {
					var book = [];
					for (var i = 0; i < 8; i++) {
						book[i] = el[itemsName[i]];
					}
					items.data.push(book);
				});
				items.state = 200;
				eres.send(items);
			});
		} else {
			superagent.get("http://210.41.233.144:8080/reader/login.php")
				.end(function(err, res) {
					if (err) {
						return console.error(err);
					}
					var cookie = res.header['set-cookie'];
					var postData = {
						number: num,
						passwd: psw,
						select: 'cert_no',
						returnUrl: ''
					};
					console.log(querystring.stringify(postData));
					superagent.post("http://210.41.233.144:8080/reader/redr_verify.php")
						.set({
							'Host': '210.41.233.144:8080',
							'Connection': 'keep-alive',
							'Content-Length': querystring.stringify(postData).length,
							'Cache-Control': 'max-age=0',
							'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
							'Origin': 'http://210.41.233.144:8080',
							'Upgrade-Insecure-Requests': 1,
							'User-Agent': 'Mozilla/5.0 (Windows- NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
							'Content-Type': 'application/x-www-form-urlencoded',
							'Referer': 'http://210.41.233.144:8080/reader/login.php',
							'Accept-Encoding': 'gzip, deflate',
							'Accept-Language': 'zh-CN,zh;q=0.8',
							'Cookie': cookie.toString().split(';')[0]
						})
						.send(postData)
						.end(function(err, res) {
							if (err) {
								return console.error(err);
							}
							//console.log(res.text);
							superagent.get("http://210.41.233.144:8080/reader/book_lst.php")
								.set({
									'Host': '210.41.233.144:8080',
									'Connection': 'keep-alive',
									'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
									'Upgrade-Insecure-Requests': 1,
									'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
									'Referer': 'http://210.41.233.144:8080/reader/redr_info.php',
									'Accept-Encoding': 'gzip, deflate, sdch',
									'Accept-Language': 'zh-CN,zh;q=0.8',
									'Cookie': cookie.toString().split(';')[0]
								})
								.end(function(err, res) {
									if (err) {
										return console.error(err);
									}
									var $ = cheerio.load(res.text, {
										ignoreWhitespace: true,
									});

									if ($('#mylib_content').text()) {

										connection.query('SELECT * FROM ding_user_info WHERE number = "' + num + '"', function(err, rows, fields) {
											if (err) {
												console.log(err);
												return;
											}

											if (rows[0]) {
												items.state = 202;
												connection.query('UPDATE ding_user_info SET password = "' + psw + '"WHERE number = "' + num + '"', function(err) {
													if (err) {
														console.log(err);
														return;
													}
													var firstEl = true;
													$('.table_line tr').each(function(el) {
														if (firstEl) {
															firstEl = false;
														} else {
															var book = [];
															for (var i = 0; i < 8; i++) {
																book[i] = $(this).find('td').eq(i).text();
															}
															console.log($(this).find('td').eq(0).text());
															items.data.push(book);
														}
													});

													items.data.forEach(function(el) {
														connection.query('DELETE FROM ding_borrow_info WHERE number = "' + num + '"', function(err, rows, fields) {
															if (err) {
																console.log(err);
																return;
															}
															connection.query('INSERT INTO ding_borrow_info VALUES("' + num + '", "' + el[0] + '", "' + el[1] + '", "' + el[2] + '", "' + el[3] + '", "' + el[4] + '", "' + el[5] + '", "' + el[6] + '", "' + el[7] + '", "", "' + new Date().valueOf() + '")', function(err, rows, fields) {
																if (err) {
																	console.log(err);
																	return;
																}
															});
														});
													});
													console.log(items);
													eres.send(items);
												});

											} else {
												items.state = 201;
												connection.query('INSERT INTO ding_user_info VALUES("' + num + '", "' + psw + '", "", 0, "", "")', function(err, rows, fields) {
													if (err) {
														console.log(err);
														return;
													}
												});
												var firstEl = true;
												$('.table_line tr').each(function(el) {
													if (firstEl) {
														firstEl = false;
													} else {
														var book = [];
														for (var i = 0; i < 8; i++) {
															book[i] = $(this).find('td').eq(i).text();
														}
														console.log($(this).find('td').eq(0).text());
														items.data.push(book);
													}
												});

												items.data.forEach(function(el) {
													connection.query('INSERT INTO ding_borrow_info VALUES("' + num + '", "' + el[0] + '", "' + el[1] + '", "' + el[2] + '", "' + el[3] + '", "' + el[4] + '", "' + el[5] + '", "' + el[6] + '", "' + el[7] + '", "", "' + new Date().valueOf() + '")', function(err, rows, fields) {
														if (err) {
															console.log(err);
															return;
														}
													});
												});
												console.log(items);
												eres.send(items);
											}
										});
									} else {
										items.state = 400;
										console.log(items);
										eres.send(items);
									}
								});
						});
				});
		}
	});
});

app.post('/user_set_email', function(req, res) {
	var num = req.body.num;
	var email = req.body.email;
	console.log(num, email);

	res.header("Access-Control-Allow-Origin", "*");

	connection.query('UPDATE ding_user_info SET email = "' + email + '" WHERE number = "' + num + '"', function(err, rows, fields) {
		if (err) {
			console.log(err);
			return;
		}

		var numberAndLetter = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ';
		var activeCode = '';
		for (var i = 0; i < 10; i++) {
			activeCode += numberAndLetter[Math.floor(Math.random() * numberAndLetter.length)];
		}
		console.log(activeCode);
		connection.query('UPDATE ding_user_info SET activecode = "' + activeCode + '" WHERE number = "' + num + '"', function(err, rows, fields) {
			if (err) {
				console.log(err);
				return;
			}

			var transporter = nodemailer.createTransport({
				host: 'smtp.qq.com',
				port: 465,
				secure: true, // use SSL
				auth: {
					user: '81239691@qq.com',
					pass: 'pyspowcslplcbgii'
				}
			});
			console.log(email);
			var mailOptions = {
				from: 'Ding会员邮箱绑定确认信息 <81239691@qq.com>', // sender address
				to: email, // list of receivers
				subject: 'Hello', // Subject line
				text: 'Hello world', // plaintext body
				html: '<p>点击以下链接绑定您的邮箱+<p>' + '<a href="http://192.168.252.130:3000/activecode_verify?code=' + activeCode + '&num=' + num + '">click</a>' // html body
			};

			transporter.sendMail(mailOptions, function(error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log('Message sent: ' + info.response);
				}
			});
		});
	});
});

app.get('/activecode_verify', function(req, res) {
	var activecode = req.query.code;
	var num = req.query.num;

	connection.query('SELECT activecode FROM ding_user_info WHERE number = "' + num + '"', function(err, rows, fields) {
		console.log(activecode, num, rows[0]);
		if (rows[0].activecode == activecode) {
			if (err) {
				console.log(err);
				return;
			}
			connection.query('UPDATE ding_user_info SET state = 1 WHERE number = "' + num + '"', function(err, rows, fields) {
				if (err) {
					console.log(err);
					return;
				}
				res.send('ok');
			});
		} else {
			res.send('fail');
		}
	});
});

app.post('/refresh_data', function(req, eres) {
	var num = req.body.num;
	var psw = req.body.psw;
	var items = {
		state: '',
		avtice: '',
		data: [],
	};
	eres.header("Access-Control-Allow-Origin", "*");

	console.log('Referer');
	superagent.get("http://210.41.233.144:8080/reader/login.php")
		.end(function(err, res) {
			if (err) {
				return console.error(err);
			}
			var cookie = res.header['set-cookie'];
			var postData = {
				number: num,
				passwd: psw,
				select: 'cert_no',
				returnUrl: ''
			};
			console.log(querystring.stringify(postData));
			superagent.post("http://210.41.233.144:8080/reader/redr_verify.php")
				.set({
					'Host': '210.41.233.144:8080',
					'Connection': 'keep-alive',
					'Content-Length': querystring.stringify(postData).length,
					'Cache-Control': 'max-age=0',
					'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
					'Origin': 'http://210.41.233.144:8080',
					'Upgrade-Insecure-Requests': 1,
					'User-Agent': 'Mozilla/5.0 (Windows- NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
					'Content-Type': 'application/x-www-form-urlencoded',
					'Referer': 'http://210.41.233.144:8080/reader/login.php',
					'Accept-Encoding': 'gzip, deflate',
					'Accept-Language': 'zh-CN,zh;q=0.8',
					'Cookie': cookie.toString().split(';')[0]
				})
				.send(postData)
				.end(function(err, res) {
					if (err) {
						return console.error(err);
					}
					//console.log(res.text);
					superagent.get("http://210.41.233.144:8080/reader/book_lst.php")
						.set({
							'Host': '210.41.233.144:8080',
							'Connection': 'keep-alive',
							'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
							'Upgrade-Insecure-Requests': 1,
							'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
							'Referer': 'http://210.41.233.144:8080/reader/redr_info.php',
							'Accept-Encoding': 'gzip, deflate, sdch',
							'Accept-Language': 'zh-CN,zh;q=0.8',
							'Cookie': cookie.toString().split(';')[0]
						})
						.end(function(err, res) {
							if (err) {
								return console.error(err);
							}
							var $ = cheerio.load(res.text, {
								ignoreWhitespace: true,
							});

							if ($('#mylib_content').text()) {
								items.state = 202;
								var firstEl = true;
								$('.table_line tr').each(function(el) {
									if (firstEl) {
										firstEl = false;
									} else {
										var book = [];
										for (var i = 0; i < 8; i++) {
											book[i] = $(this).find('td').eq(i).text();
										}
										console.log($(this).find('td').eq(0).text());
										items.data.push(book);
									}
								});

								items.data.forEach(function(el) {
									connection.query('DELETE FROM ding_borrow_info WHERE number = "' + num + '"', function(err, rows, fields) {
										if (err) {
											console.log(err);
											return;
										}
										connection.query('INSERT INTO ding_borrow_info VALUES("' + num + '", "' + el[0] + '", "' + el[1] + '", "' + el[2] + '", "' + el[3] + '", "' + el[4] + '", "' + el[5] + '", "' + el[6] + '", "' + el[7] + '", "", "' + new Date().valueOf() + '")', function(err, rows, fields) {
											if (err) {
												console.log(err);
												return;
											}
										});
									});
								});
							} else {
								items.state = 401;
							}
							console.log(items);
							eres.send(items);

						});
				});
		});

});

app.post('/set_avatar', function (req, res) {

	res.header("Access-Control-Allow-Origin", "*");
	var num = req.body.num;
	var image = req.body.image;
	var path = '/var/www/html/image/';
	var items = {
		state: '',
	};

	var base64Data = image.replace(/^data:image\/\w+;base64,/, "");
	var dataBuffer = new Buffer(base64Data, 'base64');
	console.log('ava: ', num);

	fs.writeFile(path + num+'.png', dataBuffer, function (err) {
		if (err) {
			items.state = '410';
			res.send(items);
		}
		else {
			items.state = '210';
			connection.query('UPDATE ding_user_info set avatar = "/image/'+num+'.png" WHERE number = "'+num+'"', function (err) {
				if (err) {
					console.log(err);
					return;
				}
				res.send(items);
				console.log(num + 'ok');
			});
		}
	});
});

app.listen(3000, function(req, res) {
	console.log('app is running at port 3000');
});