/**
 * @Author:L.Tap
 * @Description: 社会化分享
 */

;
(function($, window, document, undefined) {
    //插件初始化
    function init(target, options) {
        var settings = $.extend({}, $.fn.socialShare.defaults, options);
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

        //添加事件
        $(target).on("click", function() {
            if ($(this).hasClass("disabled")) return;
            var e = 500;//动画时间
            var t = 250;//延迟时间
            var r = $(this).find(".msb_network_button").length;  //分享组件的个数
            var i = 60;
            var s = e + (r - 1) * t;
            var o = 1;
            var a = $(this).outerWidth();
            var f = $(this).outerHeight();
            var c = $(this).find(".msb_network_button:eq(0)").outerWidth();
            var h = $(this).find(".msb_network_button:eq(0)").outerHeight();
            var p = (a - c) / 2; //起始位置
            var d = (f - h) / 2; //起始位置
            var v = 0 / 180 * Math.PI;
            if (!$(this).hasClass("active")) {
                $(this).addClass("disabled").delay(s).queue(function(e) {
                    $(this).removeClass("disabled").addClass("active");
                    e()
                });
                $(this).find(".msb_network_button").each(function() {
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
                $(this).find(".msb_network_button").each(function() {
                    $(this).stop().delay(t * o).animate({
                        left: p,
                        top: d
                    }, e);
                    o--
                })
            }
        });

    }

    $.fn.socialShare = function(options, param) {
        init(this, options);
    }


    //插件默认参数
    $.fn.socialShare.defaults = {
        url: window.location.href,
        title: document.title,
        content: '',
        pic: ''
    }


})(jQuery, window, document);
