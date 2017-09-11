(function ($) { 
    $.charts = { set: function (arg) {
 		// 自定义
 		var defaults = {
         	element:'#myChart',//canvas元素
            type:'Line',//图表类型,其他类型参考插件官网
            data:chartData//图表数据
     	}
 		
//		合并
     	var options = $.extend(defaults, arg);
     	var ctx = $(options.element)[0].getContext("2d"), myNewChart;
		switch (options.type) {
                        case 'Line'://曲线图
                            myNewChart = new Chart(ctx).Line(options.data);
                            break;
                        case 'Bar'://柱状图
                            myNewChart = new Chart(ctx).Bar(options.data);
                            break;
                        case 'Radar'://雷达图或蛛网图
                            myNewChart = new Chart(ctx).Radar(options.data);
                            break;
                        case 'PolarArea'://极地区域图
                            myNewChart = new Chart(ctx).PolarArea(options.data);
                            break;
                        case 'Pie'://饼图
                            myNewChart = new Chart(ctx).Pie(options.data);
                            break;
                        case 'Doughnut'://环形图
                            myNewChart = new Chart(ctx).Doughnut(options.data);
                            break;
                    }
   	 } 
    }; 
    
})(jQuery); 