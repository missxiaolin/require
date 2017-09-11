(function ($) { 
    $.album = { set: function (arg) {


 		// 自定义
 		var defaults = {
         box: null,
		 imgUrl:null,
     	}

//		合并
     	var define = $.extend(defaults, arg);
        if(define.imgUrl){
            img = define.imgUrl;
        }else if(define.box){
        	var img = new Array;
            for (i=0;i<$(define.box + ' img').length;i++){
				img.push($(define.box + ' img').eq(i).attr('src'));
			}
        }else {
        	return false;
		}
//		html部分
		if(img.length == 0){
			return false;
		}
		var images = '';
		for (i=0;i<img.length;i++) {
			images+='<div class="swiper-slide"><img src="'+img[i]+'"></div>';
		}
		var html = '<div id="album"><div class="swiper-container gallery-top"><a href="javascript:;" id="cboxClose"></a>'+
        '<div class="swiper-wrapper">'+
            images+
        '</div>'+
        '</div>'+
		'<div id="thum"><div class="swiper-container gallery-thumbs">'+
	        '<div class="swiper-wrapper">'+
	           images+
	        '</div>'+
    '</div>'+
    			'<div class="swiper-button-next swiper-button-white"></div>'+
        		'<div class="swiper-button-prev swiper-button-white"></div>'+
    '</div></div>';
		$("body").append(html);
//		遮罩图层
		$("#album").css('height',document.documentElement.clientHeight+'px');
//		窗口发生变化遮罩也跟着改变
		$(window).resize(function(){
			$("#album").css('height',document.documentElement.clientHeight+'px');
		})
//		相册移动
		var galleryTop = new Swiper('.gallery-top', {
	        nextButton: '.swiper-button-next',
	        prevButton: '.swiper-button-prev',
	        spaceBetween: 10,
	    });
	    var galleryThumbs = new Swiper('.gallery-thumbs', {
	        spaceBetween: 10,
	        centeredSlides: true,
	        slidesPerView: 'auto',
	        touchRatio: 0.2,
	        slideToClickedSlide: true
	    });
	    galleryTop.params.control = galleryThumbs;
	    galleryThumbs.params.control = galleryTop;
	    // 按esc键退出
        document.onkeyup = function (e) {
            e = e || e.which || e.keyCode;
            var code = e.which || e.keyCode;
            if(code == 27){
                $('#album').remove();
            }
        }
        $('#cboxClose').click(function () {
            $('#album').remove();
        })
   	 } 
    }; 
    
})(jQuery); 