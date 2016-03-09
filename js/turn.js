/**
 * Created by Administrator on 2016/3/1 0001.
 */
/*
    实现轮播图中通过底部按钮选择图片
 */

$(function() {
    $('ul[class=first-div-bottom-btn] li').click(function(){
        var _indx = $(this).index();
        $('ul[class=first-div-bottom-btn] li[class=active]').removeClass('active');
        $(this).addClass('active');
        $('ul[class=first-div-photos] li[class=show]').removeClass('show');
        $('ul[class=first-div-photos] li').eq(_indx).addClass('show');
    });
    var _current = 0;
    var _lenth = $('ul[class=first-div-bottom-btn] li').length;
    var _next  = 0;
    setInterval(turnShow,4000);
    function turnShow() {
        _next = (_current + 1) % _lenth;
        $('ul[class=first-div-bottom-btn] li[class=active]').removeClass('active');
        $('ul[class=first-div-bottom-btn] li').eq(_next).addClass('active');
        $('ul[class=first-div-photos] li[class=show]').removeClass('show');
        $('ul[class=first-div-photos] li').eq(_next).addClass('show');
        _current = _next;
        console.log(_lenth);
        console.log(_current);
    };
});
