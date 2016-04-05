var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var querystring=require('querystring');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/lib_get', function (req, eres) {
  eres.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  var num = req.body.num;
  var psw = req.body.psw;

  superagent.get("http://210.41.233.144:8080/reader/login.php")
  .end(function (err, res) {
    if (err) {
      return console.error(err);
    }
    var cookie = res.header['set-cookie'];
    var postData = {
      number: num,
      passwd: psw,
      select:'cert_no',    
      returnUrl:''
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
      .end(function (err, res) {
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
          .end(function (err, res) {
            if(err) {
              return console.error(err);
            }
            var $ = cheerio.load(res.text, {
              ignoreWhitespace: true,
            });
            var items = [];
            var renewBarcode = [];
            var renewCheck = [];
            $('.table_line tr').each(function () {
              var book = $(this).text();
              console.log(book);
              items.push(book);
            });
            $('.btn-success').each(function () {
              var renew = $(this).attr('onclick');
              var renewReg = new RegExp("'([A-Za-z0-9]{1,10})'","g")
              renewBarcode.push(renewReg.exec(renew)[1]);
              renewCheck.push(renewReg.exec(renew)[1]);
              console.log(renewBarcode);
            });
            superagent.get('http://210.41.233.144:8080/reader/ajax_renew.php?bar_code='+renewBarcode[7]+'&check='+renewCheck[7]+'&time='+ new Date().getTime())
              .set({
                  'Host': '210.41.233.144:8080',
                  'Connection': 'keep-alive',
                  'Accept': 'text/html, */*; q=0.01',
                  'X-Requested-With': 'XMLHttpRequest',
                  'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
                  'Referer': 'http://210.41.233.144:8080/reader/book_lst.php',
                  'Accept-Encoding': 'gzip, deflate, sdch',
                  'Accept-Language': 'zh-CN,zh;q=0.8',
                  'Cookie': cookie.toString().split(';')[0]
                  })
              .end(function (err, res) {
                if(err) {
                  return console.error(err);
                }
                else {
                  console.log(res.text);
                }
              });
            eres.send(items);
          });
      });
  });
});

app.listen(3000, function (req, res) {
  console.log('app is running at port 3000');
});

