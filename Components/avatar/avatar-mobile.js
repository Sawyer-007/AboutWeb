
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
		this.bkCtx = document.getElementById(this.id + '-bk').getContext('2d');
		
		this.addPreview(this.id);
		this.setStyle();
		this.addFunction(this.id);
		
	},
	setImg: function (path) {
	  var self = this;
	  var img = new Image();
    img.onload = function() {
      var imgScale = (img.height / img.width).toFixed(3);
      var imgHeight = 0;
      var imgWidth = 0;
      var dX = 0; //destination the start position in x
      var dY = 0; //destination the start position in y
      if (imgScale >= 1) {
        imgHeight = self.height;
        imgWidth = Math.floor(imgHeight / imgScale);
        dX = (self.width - imgWidth) / 2;
      }
      else {
        imgWidth = self.width;
        imgHeight = imgWidth * imgScale;
        dY = (self.height - imgHeight) / 2;
      }
      self.bkCtx.clearRect(0, 0, self.width, self.height);
      self.bkCtx.drawImage(img, 0, 0, img.width, img.height, dX, dY, imgWidth, imgHeight);
      self.drawOpt(document.getElementById(self.id).getContext('2d'));
    }
    img.src = path;
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
		canvasCtx.arc(this.avatarX + this.avatarR * 1.707, this.avatarY + this.avatarR * 1.707, 12, 0, Math.PI * 2, true);
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
		$('#' + id).bind('touchstart', function(e) {
      var element = e.target;
      var offsetX = 0;
      var offsetY = 0;
      
      if (element.offsetParent) {
        do {
          offsetX += element.offsetLeft;
          offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
      }
      
		  var xp = e.originalEvent.changedTouches[0].clientX - offsetX; 
		  var yp = e.originalEvent.changedTouches[0].clientY - offsetY; 
			if ((Math.pow(xp - (self.avatarX + self.avatarR * 1.707), 2) + Math.pow(yp - (self.avatarY + self.avatarR * 1.707), 2)) <= 256) {
				self.canResize = true;
			} else if ((Math.pow(xp - (self.avatarX + self.avatarR), 2) + Math.pow(yp - (self.avatarY + self.avatarR), 2)) <= Math.pow(self.avatarR, 2)) {
				self.canMove = true;
				oriX = xp;
				oriY = yp;
			}
		});
		$('#' + id).bind('touchend', function(e) {
			if ((self.avatarD > Math.min(self.height, self.width) - Math.max(self.avatarX, self.avatarY)) && self.canResize) {
				self.avatarD = Math.min(self.height, self.width) - Math.max(self.avatarX, self.avatarY);
				self.drawOpt();
			}
			self.canResize = false;
			self.canMove = false;
		});
		$('#' + id).bind('touchmove', function(e) {
		  e.preventDefault();
		  var element = e.target;
      var offsetX = 0;
      var offsetY = 0;
      
      if (element.offsetParent) {
        do {
          offsetX += element.offsetLeft;
          offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
      }
      
      var xp = e.originalEvent.changedTouches[0].clientX - offsetX; 
      var yp = e.originalEvent.changedTouches[0].clientY - offsetY; 
			if (self.canResize) {
				self.avatarD = yp - (self.avatarY + self.avatarR * 1.707) + self.avatarD;
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
				self.avatarX = xp - oriX + self.avatarX;
				self.avatarY = yp - oriY + self.avatarY;
				self.drawOpt();
				oriX = xp;
				oriY = yp;
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

var syzAvatar;
$(function () {
	syzAvatar = new AvatarSelect($('.avatar-select'));
})
