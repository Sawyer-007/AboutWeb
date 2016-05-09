
var AvatarSelect = function (dom) {
	this.init(dom);
};
$.extend(AvatarSelect.prototype, {
	
	init: function (dom) {
		this.height = dom.attr("height");
		this.width = dom.attr("width");
		this.id = dom.attr("id");
		this.dom = dom;
		this.avatarX = this.width / 4;
		this.avatarY = this.height / 4;
		this.avatarD = this.height / 2;
		this.avatarR = this.avatarD / 2;
		this.canResize = false;
		this.canMove = false;
		this.previewList = [];
		
		var html = '<canvas id="'+this.id+'-bk" height="'+this.height+'" width="'+this.width+'"></canvas>';
		dom.after(html);
		
		this.addPreview(this.id);
		this.fileSelect = new FileSelect($('input[data-for="'+this.id+'"]'), this);
		this.setStyle();
		this.addFunction(this.id);
		
	},
	setStyle: function () {
		this.dom.css({
			'position': 'absolute',
			'top': '0',
			'left': '0', 
			'z-index': '9999' 
		});
		$('#' + this.id + '-bk').css({
			'position': 'absolute',
			'top': '0',
			'left': '0', 
		});
	},
	drawOpt: function (canvasCtx) {
		if(!canvasCtx) {
			canvasCtx = document.getElementById(this.id).getContext('2d');
		}
		this.avatarR = this.avatarD / 2;
		canvasCtx.clearRect(0, 0, this.width, this.height);
		canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.6)';
		canvasCtx.fillRect(0, 0, this.width, this.height);
		canvasCtx.clearRect(this.avatarX, this.avatarY, this.avatarD, this.avatarD);
		canvasCtx.strokeStyle = 'rgba(255, 255, 255, 0)';
		canvasCtx.beginPath();
		canvasCtx.moveTo(this.avatarX + this.avatarD, this.avatarY + this.avatarR); //e
		canvasCtx.arc(this.avatarX + this.avatarR, this.avatarY + this.avatarR, this.avatarR, 0, Math.PI / 2, false); // e to s
		canvasCtx.moveTo(this.avatarX + this.avatarR, this.avatarY + this.avatarD); //s
		canvasCtx.lineTo(this.avatarX + this.avatarD, this.avatarY + this.avatarD); // s to es
		canvasCtx.lineTo(this.avatarX + this.avatarD, this.avatarY + this.avatarR); // es to e
		canvasCtx.moveTo(this.avatarX + this.avatarD, this.avatarY + this.avatarR); // e
		canvasCtx.arc(this.avatarX + this.avatarR, this.avatarY + this.avatarR, this.avatarR, 0, Math.PI * 3 / 2, true);
		canvasCtx.moveTo(this.avatarX + this.avatarR, this.avatarY);
		canvasCtx.lineTo(this.avatarX + this.avatarD, this.avatarY);
		canvasCtx.lineTo(this.avatarX + this.avatarD, this.avatarY + this.avatarR);
		canvasCtx.moveTo(this.avatarX + this.avatarD, this.avatarY + this.avatarR);
		canvasCtx.moveTo(this.avatarX, this.avatarY + this.avatarR);
		canvasCtx.arc(this.avatarX + this.avatarR, this.avatarY + this.avatarR, this.avatarR, Math.PI, Math.PI * 3 / 2, false);
		canvasCtx.moveTo(this.avatarX + this.avatarR, this.avatarY);
		canvasCtx.lineTo(this.avatarX, this.avatarY);
		canvasCtx.lineTo(this.avatarX, this.avatarY + this.avatarR);
		canvasCtx.moveTo(this.avatarX, this.avatarY + this.avatarR);
		canvasCtx.arc(this.avatarX + this.avatarR, this.avatarY + this.avatarR, this.avatarR, Math.PI, Math.PI / 2, true);
		canvasCtx.moveTo(this.avatarX + this.avatarR, this.avatarY + this.avatarD);
		canvasCtx.lineTo(this.avatarX, this.avatarY + this.avatarD);
		canvasCtx.lineTo(this.avatarX, this.avatarY + this.avatarR);
		canvasCtx.moveTo(this.avatarX, this.avatarY + this.avatarR);
		canvasCtx.fill();
		canvasCtx.closePath();
		canvasCtx.stroke();
		canvasCtx.beginPath();
		canvasCtx.fillStyle = 'rgba(255, 255, 255, 1)';
		canvasCtx.strokeStyle = 'rgba(0, 0, 0, 1)';
		canvasCtx.arc(this.avatarX + this.avatarR * 1.707, this.avatarY + this.avatarR * 1.707, 5, 0, Math.PI * 2, true);
		canvasCtx.fill();
		canvasCtx.stroke();	
		
		this.previewList.forEach(function (el) {
			el.setImage();
		});
	},
	addFunction: function (id) {
		var self = this;
		var oriX = 0;
		var oriY = 0;
		$('#' + id).bind('mousemove', function(e) {
			if ((Math.pow(e.offsetX - (self.avatarX + self.avatarR * 1.707), 2) + Math.pow(e.offsetY - (self.avatarY + self.avatarR * 1.707), 2)) <= 25) {
				$(this).css('cursor', 'nwse-resize');
			} else if ((Math.pow(e.offsetX - (self.avatarX + self.avatarR), 2) + Math.pow(e.offsetY - (self.avatarY + self.avatarR), 2)) <= Math.pow(self.avatarR, 2)) {
				$(this).css('cursor', 'move');
			} else {
				$(this).css('cursor', 'auto');
			}
		});
		$('#' + id).bind('mousedown', function(e) {
			if ((Math.pow(e.offsetX - (self.avatarX + self.avatarR * 1.707), 2) + Math.pow(e.offsetY - (self.avatarY + self.avatarR * 1.707), 2)) <= 25) {
				self.canResize = true;
				$(this).css('cursor', 'nwse-resize');
			} else if ((Math.pow(e.offsetX - (self.avatarX + self.avatarR), 2) + Math.pow(e.offsetY - (self.avatarY + self.avatarR), 2)) <= Math.pow(self.avatarR, 2)) {
				self.canMove = true;
				$(this).css('cursor', 'move');
				oriX = e.offsetX;
				oriY = e.offsetY;
			} else {
				$(this).css('cursor', 'auto');
			}
		});
		$('#' + id).bind('mouseup', function(e) {
			if ((self.avatarD > Math.min(self.height, self.width) - Math.max(self.avatarX, self.avatarY)) && self.canResize) {
				self.avatarD = Math.min(self.height, self.width) - Math.max(self.avatarX, self.avatarY);
				self.drawOpt();
			}
			self.canResize = false;
			self.canMove = false;
		});
		$('#' + id).bind('mouseout', function() {
			if ((self.avatarD > Math.min(self.height, self.width) - Math.max(self.avatarX, self.avatarY)) && self.canResize) {
				self.avatarD = Math.min(self.height, self.width) - Math.max(self.avatarX, self.avatarY);
				self.drawOpt();
			}
			self.canResize = false;
			self.canMove = false;
		});
		$('#' + id).bind('mousemove', function(e) {
			if (self.canResize) {
				self.avatarD = e.offsetY - (self.avatarY + self.avatarR * 1.707) + self.avatarD;
				self.drawOpt();
			} else if (self.canMove) {
				if (self.avatarY + self.avatarD > self.height) {
					self.avatarY = self.height - self.avatarD;
				}
				if (self.avatarX + self.avatarD > self.width) {
					self.avatarX = self.width - self.avatarD;
				}
				if (self.avatarX < 0) {
					self.avatarX = 0;
				}
				if (self.avatarY < 0) {
					self.avatarY = 0;
				}
				self.avatarX = e.offsetX - oriX + self.avatarX;
				self.avatarY = e.offsetY - oriY + self.avatarY;
				self.drawOpt();
				oriX = e.offsetX;
				oriY = e.offsetY;
			}
		});
	},
	addPreview: function (id) {
		var self = this;
		var preDom = $('canvas[data-from="'+id+'"]');
		preDom.each(function (index, el) {
			self.previewList.push(new AvatarPreview($(this), self));
		});
	}
});

var AvatarPreview = function (dom, container) {
	this.init(dom, container);
};
$.extend(AvatarPreview.prototype, {
	
	init: function (dom, container) {
		this.width = dom.attr("width");
		this.height = dom.attr("height");
		this.data = dom.attr("data-from") + '-bk';
		this.container = container;
		this.dom = dom;
		if (typeof dom.attr("round") != 'undefined') {
			dom.css('border-radius','50%');
		}
	},
	setImage: function () {
		var oriCanvas = document.getElementById(this.data);
		
		var ctx = this.dom[0].getContext('2d');	
		ctx.clearRect(0, 0, this.width, this.height);	
		ctx.drawImage(oriCanvas, this.container.avatarX, this.container.avatarY, this.container.avatarD, this.container.avatarD, 0, 0, this.width, this.height);
	}
});

var FileSelect = function (dom, container) {
	this.init(dom, container);
};
$.extend(FileSelect.prototype, {
	
	init: function (dom, container) {
		this.container = container;
		this.dom = dom;
		this.target = document.getElementById(dom.attr("data-for") + '-bk');
		this.addFunction(dom);
	},
	addFunction: function () {
		var self = this;
		
		this.dom.bind('change', function(e) {
			var canvas = self.target.getContext('2d');
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
					canvas.clearRect(0, 0, $('#' + self.dom.attr("data-for") + '-bk').attr("width"), $('#' + self.dom.attr("data-for") + '-bk').attr("height"))
					canvas.drawImage(img, 0, 0);
					self.container.drawOpt(document.getElementById(self.container.id).getContext('2d'));
				}
				img.src = this.result;
			}
		});
	}
});

$(function () {
	new AvatarSelect($('.avatar-select'));
})
