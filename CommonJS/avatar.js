var divWidth = 340;
var canvas = document.getElementById('select-img-canvas-bk').getContext('2d');
$('#select-img').bind('change', function(e) {
	var imgFile = e.target.files[0];
	if (!imgFile) {
		console.log('Cancel');
		return;
	}
	var reader = new FileReader();
	reader.readAsDataURL(imgFile);
	reader.onload = function(e) {
		var img = new Image();
		img.onload = function() {
			console.log('draw can-bk');
			canvas.clearRect(0, 0, divWidth, divWidth)
			canvas.drawImage(img, 0, 0, divWidth, divWidth);
			draw();
		}
		img.src = this.result;
	}
});
var optCanvas = document.getElementById('select-img-canvas').getContext('2d');
var canvas100 = document.getElementById('preview-100').getContext('2d');
var canvas50 = document.getElementById('preview-50').getContext('2d');
var canvas30 = document.getElementById('preview-30').getContext('2d');

var avatarX = 75;
var avatarY = 75;
var avatarD = 160;
var avatarR = avatarD / 2;

function draw() {
	avatarR = avatarD / 2;
	optCanvas.clearRect(0, 0, divWidth, divWidth);
	optCanvas.fillStyle = 'rgba(255, 255, 255, 0.6)';
	optCanvas.fillRect(0, 0, divWidth, divWidth);
	optCanvas.clearRect(avatarX, avatarY, avatarD, avatarD);
	optCanvas.strokeStyle = 'rgba(255, 255, 255, 0)';
	optCanvas.beginPath();
	optCanvas.moveTo(avatarX + avatarD, avatarY + avatarR); //e
	optCanvas.arc(avatarX + avatarR, avatarY + avatarR, avatarR, 0, Math.PI / 2, false); // e to s
	optCanvas.moveTo(avatarX + avatarR, avatarY + avatarD); //s
	optCanvas.lineTo(avatarX + avatarD, avatarY + avatarD); // s to es
	optCanvas.lineTo(avatarX + avatarD, avatarY + avatarR); // es to e
	optCanvas.moveTo(avatarX + avatarD, avatarY + avatarR); // e
	optCanvas.arc(avatarX + avatarR, avatarY + avatarR, avatarR, 0, Math.PI * 3 / 2, true);
	optCanvas.moveTo(avatarX + avatarR, avatarY);
	optCanvas.lineTo(avatarX + avatarD, avatarY);
	optCanvas.lineTo(avatarX + avatarD, avatarY + avatarR);
	optCanvas.moveTo(avatarX + avatarD, avatarY + avatarR);
	optCanvas.moveTo(avatarX, avatarY + avatarR);
	optCanvas.arc(avatarX + avatarR, avatarY + avatarR, avatarR, Math.PI, Math.PI * 3 / 2, false);
	optCanvas.moveTo(avatarX + avatarR, avatarY);
	optCanvas.lineTo(avatarX, avatarY);
	optCanvas.lineTo(avatarX, avatarY + avatarR);
	optCanvas.moveTo(avatarX, avatarY + avatarR);
	optCanvas.arc(avatarX + avatarR, avatarY + avatarR, avatarR, Math.PI, Math.PI / 2, true);
	optCanvas.moveTo(avatarX + avatarR, avatarY + avatarD);
	optCanvas.lineTo(avatarX, avatarY + avatarD);
	optCanvas.lineTo(avatarX, avatarY + avatarR);
	optCanvas.moveTo(avatarX, avatarY + avatarR);
	optCanvas.fill();
	optCanvas.closePath();
	optCanvas.stroke();
	optCanvas.beginPath();
	optCanvas.fillStyle = 'rgba(255, 255, 255, 1)';
	optCanvas.strokeStyle = 'rgba(0, 0, 0, 1)';
	optCanvas.arc(avatarX + avatarR * 1.707, avatarY + avatarR * 1.707, 5, 0, Math.PI * 2, true);
	optCanvas.fill();
	optCanvas.stroke();

	canvas100.clearRect(0, 0, divWidth, divWidth);
	canvas50.clearRect(0, 0, divWidth, divWidth);
	canvas30.clearRect(0, 0, divWidth, divWidth);
	canvas100.drawImage(canvas.canvas, avatarX, avatarY, avatarD, avatarD, 0, 0, 100, 100);
	canvas50.drawImage(canvas.canvas, avatarX, avatarY, avatarD, avatarD, 0, 0, 50, 50);
	canvas30.drawImage(canvas.canvas, avatarX, avatarY, avatarD, avatarD, 0, 0, 30, 30);
}

var canResize = false;
var canMove = false;
var oriX = '';
var oriY = '';
$('#select-img-canvas').bind('mousemove', function(e) {
	if ((Math.pow(e.offsetX - (avatarX + avatarR * 1.707), 2) + Math.pow(e.offsetY - (avatarY + avatarR * 1.707), 2)) <= 25) {
		$(this).css('cursor', 'nwse-resize');
	} else if ((Math.pow(e.offsetX - (avatarX + avatarR), 2) + Math.pow(e.offsetY - (avatarY + avatarR), 2)) <= Math.pow(avatarR, 2)) {
		$(this).css('cursor', 'move');
	} else {
		$(this).css('cursor', 'auto');
	}
});
$('#select-img-canvas').bind('mousedown', function(e) {
	if ((Math.pow(e.offsetX - (avatarX + avatarR * 1.707), 2) + Math.pow(e.offsetY - (avatarY + avatarR * 1.707), 2)) <= 25) {
		canResize = true;
		$(this).css('cursor', 'nwse-resize');
	} else if ((Math.pow(e.offsetX - (avatarX + avatarR), 2) + Math.pow(e.offsetY - (avatarY + avatarR), 2)) <= Math.pow(avatarR, 2)) {
		canMove = true;
		$(this).css('cursor', 'move');
		oriX = e.offsetX;
		oriY = e.offsetY;
	} else {
		$(this).css('cursor', 'auto');
	}

	console.log(e);
	console.log(e.clientY);
});
$('#select-img-canvas').bind('mouseup', function(e) {
	canResize = false;
	canMove = false;
	if (avatarD > divWidth - Math.max(avatarX, avatarY)) {
		avatarD = divWidth - Math.max(avatarX, avatarY);
		draw();
	}
});
$('#select-img-canvas').bind('mouseout', function() {
	canResize = false;
	canMove = false;
	if (avatarD > divWidth - Math.max(avatarX, avatarY)) {
		avatarD = divWidth - Math.max(avatarX, avatarY);
		draw();
	}
});
$('#select-img-canvas').bind('mousemove', function(e) {
	if (canResize) {
		avatarD = e.offsetY - (avatarY + avatarR * 1.707) + avatarD;
		draw();
	} else if (canMove) {
		if (avatarY + avatarD > divWidth) {
			avatarY = divWidth - avatarD;
		}
		if (avatarX + avatarD > divWidth) {
			avatarX = divWidth - avatarD;
		}
		if (avatarX < 0) {
			avatarX = 0;
		}
		if (avatarY < 0) {
			avatarY = 0;
		}
		avatarX = e.offsetX - oriX + avatarX;
		avatarY = e.offsetY - oriY + avatarY;
		draw();
		oriX = e.offsetX;
		oriY = e.offsetY;
	}
});