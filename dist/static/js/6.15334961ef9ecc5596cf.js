webpackJsonp([6],{527:function(t,i,n){n(648),n(649);var s=n(93)(n(587),n(635),"data-v-16b86cd6",null);t.exports=s.exports},587:function(t,i,n){"use strict";function s(){h.clearRect(0,0,e.width,e.height),r.update(),r.draw(),requestAnimFrame(s)}function o(){e.onmousedown=function(t){c.button=t.which,c.px=c.x,c.py=c.y;var i=e.getBoundingClientRect();c.x=t.clientX-i.left,c.y=t.clientY-i.top,c.down=!0,t.preventDefault()},e.onmouseup=function(t){c.down=!1,t.preventDefault()},e.onmousemove=function(t){c.px=c.x,c.py=c.y;var i=e.getBoundingClientRect();c.x=t.clientX-i.left,c.y=t.clientY-i.top,t.preventDefault()},e.oncontextmenu=function(t){t.preventDefault()},a=e.width-1,p=e.height-1,h.strokeStyle="#fff",r=new f,s()}Object.defineProperty(i,"__esModule",{value:!0});window.requestAnimFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};var e,h,r,a,p,c={down:!1,button:1,x:0,y:0,px:0,py:0},u=function(t,i){this.x=t,this.y=i,this.px=t,this.py=i,this.vx=0,this.vy=0,this.pin_x=null,this.pin_y=null,this.constraints=[]};u.prototype.update=function(t){if(c.down){var i=this.x-c.x,n=this.y-c.y,s=Math.sqrt(i*i+n*n);1==c.button?s<20&&(this.px=this.x-1.8*(c.x-c.px),this.py=this.y-1.8*(c.y-c.py)):s<5&&(this.constraints=[])}this.add_force(0,1200),t*=t;var o=this.x+.99*(this.x-this.px)+this.vx/2*t,e=this.y+.99*(this.y-this.py)+this.vy/2*t;this.px=this.x,this.py=this.y,this.x=o,this.y=e,this.vy=this.vx=0},u.prototype.draw=function(){if(!(this.constraints.length<=0))for(var t=this.constraints.length;t--;)this.constraints[t].draw()},u.prototype.resolve_constraints=function(){if(null!=this.pin_x&&null!=this.pin_y)return this.x=this.pin_x,void(this.y=this.pin_y);for(var t=this.constraints.length;t--;)this.constraints[t].resolve();this.x>a?this.x=2*a-this.x:this.x<1&&(this.x=2-this.x),this.y>p?this.y=2*p-this.y:this.y<1&&(this.y=2-this.y)},u.prototype.attach=function(t){this.constraints.push(new l(this,t))},u.prototype.remove_constraint=function(t){for(var i=this.constraints.length;i--;)this.constraints[i]==t&&this.constraints.splice(i,1)},u.prototype.add_force=function(t,i){this.vx+=t,this.vy+=i},u.prototype.pin=function(t,i){this.pin_x=t,this.pin_y=i};var l=function(t,i){this.p1=t,this.p2=i,this.length=8};l.prototype.resolve=function(){var t=this.p1.x-this.p2.x,i=this.p1.y-this.p2.y,n=Math.sqrt(t*t+i*i),s=(this.length-n)/n;n>60&&this.p1.remove_constraint(this);var o=t*s*.5,e=i*s*.5;this.p1.x+=o,this.p1.y+=e,this.p2.x-=o,this.p2.y-=e},l.prototype.draw=function(){h.moveTo(this.p1.x,this.p1.y),h.lineTo(this.p2.x,this.p2.y)};var f=function(){this.points=[];for(var t=e.width/2-400,i=0;i<=70;i++)for(var n=0;n<=100;n++){var s=new u(t+8*n,20+8*i);0!=n&&s.attach(this.points[this.points.length-1]),0==i&&s.pin(s.x,s.y),0!=i&&s.attach(this.points[n+101*(i-1)]),this.points.push(s)}};f.prototype.update=function(){for(var t=3;t--;)for(var i=this.points.length;i--;)this.points[i].resolve_constraints();for(t=this.points.length;t--;)this.points[t].update(.016)},f.prototype.draw=function(){h.beginPath();for(var t=r.points.length;t--;)r.points[t].draw();h.stroke()},i.default={data:function(){return{}},methods:{onSubmit:function(){this.$message.success("提交成功！")}},mounted:function(){e=document.getElementById("tearCloth"),h=e.getContext("2d"),e.width=800,e.height=800,o()}}},617:function(t,i,n){i=t.exports=n(92)(),i.push([t.i,'.canvas-container[data-v-16b86cd6]{position:absolute;left:50%;margin-left:-400px;width:800px;height:800px;background-image:url("/static/images/hope/jump.jpg");background-size:cover;z-index:-1}#tearCloth[data-v-16b86cd6]{position:relative;margin:0 auto;width:800px;height:800px;display:block;cursor:crosshair;z-index:1}',""])},618:function(t,i,n){i=t.exports=n(92)(),i.push([t.i,"",""])},635:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",[n("div",{staticClass:"canvas-container"}),t._v(" "),n("canvas",{attrs:{id:"tearCloth"}})])}]}},648:function(t,i,n){var s=n(617);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);n(94)("187b4cb6",s,!0)},649:function(t,i,n){var s=n(618);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);n(94)("8f578878",s,!0)}});