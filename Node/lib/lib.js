var http=require("http");
var querystring=require("querystring");

var contents=querystring.stringify({
  number:'2013081221',
  passwd:'2013081221',
  select:'cert_no',  
  returnUrl:''
});

var options={
  host:"210.41.233.144",
  path:"/reader/redr_verify.php",
  port:'8080',
  method:"post",
  headers:{
    'Host': '210.41.233.144:8080',
    'Connection': 'keep-alive',
    'Content-Length': contents.length,
    'Cache-Control': 'max-age=0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Origin': 'http://210.41.233.144:8080',
    'Upgrade-Insecure-Requests': 1,
    'User-Agent': 'Mozilla/5.0 (Windows- NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Referer': 'http://210.41.233.144:8080/reader/login.php',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.8',
    'Cookie': 'PHPSESSID=tjpg619l8a4cb21kc39hk2ccg0'
  }
};

var req=http.request(options,function(res){
  res.setEncoding("utf8");
  res.on("data",function(data){
    //console.log(data);
  });
});


req.write(contents);
req.end();