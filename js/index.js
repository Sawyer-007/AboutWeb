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
         ��ϼ̳е�ԭ�����
         ͨ�����ù��캯��������������Ը��������ʵ����ȥ ��ʱ�����Բ��������� �ҿ�������ԭ���е�����
         ͨ��ԭ�ͼ̳У�����������Ը��赽�����ԭ����ȥ ʵ���˸���
         ����ֻ�ú��� hasOwnProperty �� in �����
 */
function SuprtType(name) {
    this.name = name;
    this.colors = ['red','green','blue','yellow','pink'];
}
SuprtType.prototype.sayName = function() {
    return this.name;
}
function SubType(name,age) {
    SuprtType.call(this, name); //��subTypeʵ���е���SuprType�Ĺ��캯������ʱcolors�����Ǵ�����ʵ���е� ���Ṳ��
    this.age = age;
}

SubType.prototype = new SuprtType(); //�൱�ڰ�SuprType�е�������ӵ� SubType��prototype��ȥ ��������
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
    this.msg="Please show me delicious food��";
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

