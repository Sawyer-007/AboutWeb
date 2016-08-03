## avatar.js ##
### 2016-8-3更新 ###
1. 接触对JQuery的依赖
2. 对选择图像的边缘做了优化
### 效果图 ###
![效果图](http://imgsrc.baidu.com/forum/w%3D580/sign=dbb828433d87e9504217f3642039531b/8aaaa2ec8a1363270f68e5b3968fa0ec09fac71a.jpg)
### 代码用例 ###
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<title></title>
			<style type="text/css">
				.can {
					position: relative;
					height: 400px;
					width: 400px;
				}
				.pre {
					position: relative;
					height: 200px;
					width: 400px;
				}
			</style>
		</head>
		<body>
			<div class="can">
				<canvas class="avatar-select" id="can-opt" width="340" height="340"></canvas>
			</div>
			
			<div class="pre">
				<canvas class="avatar-preview" width="100" height="100" data-from="can-opt" data-round></canvas>
				<canvas class="avatar-preview" width="80" height="80" data-from="can-opt" data-round></canvas>
				<canvas class="avatar-preview" width="50" height="50" data-from="can-opt"></canvas>
			</div>
			<input  class="pre" type="file" data-for="can-opt" id="fileinpu"/>
			<script src="js/jquery-2.2.1.min.js"></script>
			<script type="text/javascript" src="js/avatar.js ></script>
		</body>
	</html>
### 使用说明 ###
+ 创建canvas标签， 设置class="avatar-select", id自定义，例如id="avatar"
+ 图片上传标签需加入 data-fot="avatar" 与canvas id一致
+ 创建图像预览需要创建canvas标签， 设置class="avatar-preview" ， 如果需要展示圆形则加入data-round
+ 所有canvas都应该在标签中明确指出width 和 height

## avatar-mobile.js ##
### 效果图 ###
![](http://imgsrc.baidu.com/forum/w%3D580/sign=09da1aeeae1ea8d38a22740ca70a30cf/a2742a3fb80e7bec6ec7aeb4272eb9389b506b3f.jpg)

### 代码用例 ###
	selectFromCanmera: function () {
        var self = this;
        var cmr = plus.camera.getCamera();
        var res = cmr.supportedImageResolutions[0];
        var fmt = cmr.supportedImageFormats[0];
        console.log("Resolution: "+res+", Format: "+fmt);
        cmr.captureImage(function (path) {
          var p = plus.io.convertLocalFileSystemURL(path);
          $avatar.setImg(p);
          self.isSelect = true;  
        }, function (error) {
          
        }, {
          resolution: res,
          format: fmt
        });
      },
### 使用说明 ###
+ html使用方法同avatar.js
+ 在移动端提供设置图像路径接口 $avatar.setImg(url)