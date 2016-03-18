/**
 * Created by Administrator on 2016/3/13 0013.
 */

var oDiv1 = document.getElementById('div1'),
    oDiv2 = document.getElementById('div2'),
    oDiv3 = document.getElementById('div3'),
    oDiv4 = document.getElementById('div4');
oDiv1.onclick = function() {
    console.log('1');
};
oDiv2.onclick = function(e) {
    console.log('2');
    e.stopPropagation();
   // e.cancelBubble = true;  //也可利用修改事件属性来阻止冒泡
    console.log(e);
};
oDiv3.addEventListener('click',function() {
    console.log('3');
},true);
oDiv4.addEventListener('click',function() {
    console.log('4');
},true);
var oList = document.getElementById('myList');
oList.addEventListener('click', function () {
    console.log('5');
}, false);
/*
function shout () {
    return 222;
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
        //setInterval(this.shout.bind(this),2000);
    }
}
    */