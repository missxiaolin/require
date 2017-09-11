$(function () {

    // 首页搜索下啦
    $('#search_box .drop_down').hover(function () {
        $(this).find('ul').show();
    },function () {
        $(this).find('ul').hide();
    })
    $('#search_box .drop_down ul li').click(function () {
        $('#search_box .drop_down span').html($(this).html()+'<i class="drop"></i>');
        $('#search_box .drop_down ul').hide();
    })
    // 筛选区域
    $('.s_line .sl_value .sl_more').hover(function () {
        $(this).addClass('sl_off');
        $(this).find('.sl_tab_cont').show();
    },function () {
        $(this).removeClass('sl_off');
        $(this).find('.sl_tab_cont').hide();
    })

    // 栏目隐藏
    $('.lately .column .die').click(function () {
        $('.lately').hide();
    })
    $('.lately .column .is_show').click(function () {
        $(this).addClass('active')
            .siblings().removeClass('active');
        var options_index = $('.lately .column .is_show').index(this);
        $('.lately .box .w').eq(options_index).show()
            .siblings().hide();
    })


    // 单击设置cookie 对比栏图片显示
    $('.ratio a').click(function () {
            var ratio = getCookie('ratio');
            if(ratio){
                var array = JSON.parse(ratio);
                // 判断是否超过4个
                if(array.length == 4){
                    alert('品牌已经添加4个');
                }else {
                    var fq_id = $(this).attr('fq_id') + '';
                    for (i=0;i<array.length;i++){
                        // 查看是否存在这个
                        if(array[i]['fq_id'] == fq_id){
                            return false;
                        }
                    }
                    var img_url = $(this).parent().parent().find('.img img').attr('src');
                    var new_json = {'fq_id':fq_id,'img_url':img_url};
                    array.push(new_json);
                    var gather = JSON.stringify(array);
                    product_ratio(fq_id,img_url);
                    setCookie('ratio',gather);
                }
            }else {
                var fq_id = $(this).attr('fq_id') + '';
                var img_url = $(this).parent().parent().find('.img img').attr('src');
                if(fq_id && img_url){
                    // 设置第一个cookie
                    var gather = JSON.stringify([{'fq_id':fq_id,'img_url':img_url},]);
                    product_ratio(fq_id,img_url);
                    setCookie('ratio',gather);
                }

            }
    })
    /**
     * 对比栏目添加
     * @param fq_id
     * @param imgurl
     */
    function product_ratio(fq_id,imgurl) {
        var html = '<div class="img">'+
            '<img src="' + imgurl + '" alt="">'+
            '<a href="javascript:;" id="' + fq_id + '"></a>'+
            '</div>';
        $('.box .selected .contrast li .add_to').eq(0).parent().addClass('show');
        $('.box .selected .contrast li .add_to').eq(0).parent().html(html);
    }

    // 对比栏删除
    $(document).on('click','.box .selected .contrast .img a',function () {
        var fq_id = $(this).attr('id');
        var ratio = JSON.parse(getCookie('ratio'));
        $.each(ratio,function (i,n) {
            if(n.fq_id == fq_id){
                // 先删除数组
                ratio.splice(i,1);
            }
        })
        var html = '<div class="add_to">继续添加品牌</div>';
        $(this).parent().parent().removeClass('show').html(html);
        var gather = JSON.stringify(ratio);
        setCookie('ratio',gather);
    })
    // 对比栏清空
    $('.ratio_empty').click(function () {
        var html = '<div class="add_to">继续添加品牌</div>';
        for (i=0;i<4;i++){
            $('.box .selected .contrast li').eq(i).removeClass('show').html(html);
        }
        deleteCookie('ratio');
    })


    var ratio = getCookie('ratio');
    if(ratio){
        var array = JSON.parse(ratio);
        for (i=0;i<array.length;i++){
            $('.box .selected .contrast li').eq(i).addClass('show');
            var html = '<div class="img">'+
                '<img src="' + array[i]['img_url'] + '" alt="">'+
                '<a href="javascript:;"id="' + array[i]['fq_id'] + '"></a>'+
                '</div>';
            $('.box .selected .contrast li').eq(i).html(html);
        }
    }
    /**
     * 设置cookie
     * @param {string} name  键名
     * @param {string} value 键值
     * @param {integer} days cookie周期
     */
    function setCookie(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }else{
            var expires = "";
        }
        document.cookie = name+"="+value+expires+"; path=/";
    }
    // 获取cookie
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

// 删除cookie
    function deleteCookie(name) {
        setCookie(name,"",-1);
    }
})