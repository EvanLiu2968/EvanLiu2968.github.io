/**
 * Created by EvanLiu on 2016/5/4.
 */
$(function(){
    page.init();
});
var page=(function(){
    var timerActivity=function(){

        //倒计时组件初始化；
        var init=function(){
            var tpl='<div class="timecounter-wrap" id="timecounter">'+
                '<span id="timecounter-tip1">距离2018还有：</span>'+
                '<span class="timebox bg-red-gradient" id="timecounter-day">00</span>天'+
                '<span class="timebox bg-red-gradient" id="timecounter-hour">00</span>时'+
                '<span class="timebox bg-red-gradient" id="timecounter-minute">00</span>分'+
                '<span class="timebox bg-red-gradient" id="timecounter-second">00</span>秒'+
                '</div>';
        };

        var getTime=function(times){
            var day=times/(1000*3600*24);
            var cache1=times%(1000*3600*24);
            var hour=cache1/(1000*3600);
            var cache2=cache1%(1000*3600);
            var minute=cache2/(1000*60);
            var cache3=cache2%(1000*60);
            var second=cache3/1000;
            return{
                day:Math.ceil(day),
                hour:parseInt(hour)<10?'0'+parseInt(hour):''+parseInt(hour),
                minute:parseInt(minute)<10?'0'+parseInt(minute):''+parseInt(minute),
                second:parseInt(second)<10?'0'+parseInt(second):''+parseInt(second)
            }
        };
        var timecounting=$("#timecounting");
        var tip1=$("#timecounter-tip1");
        var day=$("#timecounter-day");
        var hour=$("#timecounter-hour");
        var minute=$("#timecounter-minute");
        var second=$("#timecounter-second");

        var counterRender=function(m){
            day.text(getTime(m).day);
            hour.text(getTime(m).hour);
            minute.text(getTime(m).minute);
            second.text(getTime(m).second);
        };
        var getTimeformat=function(date){
            var year=now.getFullYear();
            var month=now.getMonth()+1;
            var day=now.getDate();
            var hour=now.getHours();
            var minute=now.getMinutes();
            var second=now.getSeconds();
            function doubleFormat(d){
                return d<10?"0"+d:d;
            }
            return year+'-'+doubleFormat(month)+'-'+doubleFormat(day)+' '+doubleFormat(hour)+":"+doubleFormat(minute)+":"+doubleFormat(second)
        };
        var m,timer,now;

        var timecounter=function(){
            now=new Date();
            var year=now.getFullYear();
            tip1.text('距离'+(year+1)+'还有：');
            m=new Date((year+1)+"-01-01 00:00:00")-now;
            counterRender(m);

            timecounting.text(getTimeformat(now));

            //now=new Date(now.getTime()+1000);
            timer=setTimeout(timecounter,1000)
        };

        timecounter();//倒计时开始
    };
    var photoListInit=function(){
        function getImageResize(){
            var photobox=$(".photo-box");
            var photo_w=photobox.eq(0).width();
            photobox.css("height",photo_w+"px");
        }
        getImageResize();
        $(window).on("resize",function(){
            getImageResize();
        })
    };
    return {
        init:function(){
            timerActivity();
            photoListInit();
        }
    }
})();
