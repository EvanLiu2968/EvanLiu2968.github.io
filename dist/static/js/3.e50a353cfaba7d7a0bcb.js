webpackJsonp([3],{407:function(t,o,e){e(502);var a=e(102)(e(449),e(498),"data-v-da565090",null);t.exports=a.exports},449:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default={data:function(){return{}},methods:{onSubmit:function(){this.$message.success("提交成功！")}},mounted:function(){function t(){for(var t=0;t<15;t+=1){u[t]=[];for(var e=0;e<15;e+=1)u[t][e]=0}for(var a=0;a<b;a++)m[a]=0,g[a]=0;d.clearRect(0,0,1200,600),c.clearRect(0,0,1200,600),c.drawImage(y,0,0,1200,600),o(),r(c,200,300,150,"#000000",Math.PI),r(c,1e3,300,150,"#ffffff",0),n(c,200,225,!1),n(c,1e3,375,!0),c.font="bolder 50px 宋体",c.fillText("Player",950,540),c.fillStyle="#ffffff",c.fillText("AlphaDog",50,540),h=!0,v=!1}function o(){c.strokeStyle="#454545",c.lineWidth=1;for(var t=0;t<15;t+=1)c.beginPath(),c.moveTo(320+40*t,20),c.lineTo(320+40*t,580),c.stroke(),c.closePath(),c.beginPath(),c.moveTo(320,20+40*t),c.lineTo(880,20+40*t),c.stroke(),c.closePath()}function e(t,o,e){c.beginPath(),c.arc(320+40*t,20+40*o,15,0,2*Math.PI),c.closePath();var a=c.createRadialGradient(320+40*t,20+40*o,10,320+40*t+2,20+40*o-2,0);e?(a.addColorStop(0,"#0a0a0a"),a.addColorStop(1,"#636363")):(a.addColorStop(0,"#e1e1e1"),a.addColorStop(1,"#f1f1f1")),c.fillStyle=a,setTimeout(function(){c.fill(),p=!1},500)}function a(){for(var o=[],a=[],r=0,n=0,l=0,c=0;c<15;c++){o[c]=[],a[c]=[];for(var s=0;s<15;s++)o[c][s]=0,a[c][s]=0}for(var d=0;d<15;d+=1)for(var P=0;P<15;P+=1)if(0==u[d][P]){for(var y=0;y<b;y++)x[d][P][y]&&(1==m[y]?o[d][P]+=200:2==m[y]?o[d][P]+=400:3==m[y]?o[d][P]+=2e3:4==m[y]&&(o[d][P]+=1e4),1==g[y]?a[d][P]+=210:2==g[y]?a[d][P]+=420:3==g[y]?a[d][P]+=2400:4==g[y]&&(a[d][P]+=2e4));o[d][P]>r?(r=o[d][P],n=d,l=P):o[d][P]==r&&a[d][P]>a[n][l]&&(n=d,l=P),a[d][P]>r?(r=a[d][P],n=d,l=P):a[d][P]==r&&o[d][P]>o[n][l]&&(n=d,l=P)}i(40*n+320,40*l+20,h),p=!0,e(n,l,h),u[n][l]=2;for(var S=0;S<b;S++)x[n][l][S]&&(g[S]++,m[S]=6,5==g[S]&&(v=!0,f.$alert("AlphaDog：回去多练练吧，毕竟我的大哥是AlphaGo！","抱歉，你输了！",{confirmButtonText:"再来一盘",callback:function(o){t()}})));v||(h=!h)}function r(t,o,e,a,r,n){t.save(),t.translate(o,e),t.rotate(n),t.translate(-o,-e),t.shadowColor="rgba(10,10,10,0.5)",t.shadowOffsetX=t.shadowOffsetY=5,t.shadowBlur=5,t.fillStyle=r,t.beginPath(),t.arc(o,e,a,1.5*Math.PI,.5*Math.PI),t.arc(o,e+a/2,a/2,.5*Math.PI,1.5*Math.PI),t.arc(o,e-a/2,a/2,.5*Math.PI,1.5*Math.PI,!0),t.lineJoin="round",t.closePath(),t.fill(),t.shadowColor="rgba(10,10,10,0)",t.restore()}function n(t,o,e,a){t.beginPath(),t.arc(o,e,15,0,2*Math.PI),t.closePath();var r=c.createRadialGradient(o,e,10,o+2,e-2,0);a?(r.addColorStop(0,"#0a0a0a"),r.addColorStop(1,"#636363")):(r.addColorStop(0,"#e1e1e1"),r.addColorStop(1,"#f1f1f1")),t.fillStyle=r,t.fill()}function i(t,o,e){function a(){l<11&&(d.clearRect(0,0,1200,600),n(d,r.x-i*l,r.y-f*l,e),l++,setTimeout(a,50))}var r={};e?(r.x=1e3,r.y=375):(r.x=200,r.y=225);var i=(r.x-t)/10,f=(r.y-o)/10,l=1;a()}var f=this,l=document.getElementById("chess"),c=l.getContext("2d"),s=document.getElementById("animate"),d=s.getContext("2d"),u=(document.documentElement.clientWidth,document.documentElement.clientHeight,[]),h=!0,v=!1,p=!1,m=[],g=[],P=function(){for(var t=[],o=0,e=0;e<15;e+=1){t[e]=[];for(var a=0;a<15;a+=1)t[e][a]=[]}for(var r=0;r<15;r+=1)for(var n=0;n<11;n+=1){for(var i=0;i<5;i+=1)t[r][n+i][o]=!0;o++}for(var f=0;f<15;f+=1)for(var l=0;l<11;l+=1){for(var c=0;c<5;c+=1)t[l+c][f][o]=!0;o++}for(var s=0;s<11;s+=1)for(var d=0;d<11;d+=1){for(var u=0;u<5;u+=1)t[s+u][d+u][o]=!0;o++}for(var h=4;h<15;h+=1)for(var v=0;v<11;v+=1){for(var p=0;p<5;p+=1)t[h-p][v+p][o]=!0;o++}return{wins:t,count:o}}(),x=P.wins,b=P.count,y=new Image;y.src="static/images/board.jpg",y.onload=function(){t()},s.onclick=function(o){if(!v&&h&&!p){var r=o.offsetX,n=o.offsetY,l=Math.floor(r/40-7.5),c=Math.floor(n/40);if(0==u[l][c]){i(40*l+320,40*c+20,h),p=!0,e(l,c,h),u[l][c]=1;for(var s=0;s<b;s++)x[l][c][s]&&(m[s]++,g[s]=6,5==m[s]&&(v=!0,f.$alert("AlphaDog：放学别走，让我大哥AlphaGo来教你做人！","恭喜，你赢了！",{confirmButtonText:"再来一盘",callback:function(o){t()}})));v||(h=!h,setTimeout(a,500))}}}}}},492:function(t,o,e){o=t.exports=e(148)(),o.push([t.i,"",""])},498:function(t,o){t.exports={render:function(){var t=this,o=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticStyle:{position:"relative",margin:"0 auto",width:"1200px"}},[e("canvas",{staticStyle:{position:"absolute",top:"0",left:"0","border-radius":"6px"},attrs:{id:"chess",width:"1200",height:"600"}}),t._v(" "),e("canvas",{staticStyle:{position:"relative",width:"1200px",height:"600px"},attrs:{id:"animate",width:"1200",height:"600"}},[e("br"),t._v("您的浏览器out啦！建议使用使用谷歌浏览器")])])}]}},502:function(t,o,e){var a=e(492);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e(149)("69af923c",a,!0)}});