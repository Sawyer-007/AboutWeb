var $avatar;
function ready(fn){
	if(document.addEventListener){
		//标准浏览器
		document.addEventListener('DOMContentLoaded',function(){
			//注销事件，避免反复触发
			document.removeEventListener('DOMContentLoaded',arguments.callee,false);
			//执行函数
			fn();
		},false);
	}else if(document.attachEvent){
		//IE浏览器
		document.attachEvent('onreadystatechange',function(){
			if(document.readyState=='complete'){
				document.detachEvent('onreadystatechange',arguments.callee);
				//执行函数
				fn();
			}
		});
	}
}

ready(function () {
	var $sq = {
		extend: function (obj, opt) {
			for (var key in opt) {
				obj[key] = opt[key];
			}
			return this;
		}
	};
	var Avatar = function (dom) {
		this.init(dom);
	};
	$sq.extend(Avatar.prototype, {
		init: function (dom) {
			this.height = dom.getAttribute('height');
			this.width = dom.getAttribute("width");
			this.id = dom.getAttribute("id");
			this.dom = dom;
			this.avatarX = this.width / 4;
			this.avatarY = this.height / 4;
			this.avatarD = this.height / 2;
			this.avatarR = this.avatarD / 2;
			this.canResize = false;
			this.canMove = false;
			this.previewList = [];

			var html = '<canvas id="'+this.id+'-bk" height="'+this.height+'" width="'+this.width+'"></canvas>';
			dom.insertAdjacentHTML('afterend', html);
			this.bk = document.getElementById(this.id + '-bk');

			this.addPreview(this.id);
			this.fileSelect = new FileSelect(document.querySelector('input[data-for="'+this.id+'"]') , this);
			this.setStyle();
			this.addFunction();
		},
		setEdge: function (dx, dy, width, height) {
			this.xEdge = dx + width;
			this.yEdge = dy + height;
			console.log(dx, dy);
			this.xFrom = dx;
			this.yFrom = dy;
		},
		setStyle: function () {
			$sq.extend(this.dom.style, {
				position: 'absolute',
				top: '0',
				left: '0',
				zIndex: '1000'
			});
			$sq.extend(this.bk.style, {
				position: 'absolute',
				top: '0',
				left: '0',
			});
		},
		drawOpt: function (canvasCtx) {
			if(!canvasCtx) {
				canvasCtx = this.dom.getContext('2d');
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
		addFunction: function () {
			var self = this;
			var oriX = 0;
			var oriY = 0;
			this.dom.addEventListener('mousemove', function(e) {
				if ((Math.pow(e.offsetX - (self.avatarX + self.avatarR * 1.707), 2) + Math.pow(e.offsetY - (self.avatarY + self.avatarR * 1.707), 2)) <= 25) {
					self.dom.style.cursor = 'nwse-resize';
				} else if ((Math.pow(e.offsetX - (self.avatarX + self.avatarR), 2) + Math.pow(e.offsetY - (self.avatarY + self.avatarR), 2)) <= Math.pow(self.avatarR, 2)) {
					self.dom.style.cursor = 'move';
				} else {
					self.dom.style.cursor = 'auto';
				}
			});
			this.dom.addEventListener('mousedown', function(e) {
				if ((Math.pow(e.offsetX - (self.avatarX + self.avatarR * 1.707), 2) + Math.pow(e.offsetY - (self.avatarY + self.avatarR * 1.707), 2)) <= 25) {
					self.canResize = true;
					self.dom.style.cursor = 'nwse-resize';
				} else if ((Math.pow(e.offsetX - (self.avatarX + self.avatarR), 2) + Math.pow(e.offsetY - (self.avatarY + self.avatarR), 2)) <= Math.pow(self.avatarR, 2)) {
					self.canMove = true;
					self.dom.style.cursor = 'move';
					oriX = e.offsetX;
					oriY = e.offsetY;
				} else {
					self.dom.style.cursor = 'auto';
				}
			});
			this.dom.addEventListener('mouseup', function(e) {
				if ((self.avatarD > Math.min((self.xEdge - self.xFrom), (self.yEdge - self.yFrom))) && self.canResize) {
					self.avatarD = Math.min((self.xEdge - self.xFrom), (self.yEdge - self.yFrom));
					self.drawOpt();
				}
				self.canResize = false;
				self.canMove = false;
			});
			this.dom.addEventListener('mouseout', function() {
				if ((self.avatarD > Math.min((self.xEdge - self.xFrom), (self.yEdge - self.yFrom))) && self.canResize) {
					self.avatarD = Math.min((self.xEdge - self.xFrom), (self.yEdge - self.yFrom));
					self.drawOpt();
				}
				self.canResize = false;
				self.canMove = false;
			});
			this.dom.addEventListener('mousemove', function(e) {
				if (self.canResize) {
					self.avatarD = e.offsetY - (self.avatarY + self.avatarR * 1.707) + self.avatarD;
					self.drawOpt();
				} else if (self.canMove) {
					if (self.avatarY + self.avatarD > self.yEdge) {
						self.avatarY = Math.floor(self.yEdge - self.avatarD);
					}
					if (self.avatarX + self.avatarD > self.xEdge) {
						self.avatarX = Math.floor(self.xEdge - self.avatarD);
					}
					if (self.avatarX < self.xFrom) {
						self.avatarX = Math.floor(self.xFrom);
					}
					if (self.avatarY < self.yFrom) {
						self.avatarY = Math.floor(self.yFrom);
					}
					console.log(self.avatarX);
					self.avatarX = e.offsetX - oriX + self.avatarX;
					self.avatarY = e.offsetY - oriY + self.avatarY;
					self.drawOpt();
					oriX = e.offsetX;
					oriY = e.offsetY;
				}
			});
		},
		addPreview: function () {
			var self = this;
			var preDom = document.querySelectorAll('.avatar-preview');
			for (var i = 0; i < preDom.length; i++) {
				self.previewList.push(new AvatarPreview(preDom[i], self));
			}
		}
	});

	var AvatarPreview = function (dom, container) {
		this.init(dom, container);
	};
	$sq.extend(AvatarPreview.prototype, {
		init: function (dom, container) {
			this.width = dom.getAttribute("width");
			this.height = dom.getAttribute("height");
			this.container = container;
			this.parentId = this.container.bk;
			this.dom = dom;
			if (typeof this.dom.getAttribute("data-round") === 'string' ) {
				this.dom.style.borderRadius = '50%';
			}
		},
		setImage: function () {
			var ctx = this.dom.getContext('2d');
			ctx.clearRect(0, 0, this.width, this.height);
			ctx.drawImage(this.parentId, this.container.avatarX, this.container.avatarY, this.container.avatarD, this.container.avatarD, 0, 0, this.width, this.height);
		}
	});

	var FileSelect = function (dom, container) {
		this.init(dom, container);
	};
	$sq.extend(FileSelect.prototype, {
		init: function (dom, container) {
			this.container = container;
			this.dom = dom;
			this.target = this.container.bk;
			this.addFunction(dom);
		},
		addFunction: function () {
			var self = this;

			this.dom.addEventListener('change', function(e) {
				var canvas = self.target.getContext('2d');
				var imgFile = e.target.files[0];
				var canvasWidth = self.target.getAttribute("width");
				var canvasHeight = self.target.getAttribute("height");
				if (!imgFile) {
					return;
				}
				var reader = new FileReader();
				reader.readAsDataURL(imgFile);
				reader.onload = function(e) {
					var img = new Image();
					img.onload = function() {
						var imgScale = (img.height / img.width).toFixed(3);
						console.log(img.height, img.width);
						var imgHeight = 0;
						var imgWidth = 0;
						var dX = 0; //destination the start position in x
						var dY = 0; //destination the start position in y
						if (imgScale >= 1) {
							imgHeight = canvasHeight;
							imgWidth = Math.floor(imgHeight / imgScale);
							dX = (canvasWidth - imgWidth) / 2;
						}
						else {
							imgWidth = canvasWidth;
							imgHeight = imgWidth * imgScale;
							dY = (canvasHeight - imgHeight) / 2;
						}
						canvas.clearRect(0, 0, canvasWidth, canvasHeight)
						canvas.drawImage(img, 0, 0, img.width, img.height, dX, dY, imgWidth, imgHeight);
						self.container.setEdge(dX, dY, imgWidth, imgHeight);
						self.container.drawOpt(self.container.dom.getContext('2d'));
					}
					img.src = this.result;
				}
			});
		}
	});
	new Avatar(document.querySelector('.avatar-select'));
})();
