/**
 * Created by Administrator on 2016/5/4.
 */
window.onload=function(){
    videoPlayer();
    getTime();
    getImageResize();
};
window.onresize=function(){
    getImageResize();
};
videoPlayer();
function getImageResize(){
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
        th=h;
    }else if(h>12&&h<19){
        duration="下午 ";
        th=h-12;
    }else if(h>18&&h<24){
        duration="晚上 ";
        th=h-12;
    }else {
        duration="凌晨 ";
        th=h;
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

//video播放器函数
function videoPlayer(){
    var myVideo=document.getElementById("video");
    var videoPlayer=$("#video-player");
    var btn_play1=$("#btn-play1");
    var btn_play2=$("#btn-play2");
    var btn_full=$("#btn-full");
    var btn_time=$("#btn-time");
    var btn_voice=$("#btn-voice");
    var video_mask=$(".video-mask");

    window.onresize=function(){
        updateProgress();
        getVideoResize();
    };
    myVideo.onresize=function (){
        getVideoResize();
        updateProgress();
    };
    $("#video-box").mouseover(function(){
        video_mask.css("transition","left 20s linear");
        video_mask.css("left","-200%");
    });
    $("#video-box").mouseout(function(){
        video_mask.css("transition","");
        video_mask.css("left","150%");
    });

//获取%变化宽度，并将宽度由%设为px；
    function getVideoResize(){
        var videowidth=$("#video-player").width();
        $(".video-progress").css("width",videowidth-16+"px");
    }

    //屏幕点击切换播放/暂停
    btn_play1.bind("click",function(){
        myVideo.play();
        $(this).css("visibility","hidden");
    });
    myVideo.addEventListener("pause",function(){
        btn_play1.css("visibility","visible");
    });
    myVideo.addEventListener("play",function(){
        btn_play1.css("visibility","hidden");
    });

//按钮点击切换播放/暂停，pause() and play();
    btn_play2.bind("click",function(){
        if(myVideo.paused==false){
            myVideo.pause();
            $(this).removeClass("glyphicon-pause");
            $(this).addClass("glyphicon-play");
        } else {
            myVideo.play();
            $(this).removeClass("glyphicon-play");
            $(this).addClass("glyphicon-pause");
        }
    });

    //全屏功能，fullscreen；
    btn_full.bind("click",function(){
        if(videoPlayer.hasClass("fullscreen")){
            videoPlayer.removeClass("fullscreen");
            exitFullscreen();
            $("body").css("overflow","auto");
        }else {
            videoPlayer.addClass("fullscreen");
            requestFullScreen();
            $("body").css("overflow","hidden");
        }
        //videoPlayer.css("overflow","hidden")
    });

    //选择当前播放速度，playbackRate属性；
    $(".btn-speed-ul li").eq(2).css("color","#ff2222");
    $(".btn-speed-ul li").each(function () {
        $(this).bind("click",function(){
            var str=$(this).html();
            var speed=parseFloat(str);
            myVideo.playbackRate=speed;
            $("#btn-speed span").html(str);
            $(".btn-speed-ul li").css("color","#cccccc");
            $(this).css("color","#ff2222");
        })
    });

//定义当前时间位置/总时间，currentTime/duration;
    var timer=function(){
        var duration=Math.round(myVideo.duration);
        var current=Math.round(myVideo.currentTime);
        function getMinute(time){
            var i=Math.round(time/60);
            if(i<10){
                i="0"+i;
            }
            return i;
        }
        function getSecond(time){
            var i=Math.round(time%60);
            if(i<10){
                i="0"+i;
            }
            return i;
        }
        btn_time.html(getMinute(current)+":"+getSecond(current)+"/"+getMinute(duration)+":"+getSecond(duration));
    };
    timer();//加载时执行一次，然后添加video监控事件循环更新时间
    myVideo.addEventListener("play",function(){
        setInterval(timer,500);
        setInterval(updateProgress,500);
    });

    //进度条函数；
    function updateProgress(){
        var duration=Math.round(myVideo.duration);
        //缓冲条
        var length=myVideo.buffered.length;
        var buffered_end=myVideo.buffered.end(length-1);
        var buffered_percent=(buffered_end/duration).toFixed(4);
        $("#buffered-time").css("width",buffered_percent*100+"%");
        var progress_w=$(".video-progress").width();
        var p=(8/progress_w).toFixed(4);
        //播放条
        var current=Math.round(myVideo.currentTime);
        var percent=(current/duration).toFixed(4);
        $("#current-time").css("width",percent*100+"%");
        if(percent<p){
            $("#current-circle").css("left",0);
        }else if(percent>(1-p)) {
            $("#current-circle").css("left",(1-p)*100+"%");
        }else{
            $("#current-circle").css("left",(percent- p)*100+"%");
        }
        //进度条点击事件;
        $(".video-progress").bind("click",function(e){
            var offset=$(this).offset();
            var relativeX= e.pageX-offset.left;
            var percentC=relativeX/(progress_w);
            var current_time=Math.round(myVideo.duration*percentC);
            myVideo.currentTime=current_time;
            percent=percentC;
            $("#current-time").css("width",percent*100+"%");
            if(percent<p){
                $("#current-circle").css("left",0);
            }else if(percent>(1-p)) {
                $("#current-circle").css("left",(1-p)*100+"%");
            }else{
                $("#current-circle").css("left",(percent- p)*100+"%");
            }
        });
    }

    //静音按钮点击切换,muted属性；
    btn_voice.bind("click",function(){
        if(myVideo.muted==false){
            myVideo.muted=true;
            $(this).removeClass("glyphicon-volume-up");
            $(this).addClass("glyphicon-volume-off");
            $("#current-volume").css("height",0);
            $("#current-volume-circle").css("top",104+"px");
        }else{
            myVideo.muted=false;
            $(this).removeClass("glyphicon-volume-off");
            $(this).addClass("glyphicon-volume-up");
            var relativeY=(1-myVideo.volume)*104;
            $("#current-volume").css("height",112-relativeY+"px");
            if(relativeY<8){
                $("#current-volume-circle").css("top",0);
            }else {
                $("#current-volume-circle").css("top",relativeY-8+"px");
            }
        }
    });

    //音量条点击函数；
    $(".volume-progress").bind("click",function(e){
        var offset=$(this).offset();
        var relativeY= e.pageY-offset.top;
        var percent=relativeY/104;
        if(percent>1){percent=1;}
        myVideo.volume=1-percent;
        $("#current-volume").css("height",112-relativeY+"px");
        if(relativeY<8){
            $("#current-volume-circle").css("top",0);
        }else if(relativeY>104){
            $("#current-volume-circle").css("top",104+"px");
        }else {
            $("#current-volume-circle").css("top",relativeY-8+"px");
        }

    });

    //进入全屏
    function requestFullScreen() {
        var de = document.documentElement;
        if (de.requestFullscreen) {            //w3c提议；
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {  //火狐
            de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {  //chrome
            de.webkitRequestFullScreen();
        }
    }
//退出全屏
    function exitFullscreen() {
        var de = document;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }
    }
}