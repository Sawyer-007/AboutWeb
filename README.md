# AboutWeb #
## 简介 ##
这是我在学习web前端时自己写的一些东西，包括HTML，BootStrap,JS,AS等。</br>
用webstorm编辑网站时，记得用git 中的 .gitignore 来忽略.idea文件夹
### index.html ###
杂七杂八的一些知识，其中最顶端的列表实现了在装备管理系统左侧导航条未实现的功能，即点击展开，点击收缩。用JQuery实现对checked状态下的复选框值的读取。以及一些html标签的使用。
### turn.html ###
利用JQuery 做了一个轮播图 JS源码见turn.js
### Angular.html ###
学习AS的地方
### resume.html ###
是一个仅用CSS制作的极简风格的简历模板，用到了BootStrap的标志文字库和进度条。
### jslearn.html ###
js学习过程的实验室。</br>
1. 阻止冒泡的方法：a.使用e.stopPropagation()方法。b.设置cancelBubble: true。但一般使用e.stopPropagation方法。</br>
2. 事件监听（DOM2）addEventListener("click",function(){},true/false),true表示在事件捕获阶段，false表示在事件冒泡阶段处理程序。
### csslearn.html ###
CSS学习过程中的实验室</br>
1. 块级元素居中方法1:使用display:box;height;利用box-pack和box-align来使元素居中，优点：对于任何元素都适用。缺点：IE兼容性差。</br>
2. 居中方法2:在position:absolute/fix；利用top，left 50%进行居中，并用transform:translate(-50%,-50%);来调整，缺点：IE。
