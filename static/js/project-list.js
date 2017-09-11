$(function () {
    var sl_more = $('#list .screen .s_line .sl_value .sl_more');
    sl_more.hover(function () {
        $(this).addClass('sl_off');
        $(this).find('.sl_tab_cont').show();
    },function () {
        $(this).removeClass('sl_off');
        $(this).find('.sl_tab_cont').hide();
    })
})