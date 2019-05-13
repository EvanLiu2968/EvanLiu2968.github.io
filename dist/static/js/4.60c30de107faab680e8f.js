webpackJsonp([4],{

/***/ 534:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(648)

var Component = __webpack_require__(93)(
  /* script */
  __webpack_require__(607),
  /* template */
  __webpack_require__(634),
  /* scopeId */
  "data-v-3a870c70",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 590:
/***/ (function(module, exports) {

/**
 * base Loader class
 */
module.exports = class Loader {
  constructor(){
    this.appendToHead.bind(this);
    this.appendToBody.bind(this);
  }

  asyncCallback(cb){
    setTimeout(function() {
      typeof cb == 'function' ? cb() : ''
    }, 100);
  }

  appendToHead(el){
    this.getHead().appendChild(el)
  }

  appendToBody(el){
    if (this.container == null) {
      this.container = document.createElement("div");
      this.container.id = "preload-container";
      var style = this.container.style;
      style.visibility = "hidden";
      style.position = "absolute";
      style.width = this.container.style.height = "10px";
      style.overflow = "hidden";
      style.transform = style.msTransform = style.webkitTransform = style.oTransform = "translate(-10px, -10px)"; //LM: Not working
      this.getBody().appendChild(this.container);
    }
    this.container.appendChild(el);
  }
  
  getHead () {
    return document.head || document.getElementsByTagName("head")[0];
  }

  getBody () {
    return document.body || document.getElementsByTagName("body")[0];
  }

  removeChild(el) {
    if (el.parent) {
      el.parent.removeChild(el);
    }
  }

  subscribeMedia(el, cb) {
    if (el.complete) {
      cb();
    } else {
      el.onload = function() {
        cb();
      };

      el.onerror = function(e) {
        cb();
      };
    }
  }

  isImageTag(item) {
    return item instanceof HTMLImageElement;
  }

  isAudioTag(item) {
    if (window.HTMLAudioElement) {
      return item instanceof HTMLAudioElement;
    } else {
      return false;
    }
  }

  isVideoTag(item) {
    if (window.HTMLVideoElement) {
      return item instanceof HTMLVideoElement;
    } else {
      return false;
    }
  }
}

/***/ }),

/***/ 607:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(142);

var _stringify2 = _interopRequireDefault(_stringify);

var _webInject = __webpack_require__(658);

var _webInject2 = _interopRequireDefault(_webInject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      scaleIn: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  methods: {
    adminLogin: function adminLogin() {
      var _this = this;

      this.$refs['loginForm'].validate(function (valid) {
        if (valid) {
          var userInfo = JSON.parse((0, _stringify2.default)(_this.loginForm));
          if (userInfo.username === "admin" && userInfo.password === "123456") {
            userInfo.role = 'admin';
            _this.$store.commit('loginIn', userInfo);
            _this.$router.push('/blog/home');
          } else {
            _this.$message.error("用户名或密码错误！");
          }
        } else {
          return false;
        }
      });
    },
    visitorLogin: function visitorLogin() {
      this.$router.push('/blog/home');
    }
  },
  mounted: function mounted() {
    _webInject2.default.js('https://cdn.bootcss.com/particles.js/2.0.0/particles.min.js', function () {
      particlesJS("particlesJS", {
        "particles": {
          "number": {
            "value": 100,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": ["image"],
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "/public/images/star.png",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.5,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 1,
              "opacity_min": 0.2,
              "sync": false
            }
          },
          "size": {
            "value": 5,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 1,
              "size_min": 0.3,
              "sync": true
            }
          },
          "line_linked": {
            "enable": false,
            "distance": 100,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 0.5
          },
          "move": {
            "enable": true,
            "speed": 1,
            "direction": "bottom-right",
            "random": true,
            "straight": true,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": true,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": false,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 120,
              "line_linked": {
                "opacity": 0.5
              }
            },
            "bubble": {
              "distance": 100,
              "size": 5,
              "duration": 2,
              "opacity": 0.8,
              "speed": 1
            },
            "repulse": {
              "distance": 400,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      });
    });

    this.scaleIn = true;
  }
};

/***/ }),

/***/ 618:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(92)();
// imports


// module
exports.push([module.i, ".login-wrap[data-v-3a870c70]{position:relative;width:100%;height:100%;background-color:#09090b}@-webkit-keyframes scaleIn{0%{opacity:0;-webkit-transform:scale3d(0,0,0);transform:scale3d(0,0,0)}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes scaleIn{0%{opacity:0;-webkit-transform:scale3d(0,0,0);transform:scale3d(0,0,0)}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}}.login-box[data-v-3a870c70]{position:absolute;left:50%;top:50%;width:300px;margin:-150px 0 0 -190px;padding:40px;border-radius:5px;background-color:#fff;opacity:0;-webkit-transform:scale3d(0,0,0);transform:scale3d(0,0,0)}.scaleIn[data-v-3a870c70]{-webkit-animation-duration:.6s;animation-duration:.6s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:scaleIn;animation-name:scaleIn}.login-btn[data-v-3a870c70]{display:block;margin:0 0 10px;width:100%;height:36px}", ""]);

// exports


/***/ }),

/***/ 634:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login-wrap",
    attrs: {
      "id": "particlesJS"
    }
  }, [_c('div', {
    staticClass: "login-box",
    class: {
      'scaleIn': _vm.scaleIn
    }
  }, [_c('el-form', {
    ref: "loginForm",
    attrs: {
      "model": _vm.loginForm,
      "rules": _vm.loginFormRules,
      "label-width": "0px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "prop": "username"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "用户名"
    },
    model: {
      value: (_vm.loginForm.username),
      callback: function($$v) {
        _vm.$set(_vm.loginForm, "username", $$v)
      },
      expression: "loginForm.username"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "prop": "password"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "password",
      "placeholder": "密码"
    },
    nativeOn: {
      "keyup": function($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) { return null; }
        return _vm.adminLogin('loginForm')
      }
    },
    model: {
      value: (_vm.loginForm.password),
      callback: function($$v) {
        _vm.$set(_vm.loginForm, "password", $$v)
      },
      expression: "loginForm.password"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "text-center"
  }, [_c('el-button', {
    staticClass: "login-btn",
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.adminLogin
    }
  }, [_vm._v("登录")]), _vm._v(" "), _c('el-button', {
    staticClass: "pull-right",
    attrs: {
      "type": "text"
    },
    on: {
      "click": _vm.visitorLogin
    }
  }, [_vm._v("我是游客")])], 1), _vm._v(" "), _c('p', {
    staticStyle: {
      "font-size": "12px",
      "line-height": "30px",
      "color": "#999"
    }
  }, [_vm._v("Tips : 管理员帐号登录。")])], 1)], 1)])
},staticRenderFns: []}

/***/ }),

/***/ 648:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(618);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(94)("79fb4ea4", content, true);

/***/ }),

/***/ 653:
/***/ (function(module, exports, __webpack_require__) {

const Loader = __webpack_require__(590)

class AudioLoader extends Loader {
  constructor(){
    super()
  }

  createRemoteAudio(src, cb){
    var tag = document.createElement('audio');
    tag.autoplay = false;
    //LM: Firefox fails when this the preload="none" for other tags, but it needs to be "none" to ensure PreloadJS works.
    // tag.preload = "none";
    tag.src = src;
    this.subscribeMedia(tag, cb)
  }

  load(src, cb){
    this.createRemoteAudio(src, cb)
  }
}

module.exports = new AudioLoader()

/***/ }),

/***/ 654:
/***/ (function(module, exports, __webpack_require__) {

const Loader = __webpack_require__(590)

class CSSLoader extends Loader {
  constructor(){
    super()
  }

  createRemoteCSS(src, cb){
    const self = this
    var tag = document.createElement('link');
    tag.onload = tag.onreadystatechange = function(){
      if( ! this.readyState || this.readyState=='loaded' || this.readyState=='complete' ){
        self.asyncCallback(cb)
      }
    }
  
    if (src.lastIndexOf('.css')==-1) src += '.css';
    tag.setAttribute("rel", 'stylesheet');
    tag.setAttribute("href", src);

    this.appendToHead(tag)
  }

  createInnerCSS(cssCode, cb){
    var tag = document.createElement('style'); // w3c
    tag.setAttribute("rel", "stylesheet");
    tag.setAttribute("type", "text/css");

    this.appendToHead(tag)
  
    var media = tag.getAttribute("media");
    if (media != null && !/screen/.test(media.toLowerCase())) {
      tag.setAttribute("media", "screen");
    }
    if (tag.styleSheet) {    // IE
      tag.styleSheet.cssText += cssCode;
    } else if (document.getBoxObjectFor) {
      tag.innerHTML += cssCode; // FireFox broswer
    } else {
      tag.appendChild(document.createTextNode(cssCode))
    }
    this.asyncCallback(cb)
  }

  load(src, cb){
    if (!src) return;
    if (src.indexOf('http')==0 || src.indexOf('/')==0) {
      this.createRemoteCSS(src, cb)
    } else {
      this.createInnerCSS(src, cb)
    }
  }
}

module.exports = new CSSLoader()

/***/ }),

/***/ 655:
/***/ (function(module, exports, __webpack_require__) {

const Loader = __webpack_require__(590)

class ImageLoader extends Loader {
  constructor(){
    super()
  }

  createRemoteImage(src, cb){
    var tag = document.createElement('img');
    tag.src = src;
    this.subscribeMedia(tag, cb)
  }

  load(src, cb){
    this.createRemoteImage(src, cb)
  }
}

module.exports = new ImageLoader()

/***/ }),

/***/ 656:
/***/ (function(module, exports, __webpack_require__) {

const Loader = __webpack_require__(590)

class JSLoader extends Loader {
  constructor(){
    super()
  }

  createRemoteJS(src, cb){
    const self = this
    var tag = document.createElement('script');
    tag.setAttribute("type", 'text/javascript');
    tag.setAttribute("src", src);
  
    tag.onload = tag.onreadystatechange = function(){
      if( ! this.readyState || this.readyState=='loaded' || this.readyState=='complete' ){
        self.asyncCallback(cb)
      }
    }
    
    this.appendToHead(tag)
  }
  
  createInnerJS(jsCode, cb){
    var tag = document.createElement('script');
    tag.setAttribute("type", 'text/javascript');
  
    tag.appendChild(document.createTextNode(jsCode))
  
    this.appendToHead(tag)
  
    this.asyncCallback(cb)
  }

  load(src, cb){
    if (!src) return;
    if (src.indexOf('http')==0 || src.indexOf('/')==0) {
      this.createRemoteJS(src, cb)
    } else {
      this.createInnerJS(src, cb)
    }
  }
}

module.exports = new JSLoader()

/***/ }),

/***/ 657:
/***/ (function(module, exports, __webpack_require__) {

const Loader = __webpack_require__(590)

class VideoLoader extends Loader {
  constructor(){
    super()
  }

  createRemoteVideo(src, cb){
    var tag = document.createElement('video');
    tag.autoplay = false;
    //LM: Firefox fails when this the preload="none" for other tags, but it needs to be "none" to ensure PreloadJS works.
    // tag.preload = "none";
    tag.src = src;
    this.subscribeMedia(tag, cb)
  }

  load(src, cb){
    this.createRemoteVideo(src, cb)
  }
}

module.exports = new VideoLoader()

/***/ }),

/***/ 658:
/***/ (function(module, exports, __webpack_require__) {

/*
 * https://github.com/EvanLiu2968/web-inject
 * inject css/js, for client and server, also support inject css/js array or code
 */

const isClient = typeof window != 'undefined'

const finishedTask = {}

class Loader {
  constructor(options){
    this.options = Object.assign({
      serial: false, // 是否串行加载
      urlFormat: function(url, type){ return url },
      onComplete: function(){},
      maxConnection: 4
    }, options)
    this.Loader = {
      'js': __webpack_require__(656),
      'css': __webpack_require__(654),
      'image': __webpack_require__(655),
      'audio': __webpack_require__(653),
      'video': __webpack_require__(657),
    };
    this.taskCount = 0;
  }

  getFinishedTask() {
    return finishedTask
  }

  isFinishedTask(url) {
    return !!finishedTask[url]
  }

  addFinishedTask(url) {
    if(!this.isFinishedTask(url)){
      finishedTask[url] = {
        state: 'finished'
      }
    }
  }

  startQueue(queue, options){
    // 队列任务串行加载
    if(options.serial) {
      options.currentTask = options.currentTask || 0
      if(options.currentTask < queue.length){
        let task = queue[options.currentTask]
        const callback = ()=>{
          options.currentTask++;
          if(task.callback) {
            task.callback();
            queue = []
            return
          }
          this.startQueue(queue, options)
        }
        if(this.isFinishedTask(task.url)){
          callback()
        } else {
          let loader = this.Loader[task.type]
          loader.load(task.url, () => {
            this.addFinishedTask(task.url)
            callback()
          })
        }
      }
      return
    }
    // 队列任务并行加载
    for(let i = 0; i < queue.length; i++){
      if(this.taskCount < options.maxConnection){
        if(!queue[i].state){
          let task = queue[i]
          const callback = ()=>{
            this.taskCount--;
            queue[i].state = 'finished'
            if(task.callback) {
              task.callback();
              queue = []
              return
            }
            this.startQueue(queue, options)
          }
          this.taskCount++;
          queue[i].state = 'loading'
          if(this.isFinishedTask(task.url)){
            callback()
          } else {
            let loader = this.Loader[task.type]
            loader.load(task.url, () => {
              this.addFinishedTask(task.url)
              callback()
            })
          }
        }
      }
    }
  }

  create(options){
    return new Loader(options)
  }

  preload(options){
    if(!isClient) return;

    options = Object.assign({}, this.options, options)

    let loadType = ['js', 'css', 'image', 'audio', 'video'];
    let queue = [];
    loadType.forEach((item, i)=>{

      if(!options[item]) return;

      if(Array.isArray(options[item])){
        options[item].map(u=>{
          queue.push({
            url: options.urlFormat(u, item),
            type: item
          })
        })
      }else{
        queue.push({
          url: options.urlFormat(options[item], item),
          type: item
        })
      }
    })
    queue[queue.length-1].callback = options.onComplete;
    this.startQueue(queue, options)
    return this
  }

  load(type, src, cb){
    let options = {
      onComplete: cb
    }
    if(type === 'js') {
      options.serial = true
    }
    options[type] = src;
    return this.preload(options)
  }

  js(src, cb){
    return this.load('js', src, cb)
  }

  css(src, cb){
    return this.load('css', src, cb)
  }

  image(src, cb){
    return this.load('image', src, cb)
  }

  audio(src, cb){
    return this.load('audio', src, cb)
  }

  video(src, cb){
    return this.load('video', src, cb)
  }
}

module.exports = new Loader()

/***/ })

});