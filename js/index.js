/**
 * Created by Administrator on 2016/5/4.
 */
window.onload=function(){
    getTime();
    getResize();
};
window.onresize=function(){
    getResize();
};
function getResize(){
    //var carouselbox=$("#carousel-example-generic");
    //var carouselwidth=carouselbox.width();
    //carouselbox.css("height",carouselwidth+"px");
    var imgbox=$(".img-box");
    var imgwidth=imgbox.eq(0).width();
    imgbox.css("height",imgwidth+"px");
}
function getTime(){
    var time=new Date();
    var d=time.getDay();
    var h=time.getHours();
    var m=time.getMinutes();
    var s=time.getSeconds();
    var weekday=["星期天 ", "星期一 ", "星期二 ", "星期三 ", "星期四 ", "星期五 ", "星期六 "];

    var duration,th;
    if(h>5&&h<13){
        duration="上午 ";
    }else if(h>12&&h<19){
        duration="下午 ";
        th=h-12;
    }else if(h>18&&h<24){
        duration="晚上 ";
        th=h-12;
    }else {
        duration="凌晨 ";
    }
    function twoNumber(i){
        if(i<10){
            i="0"+i;
        }
        return i;
    }
    $(".time").eq(1).html(weekday[d]+duration+twoNumber(th)+":"+twoNumber(m)+":"+twoNumber(s));
    setTimeout(getTime,1000);
}

//imgbox.each(function(){
//    var imgwidth=$(this).css("width");
//    console.log(imgwidth);
//    $(this).css("height",imgwidth);
//});
