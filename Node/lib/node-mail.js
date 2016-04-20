var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: '81239691@qq.com',
        pass: 'pyspowcslplcbgii'
    }
});

var mailOptions = {
    from: 'zzyy <81239691@qq.com>', // sender address
    to: 'sawyer_007@outlook.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'Hello world', // plaintext body
    html: '<a>http://www.baidu.com</a>' // html body
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});
