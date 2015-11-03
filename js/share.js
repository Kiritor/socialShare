/**
 * @Author:L.Tap
 * @Description: 社会化分享
 */

;
(function($, window, document, undefined) {
    //插件初始化
    function init(target, options) {
        var settings = $.extend({}, $.fn.socialShare.defaults, options);
		//初始化各个组件
        var $msb_main = "<a class='msb_main'><img title='分享' src='images/share_core_square.jpg'></a>";
        var $social_group = "<div class='social_group'>"
		+ "<a target='_blank' class='msb_network_button weixin'>weixin</a>"
		+ "<a target='_blank' class='msb_network_button weibo'>weibo</a>"
		+ "<a target='_blank' class='msb_network_button tQQ'>tQQ</a>"
		+ "<a target='_blank' class='msb_network_button qZone'>qZone</a>"
		+ "<a target='_blank' class='msb_network_button douban'>douban</a>"
		+ "</div>";
        $(target).append($msb_main);
        $(target).append($social_group);
        $(target).addClass("socialShare");


		//添加腾讯微博分享事件
		$(document).on("click",".msb_network_button.tQQ",function(){
			tQQ(this,settings);
		});
		//添加QQ空间分享事件
		$(document).on("click",".msb_network_button.qZone",function(){
			qZone(this,settings);
		});
        $(document).on("click",".msb_main",function(){
			 if ($(this).hasClass("disabled")) return;
            var e = 500;//动画时间
            var t = 250;//延迟时间
            var r = $(this).parent().find(".msb_network_button").length;  //分享组件的个数
            var i = 60;
            var s = e + (r - 1) * t;
            var o = 1;
            var a = $(this).outerWidth();
            var f = $(this).outerHeight();
            var c = $(this).parent().find(".msb_network_button:eq(0)").outerWidth();
            var h = $(this).parent().find(".msb_network_button:eq(0)").outerHeight();
            var p = (a - c) / 2; //起始位置
            var d = (f - h) / 2; //起始位置
            var v = 0 / 180 * Math.PI;
            if (!$(this).hasClass("active")) {
                $(this).addClass("disabled").delay(s).queue(function(e) {
                    $(this).removeClass("disabled").addClass("active");
                    e()
                });
                $(this).parent().find(".msb_network_button").each(function() {
                    var n = p + (p + i * o) * Math.cos(v);  //结束位置
                    var r = d + (d + i * o) * Math.sin(v);  //结束位置
                    $(this).css({
                        display: "block",
                        left: p + "px",
                        top: d + "px"
                    }).stop().delay(t * o).animate({
                        left: n + "px",
                        top: r + "px"
                    }, e);
                    o++
                })
            } else {
                o = r;
                $(this).addClass("disabled").delay(s).queue(function(e) {
                    $(this).removeClass("disabled").removeClass("active");
                    e()
                });
                $(this).parent().find(".msb_network_button").each(function() {
                    $(this).stop().delay(t * o).animate({
                        left: p,
                        top: d
                    }, e);
                    o--
                })
            }
		});



    }

	function replaceAPI (api,options) {
		api = api.replace('{url}', options.url);
		api = api.replace('{title}', options.title);
		api = api.replace('{content}', options.content);
		api = api.replace('{pic}', options.pic);

		return api;
	}

	function tQQ(target,options){
	    var options = $.extend({}, $.fn.socialShare.defaults, options);

		window.open(replaceAPI(tqq,options));
	}

	function qZone(target,options){
		var options = $.extend({}, $.fn.socialShare.defaults, options);

		window.open(replaceAPI(qzone,options));
	}

    $.fn.socialShare = function(options, param) {
        if(typeof options == 'string'){
		    var method = $.fn.socialShare.methods[options];
			if(method)
				return method(this,param);
		}else
			init(this,options);
    }


    //插件默认参数
    $.fn.socialShare.defaults = {
        url: window.location.href,
        title: document.title,
        content: '',
        pic: ''
    }

	//插件方法
	$.fn.socialShare.methods = {
		//初始化方法
		init:function(jq,options){
			return jq.each(function(){
				init(this,options);
			});
		},
		tQQ:function(jq,options){
			return jq.each(function(){
				tQQ(this,options);
			})
		},
		qZone:function(jq,options){
			return jq.each(function(){
				qZone(this,options);
			})
		}
	}


	//分享地址
	var qzone = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}&pics={pic}&summary={content}';
	var weibo = 'http://service.weibo.com/share/share.php?url={url}&title={title}&pic={pic}&searchPic=false';
	var tqq = 'http://share.v.t.qq.com/index.php?c=share&a=index&url={url}&title={title}&appkey=801cf76d3cfc44ada52ec13114e84a96';
	var douban = 'http://www.douban.com/share/service?href={url}&name={title}&text={content}&image={pic}';
	var weixin = 'http://qr.liantu.com/api.php?text={url}';


})(jQuery, window, document);
