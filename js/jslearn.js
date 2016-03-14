/**
 * Created by Administrator on 2016/3/13 0013.
 */

var oDiv1 = document.getElementById('div1'),
    oDiv2 = document.getElementById('div2');
oDiv1.onclick = function() {
    alert('1');
};
oDiv2.onclick = function(e) {
    alert('2');
    e.stopPropagation();
};