webpackJsonp([9],{525:function(t,e,a){a(652);var o=a(93)(a(585),a(638),"data-v-25ab152b",null);t.exports=o.exports},585:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(141),r=function(t){return t&&t.__esModule?t:{default:t}}(o);e.default={data:function(){return{didMount:!1}},methods:{onSubmit:function(){this.$message.success("提交成功！")}},mounted:function(){function t(t,e){console.log(t,e),g[t][e]=0,h.clearRect(320+40*t-15,20+40*e-15,30,30)}function e(){for(var t=0;t<15;t+=1){g[t]=[];for(var e=0;e<15;e+=1)g[t][e]=0}for(var a=0;a<M;a++)x[a]=0,P[a]=0;p.clearRect(0,0,1200,600),h.clearRect(0,0,1200,600),m=!0,b=!1}function a(){s.strokeStyle="#454545",s.lineWidth=1;for(var t=0;t<15;t+=1)s.beginPath(),s.moveTo(320+40*t,20),s.lineTo(320+40*t,580),s.stroke(),s.closePath(),s.beginPath(),s.moveTo(320,20+40*t),s.lineTo(880,20+40*t),s.stroke(),s.closePath()}function o(t,e,a){h.beginPath(),h.arc(320+40*t,20+40*e,15,0,2*Math.PI),h.closePath();var o=h.createRadialGradient(320+40*t,20+40*e,10,320+40*t+2,20+40*e-2,0);a?(o.addColorStop(0,"#0a0a0a"),o.addColorStop(1,"#636363")):(o.addColorStop(0,"#e1e1e1"),o.addColorStop(1,"#f1f1f1")),h.fillStyle=o,setTimeout(function(){h.fill(),y=!1},500)}function n(){for(var t=[],a=[],n=0,i=0,l=0,d=0;d<15;d++){t[d]=[],a[d]=[];for(var s=0;s<15;s++)t[d][s]=0,a[d][s]=0}for(var u=0;u<15;u+=1)for(var h=0;h<15;h+=1)if(0==g[u][h]){for(var v=0;v<M;v++)I[u][h][v]&&(1==x[v]?t[u][h]+=200:2==x[v]?t[u][h]+=400:3==x[v]?t[u][h]+=2e3:4==x[v]&&(t[u][h]+=1e4),1==P[v]?a[u][h]+=210:2==P[v]?a[u][h]+=420:3==P[v]?a[u][h]+=2400:4==P[v]&&(a[u][h]+=2e4));t[u][h]>n?(n=t[u][h],i=u,l=h):t[u][h]==n&&a[u][h]>a[i][l]&&(i=u,l=h),a[u][h]>n?(n=a[u][h],i=u,l=h):a[u][h]==n&&t[u][h]>t[i][l]&&(i=u,l=h)}f(40*i+320,40*l+20,m),y=!0,o(i,l,m),g[i][l]=2,_.alphadog=[i,l],B.push(JSON.parse((0,r.default)(_)));for(var p=0;p<M;p++)I[i][l][p]&&(P[p]++,x[p]=6,5==P[p]&&(b=!0,c.$alert("AlphaDog：回去多练练吧，毕竟我的大哥是AlphaGo！","抱歉，你输了！",{confirmButtonText:"再来一盘",callback:function(t){e()}})));b||(m=!m)}function i(t,e,a,o,r,n){t.save(),t.translate(e,a),t.rotate(n),t.translate(-e,-a),t.shadowColor="rgba(10,10,10,0.5)",t.shadowOffsetX=t.shadowOffsetY=5,t.shadowBlur=5,t.fillStyle=r,t.beginPath(),t.arc(e,a,o,1.5*Math.PI,.5*Math.PI),t.arc(e,a+o/2,o/2,.5*Math.PI,1.5*Math.PI),t.arc(e,a-o/2,o/2,.5*Math.PI,1.5*Math.PI,!0),t.lineJoin="round",t.closePath(),t.fill(),t.shadowColor="rgba(10,10,10,0)",t.restore()}function l(t,e,a,o){t.beginPath(),t.arc(e,a,15,0,2*Math.PI),t.closePath();var r=h.createRadialGradient(e,a,10,e+2,a-2,0);o?(r.addColorStop(0,"#0a0a0a"),r.addColorStop(1,"#636363")):(r.addColorStop(0,"#e1e1e1"),r.addColorStop(1,"#f1f1f1")),t.fillStyle=r,t.fill()}function f(t,e,a){function o(){f<11?(p.clearRect(0,0,1200,600),l(p,r.x-n*f,r.y-i*f,a),f++,setTimeout(o,50)):p.clearRect(0,0,1200,600)}var r={};a?(r.x=1e3,r.y=375):(r.x=200,r.y=225);var n=(r.x-t)/10,i=(r.y-e)/10,f=1;o()}var c=this,d=document.getElementById("board"),s=d.getContext("2d"),u=document.getElementById("chess"),h=u.getContext("2d"),v=document.getElementById("animate"),p=v.getContext("2d"),g=(document.documentElement.clientWidth,document.documentElement.clientHeight,[]),m=!0,b=!1,y=!1,x=[],P=[],w=function(){for(var t=[],e=0,a=0;a<15;a+=1){t[a]=[];for(var o=0;o<15;o+=1)t[a][o]=[]}for(var r=0;r<15;r+=1)for(var n=0;n<11;n+=1){for(var i=0;i<5;i+=1)t[r][n+i][e]=!0;e++}for(var l=0;l<15;l+=1)for(var f=0;f<11;f+=1){for(var c=0;c<5;c+=1)t[f+c][l][e]=!0;e++}for(var d=0;d<11;d+=1)for(var s=0;s<11;s+=1){for(var u=0;u<5;u+=1)t[d+u][s+u][e]=!0;e++}for(var h=4;h<15;h+=1)for(var v=0;v<11;v+=1){for(var p=0;p<5;p+=1)t[h-p][v+p][e]=!0;e++}return{wins:t,count:e}}(),I=w.wins,M=w.count,S=new Image;S.src="static/images/board.jpg",S.onload=function(){s.drawImage(S,0,0,1200,600),a(),i(s,200,300,150,"#000000",Math.PI),i(s,1e3,300,150,"#ffffff",0),l(s,200,225,!1),l(s,1e3,375,!0),s.font="bolder 50px 宋体",s.fillText("Player",950,540),s.fillStyle="#ffffff",s.fillText("AlphaDog",50,540),e(),c.didMount=!0};var C=document.getElementById("resetBtn"),k=document.getElementById("backPrevBtn"),B=[],_={player:[0,0],alphadog:[0,1]};C.onclick=function(){e()},k.onclick=function(){if(console.log(B),B.length>0){var e=B.splice(-1,1),a=e[0].player,o=e[0].alphadog;t(a[0],a[1]),t(o[0],o[1])}else c.$alert("人生如棋，落子无悔。","提示")},v.onclick=function(t){if(!b&&m&&!y){var a=t.offsetX,r=t.offsetY,i=Math.floor(a/40-7.5),l=Math.floor(r/40);if(console.log(g[i][l]),0==g[i][l]){f(40*i+320,40*l+20,m),y=!0,o(i,l,m),g[i][l]=1,_.player=[i,l];for(var d=0;d<M;d++)I[i][l][d]&&(x[d]++,P[d]=6,5==x[d]&&(b=!0,c.$alert("AlphaDog：放学别走，让我大哥AlphaGo来教你做人！","恭喜，你赢了！",{confirmButtonText:"再来一盘",callback:function(t){e()}})));b||(m=!m,setTimeout(n,500))}}}}}},621:function(t,e,a){e=t.exports=a(92)(),e.push([t.i,".fivechess-wrap[data-v-25ab152b]{position:relative;margin:0 auto;width:1200px}#animate[data-v-25ab152b],#chess[data-v-25ab152b]{position:absolute;top:0;left:0;width:1200px;height:600px}#board[data-v-25ab152b]{position:relative;width:1200px;height:600px;border-radius:6px}",""])},638:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"fivechess-wrap"},[a("canvas",{attrs:{id:"board",width:"1200",height:"600"}}),t._v(" "),a("canvas",{attrs:{id:"chess",width:"1200",height:"600"}}),t._v(" "),a("canvas",{attrs:{id:"animate",width:"1200",height:"600"}}),t._v(" "),a("div",{staticStyle:{position:"absolute",top:"20px",right:"0",width:"300px"},style:{display:t.didMount?"block":"none"}},[a("el-button",{attrs:{type:"primary",id:"resetBtn"}},[t._v("重新开始")]),t._v(" "),a("el-button",{attrs:{type:"primary",id:"backPrevBtn"}},[t._v("回到上一步")])],1)])},staticRenderFns:[]}},652:function(t,e,a){var o=a(621);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(94)("771993d1",o,!0)}});