var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var querystring=require("querystring");

superagent.get("http://210.41.233.144:8080/reader/login.php")
  .end(function (err, res) {
    if (err) {
      return console.error(err);
    }
    var cookie = res.header['set-cookie'];
    var postData = {
      number:'2013081221',
      passwd:'2013081221',
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
            $('.table_line tr').each(function () {
              //console.log($(this).find('td').eq(1).text()); //可以获取每本书的名字 eq（n）  
              var book = $(this).text();
              console.log(book);
              items.push(book);
            });

            console.log(items);
          });
      });
  });
