/*
 *主要功能有：3D音效；侧边栏收缩，子侧边栏布局对齐；轮播图原理...
 */
window.onload=function(){
    var nav_audio=document.getElementById("nav_audio");
    var fixed_nav=$("#fixed_nav a");
    fixed_nav.mouseover(function () {
        nav_audio.currentTime=0;            //初始化播放时间；
        nav_audio.play();                  //play/pause播放暂停函数；
    });


    //将子侧边栏布局对齐父侧边栏；
    var ul=document.querySelector(".nav1").querySelectorAll(".nav2");
    for(var i=0;i<ul.length;i++){
        ul[i].index=i;
        ul[i].style.top=-i*54+"px";
    }

    //侧边栏缓冲拉出；
    var main_nav=document.getElementById("main_nav");
    var timer1=null;
    main_nav.onmouseover=function(){
        startMove(main_nav,0);
    }
    main_nav.onmouseout=function(){
        startMove(main_nav,-200);
    }
    function startMove(obj,left){

        clearInterval(timer1);
        timer1=setInterval(function(){
            var speed=(left-obj.offsetLeft)/10;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            if(obj.offsetLeft==left){
                clearInterval(timer1);
            }else {
                obj.style.left = Math.floor(obj.offsetLeft) + speed + 'px';  //left/top等属性只有absolute才有；
            }
        },50);
    }
    //轮播图
    var slide=$("#slide");
    var img=$("#container img");
    var slide_button=$("#slide_button span");
    slide_button.eq(0).css("background","#68bdb7");
    var container=$("#container");
    container.addClass("transition");
    var prev=$("#prev");
    var next=$("#next");
    prev.bind("click",function(){
        container.addClass("transition");
        var i=-(parseInt(container.css("left"))/700+1);
        animation(i-1);
        buttonShow(i-1);
    });
    next.bind("click",function(){
        container.addClass("transition");
        var i=-(parseInt(container.css("left"))/700+1);
        animation(i+1);
        buttonShow(i+1);
    });
    function animation(i){
        if(Math.floor(i)==i){                //判断动画是否完成；
            var j=i;
            container.css("left",-700*(j+1)+"px");
            setTimeout(function(){
                if(i==-1){container.removeClass("transition").css("left",-3500+"px");}
                if(i==5){container.removeClass("transition").css("left",-700+"px");}
            },300);
        }
    }
    function buttonShow(i){
        slide_button.css("background","");      //清除所有按钮背景；
        var j=i;
        if(i==-1){j=4;}
        if(i==5){j=0;}
        slide_button.eq(j).css("background","#68bdb7");
    }
    slide_button.each(function() {
        $(this).bind("click", function () {
            var i = $(this).index();
            container.addClass("transition");
            animation(i);
            buttonShow(i);
        })
    });
    var timer;
    function play(){
         timer=setTimeout(function(){
            next.onclick();
            play();
        },3000);
    }
    function stop(){
        clearTimeout(timer);
    }
    play();
    slide.hover(stop,play);
    //轮播图分割线；

}



