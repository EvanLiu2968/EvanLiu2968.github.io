webpackJsonp([2],{490:function(e,t,a){a(532);var s=a(130)(a(503),a(522),"data-v-2e82f39a",null);e.exports=s.exports},497:function(e,t,a){function s(){}function n(e,t,a){function n(){c.parentNode&&c.parentNode.removeChild(c),window[d]=s,l&&clearTimeout(l)}function r(){window[d]&&n()}"function"==typeof t&&(a=t,t={}),t||(t={});var c,l,u=t.prefix||"__jp",d=t.name||u+i++,f=t.param||"callback",m=null!=t.timeout?t.timeout:6e4,v=encodeURIComponent,p=document.getElementsByTagName("script")[0]||document.head;return m&&(l=setTimeout(function(){n(),a&&a(new Error("Timeout"))},m)),window[d]=function(e){o("jsonp got",e),n(),a&&a(null,e)},e+=(~e.indexOf("?")?"&":"?")+f+"="+v(d),e=e.replace("?&","?"),o('jsonp req "%s"',e),c=document.createElement("script"),c.src=e,p.parentNode.insertBefore(c,p),r}var o=a(498)("jsonp");e.exports=n;var i=0},498:function(e,t,a){(function(s){function n(){return!("undefined"==typeof window||!window||void 0===window.process||"renderer"!==window.process.type)||("undefined"!=typeof document&&document&&"WebkitAppearance"in document.documentElement.style||"undefined"!=typeof window&&window&&window.console&&(console.firebug||console.exception&&console.table)||"undefined"!=typeof navigator&&navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))}function o(e){var a=this.useColors;if(e[0]=(a?"%c":"")+this.namespace+(a?" %c":" ")+e[0]+(a?"%c ":" ")+"+"+t.humanize(this.diff),a){var s="color: "+this.color;e.splice(1,0,s,"color: inherit");var n=0,o=0;e[0].replace(/%[a-zA-Z%]/g,function(e){"%%"!==e&&(n++,"%c"===e&&(o=n))}),e.splice(o,0,s)}}function i(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function r(e){try{null==e?t.storage.removeItem("debug"):t.storage.debug=e}catch(e){}}function c(){var e;try{e=t.storage.debug}catch(e){}return!e&&void 0!==s&&"env"in s&&(e=a.i({NODE_ENV:"production"}).DEBUG),e}t=e.exports=a(499),t.log=i,t.formatArgs=o,t.save=r,t.load=c,t.useColors=n,t.storage="undefined"!=typeof chrome&&void 0!==chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(e){}}(),t.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],t.formatters.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}},t.enable(c())}).call(t,a(131))},499:function(e,t,a){function s(e){var a,s=0;for(a in e)s=(s<<5)-s+e.charCodeAt(a),s|=0;return t.colors[Math.abs(s)%t.colors.length]}function n(e){function a(){if(a.enabled){var e=a,s=+new Date,n=s-(l||s);e.diff=n,e.prev=l,e.curr=s,l=s;for(var o=new Array(arguments.length),i=0;i<o.length;i++)o[i]=arguments[i];o[0]=t.coerce(o[0]),"string"!=typeof o[0]&&o.unshift("%O");var r=0;o[0]=o[0].replace(/%([a-zA-Z%])/g,function(a,s){if("%%"===a)return a;r++;var n=t.formatters[s];if("function"==typeof n){var i=o[r];a=n.call(e,i),o.splice(r,1),r--}return a}),t.formatArgs.call(e,o);(a.log||t.log||console.log.bind(console)).apply(e,o)}}return a.namespace=e,a.enabled=t.enabled(e),a.useColors=t.useColors(),a.color=s(e),"function"==typeof t.init&&t.init(a),a}function o(e){t.save(e),t.names=[],t.skips=[];for(var a=(e||"").split(/[\s,]+/),s=a.length,n=0;n<s;n++)a[n]&&(e=a[n].replace(/\*/g,".*?"),"-"===e[0]?t.skips.push(new RegExp("^"+e.substr(1)+"$")):t.names.push(new RegExp("^"+e+"$")))}function i(){t.enable("")}function r(e){var a,s;for(a=0,s=t.skips.length;a<s;a++)if(t.skips[a].test(e))return!1;for(a=0,s=t.names.length;a<s;a++)if(t.names[a].test(e))return!0;return!1}function c(e){return e instanceof Error?e.stack||e.message:e}t=e.exports=n.debug=n.default=n,t.coerce=c,t.disable=i,t.enable=o,t.enabled=r,t.humanize=a(500),t.names=[],t.skips=[],t.formatters={};var l},500:function(e,t){function a(e){if(e=String(e),!(e.length>1e4)){var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(t){var a=parseFloat(t[1]);switch((t[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return a*u;case"days":case"day":case"d":return a*l;case"hours":case"hour":case"hrs":case"hr":case"h":return a*c;case"minutes":case"minute":case"mins":case"min":case"m":return a*r;case"seconds":case"second":case"secs":case"sec":case"s":return a*i;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return a;default:return}}}}function s(e){return e>=l?Math.round(e/l)+"d":e>=c?Math.round(e/c)+"h":e>=r?Math.round(e/r)+"m":e>=i?Math.round(e/i)+"s":e+"ms"}function n(e){return o(e,l,"day")||o(e,c,"hour")||o(e,r,"minute")||o(e,i,"second")||e+" ms"}function o(e,t,a){if(!(e<t))return e<1.5*t?Math.floor(e/t)+" "+a:Math.ceil(e/t)+" "+a+"s"}var i=1e3,r=60*i,c=60*r,l=24*c,u=365.25*l;e.exports=function(e,t){t=t||{};var o=typeof e;if("string"===o&&e.length>0)return a(e);if("number"===o&&!1===isNaN(e))return t.long?n(e):s(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},503:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(497),n=function(e){return e&&e.__esModule?e:{default:e}}(s);t.default={data:function(){return{subject:{},errorMsgShow:!1,loading:!1}},computed:{bilibiliURL:function(){return"http://search.bilibili.com/all?keyword="+this.subject.title+"&page=1&duration=4&tids_1=23"}},methods:{},beforeMount:function(){var e=this,t=this.$route.params.id;if(!t)return void(this.errorMsgShow=!0);this.loading=!0,(0,n.default)("https://api.douban.com/v2/movie/subject/"+t,null,function(t,a){t?(e.loading=!1,e.errorMsgShow=!0,console.error(t.message)):(e.loading=!1,5e3==a.code?e.errorMsgShow=!0:e.subject=a)})}}},513:function(e,t,a){t=e.exports=a(188)(),t.push([e.i,".movie-detail-title[data-v-2e82f39a]{font-size:20px}.movie-summary-title[data-v-2e82f39a]{font-size:16px;color:#0fa752;margin-bottom:10px}.movie-summary[data-v-2e82f39a]{text-indent:2em;font-size:14px;color:#475669}.movie-detail-item[data-v-2e82f39a]{position:relative;padding-left:200px}.movie-detail-cover[data-v-2e82f39a]{position:absolute;top:20px;left:0}.movie-detail-cover>img[data-v-2e82f39a]{display:block;width:200px;height:300px}.movie-detail-content[data-v-2e82f39a]{position:relative;padding:20px;min-height:300px}.movie-detail-content .movie-row[data-v-2e82f39a]{margin-bottom:6px}.movie-player[data-v-2e82f39a]{display:inline-block;margin-top:10px;height:44px}",""])},522:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.loading,expression:"loading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"fix-container"},[e.errorMsgShow?[a("h1",{staticClass:"text-gray text-center",staticStyle:{padding:"20px 0"}},[e._v("您打开页面的姿势好像有点不同呢")])]:[a("h1",{staticClass:"movie-detail-title"},[e._v(e._s(e.subject.title)+"  "+e._s(e.subject.original_title)+" ("+e._s(e.subject.year)+")")]),e._v(" "),a("div",{staticClass:"movie-detail-item"},[a("div",{staticClass:"movie-detail-cover"},[a("img",{attrs:{src:e.subject.images.large}})]),e._v(" "),a("div",{staticClass:"movie-detail-content"},[a("div",{staticClass:"movie-row"},[e._v("\n\t\t\t\t\t导演：\n\t\t\t\t\t"),e._l(e.subject.directors,function(t){return a("a",{staticClass:"movie-tag",attrs:{href:t.alt,target:"_blank"}},[e._v(e._s(t.name))])})],2),e._v(" "),a("div",{staticClass:"movie-row"},[e._v("\n\t\t\t\t\t主演：\n\t\t\t\t\t"),e._l(e.subject.casts,function(t){return a("a",{staticClass:"movie-tag",attrs:{href:t.alt,target:"_blank"}},[e._v(e._s(t.name))])})],2),e._v(" "),a("div",{staticClass:"movie-row"},[e._v("\n\t\t\t\t\t类型：\n\t\t\t\t\t"),e._l(e.subject.genres,function(t){return a("el-tag",{staticClass:"movie-genre",attrs:{type:"success"}},[e._v(e._s(t))])})],2),e._v(" "),a("div",{staticClass:"movie-row"},[e._v("\n\t\t\t\t\t制片国家/地区：\n\t\t\t\t\t"),a("span",{staticClass:"movie-tag"},[e._v(e._s(e.subject.countries.join("/")))])]),e._v(" "),a("div",{staticClass:"movie-row"},[e._v("\n\t\t\t\t\t又名："),a("span",{staticClass:"movie-tag"},[e._v(e._s(e.subject.aka.join("/")))])]),e._v(" "),a("div",{staticClass:"movie-row"},[e._v("\n\t\t\t\t\t评分："),a("span",{staticStyle:{color:"#F7BA2A"}},[e._v(e._s(e.subject.rating.average))]),a("span",{staticClass:"movie-tag"},[e._v("/"+e._s(e.subject.rating.max))]),a("span",{staticClass:"movie-tag"},[e._v("("+e._s(e.subject.ratings_count)+"人评分)")])]),e._v(" "),a("el-tooltip",{staticClass:"movie-player",attrs:{effect:"dark",content:"前往 Bilibili 观看",placement:"bottom"}},[a("a",{attrs:{href:e.bilibiliURL,target:"_blank"}},[a("img",{staticStyle:{height:"44px"},attrs:{src:"static/images/fool.gif"}}),e._v(" "),a("img",{staticStyle:{height:"44px"},attrs:{src:"static/images/player.jpg"}})])])],1)]),e._v(" "),a("div",[a("h3",{staticClass:"movie-summary-title"},[e._v(e._s(e.subject.title)+"的剧情简介")]),e._v(" "),a("p",{staticClass:"movie-summary"},[e._v(e._s(e.subject.summary))])])]],2)},staticRenderFns:[]}},532:function(e,t,a){var s=a(513);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a(189)("726caa47",s,!0)}});