(function ($) {
    $.maps = { set: function (arg) {
        // 自定义
        var defaults = {
            element:'main',
// 			数组
            data:[
                {name:'中国'}
            ],
//       	是否显示省份
            is_province:true,
            is_show:true,
            is_click:false,
        }
//		合并
        var options = $.extend(defaults, arg);
        require.config({
            paths: {
                echarts: 'http://echarts.baidu.com/build/dist'
            }
        });
        // 使用
        require(['echarts','echarts/chart/map'],function (ch) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ch.init(document.getElementById(options.element));
            option = {
                tooltip : {
                    show:false,
                    trigger: 'item',
                    formatter: '{b}'
                },
                series : [{
                    name: '中国',
                    type: 'map',
                    mapType: 'china',
                    itemStyle:{
                        normal:{label:{show:options.is_province}},
                        emphasis:{label:{show:options.is_show}},
                    },
                    data:options.data
                }]
            };
            var ecConfig = require('echarts/config');
            if(options.is_click){
                myChart.on('click', function (param,e){
                    var name = param.name;
                    $.each(options.data, function(i,k) {
                        if(k.name == name){
                            add(k,e);
                        }
                    });
                })
            }
//			追加函数
            function add(k,e){
//			    兼容
                var ev = window.event || e;
                //计算鼠标和事件源的距离
                var mouse_left = ev.layerX || ev.offsetX;
                var mouse_top = ev.layerY || ev.offsetY;
//			    alert(mouse_left);
                $(options.element + " .box").remove();
                html = '<div class="box">'+
                    '<div class="text">'+
                        '<p>' + k.name + '<span>服务人数：' + k.worker_count + '</span></p>'+
                        '<p>地址：' + k.address + '</p>'+
                        '<p>联系人：' + k.contact + '<span>联系电话：' + k.telphone + '</span></p>'+
                        '<i></i>'+
                        '</div>'+
                    '</div>';
                $('#' + options.element).append(html);
                var height = $('#' + options.element + " .box .text").outerHeight();
                var left = mouse_left - 33;
                var top = mouse_top - height -15;
                $('#' + options.element + " .box").css({
                    left:left,
                    top:top
                })
            }
            // 为echarts对象加载数据
            myChart.setOption(option);
        });


    }
    };

})(jQuery);