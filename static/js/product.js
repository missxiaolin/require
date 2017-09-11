$(function () {
    // 导航区域
    $('nav ul li').click(function () {
        var index = $(this).index();
        $(this).attr('class', 'tabHover').siblings('li').attr('class', '');
        $('.right_box').eq(index).show().siblings('.right_box').hide();
    })

    // 筛选区域（复用）// 品牌口碑(口碑分类)
    var obj = new Object();
    obj.node = $('#center_box #content_box .right_box .brand_compare .list_sort a');
    side(obj, "curr");
    // 产品方案(产品分类)
    objB = new Object();
    objB.node = $('#center_box #content_box .right_box .product_info .list_sort a');
    side(objB, "curr");
    // 函数工厂
    function side(obj, clas) {
        obj.node.click(function () {
            $(this).addClass(clas).siblings().removeClass(clas);
        })
    }

// 企业信息（战略合作商-轮播）
    var info = new Object();
    info.node = $('#center_box #content_box .right_box .enterprise_info .list_content .developer');
    info.c = 0;
    slides(info);
//		状态变量
    function slides(obj) {
        var oul = obj.node.find('.lb_ul li').first().html();
        //使最后一个跟第一个一样轮播图
        obj.node.find('.lb_ul').append('<li>' + oul + '</li>');
//			为右按钮添加点击事件      （未解决）
        var sta = 1;
        $(obj.node).find('.btnR').click(function () {
            if (sta==1) {//如果不等于1，就表示元素正在运动状态，后面的代码都不执行
                sta = 2;
                obj.c--;
                if (obj.c==-1) {
                    $(obj.node).find('.lb_ul').css('left','-3881');
                    obj.c = 1;
                }
                var left = obj.c*-757;
                alert(left);
                sta = 2;//运动状态
                $(obj.node).find('.lb_ul').animate({'left':left+'px'},500,function(){
                    sta = 1;
                });
            }
        })
        //		为左按钮加入单击事件
        $(obj.node).find(".btnL").click(function () {
            if(sta==1){
                sta=2;
                obj.c++;
                var li_num = obj.node.find('.lb_ul li').length;
                if(obj.c==li_num-1){
                    $(obj.node).find('.lb_ul').css('left',0+'px');
                    obj.c=1;
                }
                var left = obj.c*-757;
                sta = 2;
                $(obj.node).find('.lb_ul').animate({'left':left+"px"},500,function(){
                    sta=1;
                });
            }

        })
//			定时器
        function move() {
            obj.t = setInterval(function () {
                obj.c++;
                //			判断c到末调整到0;
                var li_num = obj.node.find('.lb_ul li').length;
                if (obj.c == li_num) {
                    //				c到3的时候,让left值到0,移到第一张图片上
                    $(obj.node).find('.lb_ul').css('left', '0');
                    //				调到1号图片
                    obj.c = 1;
                }
                //			计算c相对应的left值
                var left = obj.c * -757;
                //			改动大div left值 移动
                $(obj.node).find('.lb_ul').animate({
                    'left': left + 'px'
                });

            }, 3000)
        }
        move();
//			移入显示隐藏   清除定时器    打开定时器
        $(obj.node).mouseover(function(){

            clearInterval(obj.t);
        })
        $(obj.node).mouseout(function(){
            move();
        })
    }
})