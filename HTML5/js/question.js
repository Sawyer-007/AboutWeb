function XMLTest(XMLstring) {
	var reg = new RegExp('<[a-zA-Z\/]+>','g');
	
	var XMLArray = XMLstring.match(reg);
	var testArray = [];
	
	XMLArray.forEach(function (el) {
		var str = el.replace('/','');
		console.log(str);
		if(str != testArray[testArray.length-1]) {
			testArray.push(str);
		} else {
			testArray.pop();
		}
		console.log(testArray);
	});
	
	if (testArray.length === 0) {
		print('Valid');
	} else {
		print('Invalid');
	}
}

var i = 0;
while (i++ < 2) {
	console.log('1:', i);
	var timer = setTimeout(function() {
		console.log(i);
	}, 500);
}
console.log('2:', i);
clearTimeout(timer);

function foo () {
	this.num = 10;
	return function foot () {
		var num = 100;
		console.log(this.num);
		console.log(num);
	}
}

foo()();
    
    

