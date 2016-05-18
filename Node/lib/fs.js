var fs = require('fs');

fs.writeFile('/var/www/html/image/message.txt', 'Hello Node', function (err) {
  if (err) throw err;
  console.log('It\'s saved!'); //文件被保存
});