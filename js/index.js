/**
 * Created by Administrator on 2015/10/19 0019.
 */
$(function(){
    $('#oneButton').click(function(){
        $('#oneUl').slideToggle();
        $('#twoUl').slideUp();
        $('#threeUl').slideUp();
    });
});
$(function(){
    $('#twoButton').click(function(){
        $('#twoUl').slideToggle();
        $('#oneUl').slideUp();
        $('#threeUl').slideUp();
    });
});
$(function(){
    $('#threeButton').click(function(){
        $('#threeUl').slideToggle();
        $('#twoUl').slideUp();
        $('#oneUl').slideUp();
    });
});
$(function(){
    $('#all').click(function(){
        $(this).siblings('input[type="checkbox"]').attr("checked","checked");
    });
    $('#show').click(function(){
        var string = $(this).siblings('input[type="checkbox"]:checked').map(function(){
            return this.name;
        }).get();
        $('#select').text(string);
    });
    $('#delete').click(function(){
        $(this).siblings(':checkbox:checked').removeAttr("checked");
    });
});
/*
var oBtn = document.getElementById('btnjs');
oBtn.onclick = function(){
    var colors = ['red','green','blue','yellow','pink'];
    var color = colors[selectFrom(0, colors.length - 1)];
    console.log(color);
};
function selectFrom(lowerValue, upperValue) {
    var choices = upperValue - lowerValue;
    return Math.floor(Math.random() * choices + lowerValue);
}
*/

/*
         组合继承的原理详解
         通过借用构造函数，将父类的属性赋予子类的实例中去 这时的属性不会引起共享 且可以屏蔽原型中的属性
         通过原型继承，将父类的属性赋予到子类的原型中去 实现了复用
         可以只用函数 hasOwnProperty 和 in 来检测
 */
function SuprtType(name) {
    this.name = name;
    this.colors = ['red','green','blue','yellow','pink'];
}
SuprtType.prototype.sayName = function() {
    return this.name;
}
function SubType(name,age) {
    SuprtType.call(this, name); //在subType实例中调用SuprType的构造函数，这时colors属性是存在于实例中的 不会共享
    this.age = age;
}

SubType.prototype = new SuprtType(); //相当于把SuprType中的属性添加到 SubType的prototype中去 会引起共享
SubType.prototype.sayAge = function() {
    return this.age;
}
/*
function createFunctions() {
    var result = new Array();

    for (var i = 0; i < 10; i++) {
        result[i] = function() {
            return i;
        }
    }

    return result;
}

var funcs = createFunctions();

for (var i = 0; i < 10; i++) {
    console.log(funcs[i]());
}
*/

var sayHello = function (name) {
    var text = 'Hello, ' + name;
    return function () {
        console.log(text + '2');
    };
};
function compare(value1, value2) {
    return value1 + value2;
}

var Pet=function()
{
    this.msg="Please show me delicious food…";
    this.shout = function()
    {
        console.log(this.msg);
    }
    this.waitAndShout = function()
    {
        var that = this;
        setInterval(function(){that.shout()},2000);
    }
}

var n = 0;
function a() {
    var n = 10;
    function b() {
        n++;
        console.log(n);
        return n;
    }
    b();
    return b;
}
var c = a();
c();
console.log(n);

