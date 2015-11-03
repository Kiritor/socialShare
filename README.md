#socialShare
简单高效的社会化分享插件(sns-share)

当站点需要添加社会化分享功能的时候,一般会想到baiduShare,或者JiaThis这类的第三方分享聚合工具,通过灵活的配置很快的就能实现分享功能.

不过,这种方式也有一些弊端:**性能问题**和**自定义不方便**,界面,交互的体验不是非常好.笔者在自己的个人博客里面也想实现社会化分享功能,而且一向崇尚简洁,因此就自己实现了这款社会化分享插件.
##特性
简单,高效,酷炫顺畅的交互体验,目前可以分享的平台有:**腾讯微博**,**新浪微博**,**QQ空间**,**豆瓣**,**微信**,如图所示:
<center>![sns-share](snapshot.gif)</center>
##用法
此插件是基于jquery的,因此需要先引入jquery文件,之后在引入样式及js文件:
<code>
<link rel="stylesheet" href="css/share.css" type="text/css" />
<script src="js/share.js" type="text/javascript"></script>
</code>
1. 组件分享
组件的方式使用,代码如下:
<code>
<div id="socialShare"></div>
 $(function() {

            $("#socialShare").socialShare({
                content: '自己动手编写jquery插件',
				url:'http://kiritor.github.io/2015/09/28/shiro-Authentication/',
				titile:'自己动手编写jquery插件title'
            });

 });
</code>
这种方式可以出现多个分享,分享组件的样式如上图所示
2. 单独分享
也可以自己定义单个按钮的样式,独立分享,例如:
<code>
<a id="shareQQ" class="className">分享到QQ空间</a>
$("#shareQQ").on("click",function(){
	$(this).socialShare("tQQ");
})
</code>
插件提供一些单独的分享方法,当然也可以自己定义参数
<code>
$("#shareQQ").on("click",function(){
	$(this).socialShare("tQQ",{
	    url:'',
		content,'',
		title:''
	});
})
</code>