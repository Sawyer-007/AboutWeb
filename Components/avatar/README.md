## avatar.js ##
### 效果图 ###
![效果图](http://imgsrc.baidu.com/forum/w%3D580/sign=dbb828433d87e9504217f3642039531b/8aaaa2ec8a1363270f68e5b3968fa0ec09fac71a.jpg)
### 使用方法 ###
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
				<canvas class="avatar-preview" width="100" height="100" data-from="can-opt" round></canvas>
				<canvas class="avatar-preview" width="80" height="80" data-from="can-opt" round></canvas>
				<canvas class="avatar-preview" width="50" height="50" data-from="can-opt"></canvas>
			</div>
			<input  class="pre" type="file" data-for="can-opt" id="fileinpu"/>
			<script src="js/jquery-2.2.1.min.js"></script>
			<script type="text/javascript" src="js/avatar.js" ></script>
		</body>
	</html>

**依赖于 JQuery**  

上传头像的操作部分  
创建一个 **canvas** 标签  
将class设置为 **avatar-select**  
id自定义

预览部分  
创建 **canvas** 标签  
类名 **avatar-preview**  
大小通过 **width,height** 设定  
数据链接 **data-from='id'** 设定  
圆形则加 **round** 属性

上传文件
数据绑定 **data-for** 设定