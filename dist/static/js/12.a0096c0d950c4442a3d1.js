webpackJsonp([12],{533:function(e,t,i){var o=i(93)(i(593),i(634),null,null);e.exports=o.exports},593:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i(141),n=function(e){return e&&e.__esModule?e:{default:e}}(o);t.default={data:function(){return{sourceBase:"https://github.com/EvanLiu2968/",viewBase:"https://evanliu2968.github.io/",dataList:[{name:"EvanLiu2968.github.io",view:"1",description:"Github pages, vue single page APP"},{name:"evanliu2968",view:"1",description:"Git reposity for www.evanliu2968.com.cn, egg-react-ssr"},{name:"Athena",view:"0",description:"This is a AI called Athena"},{name:"Cupid",view:"0",description:"ლ(╹◡╹ლ) じò ぴé"},{name:"Memento",view:"0",description:"Memento code"},{name:"InjectJS",view:"1",description:"Chrome extension, for injecting js to broswer"},{name:"vue-component",view:"1",description:"Vue组件库"},{name:"react-component",view:"1",description:"React组件库"},{name:"el-checkbox",view:"1",description:"一套checkbox、radio、switch UI库"},{name:"gulp-react-ssr-mpa",view:"0",description:"React server side render MPA"},{name:"fis3-seed",view:"0",description:"Fis3构建工具启动种子"},{name:"gulp-webapp",view:"1",description:"Gulp构建流的webAPP"},{name:"clover",view:"0",description:"三叶草，【love，health，glory】"},{name:"manifast",view:"0",description:"清单"},{name:"ionic-weixin",view:"1",description:"ionic,仿微信Hybrid App"}],dialogFormVisible:!1,editForm:{}}},methods:{handleEdit:function(e,t){var i=JSON.parse((0,n.default)(t));i.index=e,this.editForm=i,this.dialogFormVisible=!0},handleDelete:function(e,t){var i=this;this.$confirm("此操作将永久删除该该项目, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.$message({type:"error",message:"游客无法删除！"})})},saveForm:function(){var e=this.editForm.index;this.$set(this.dataList,e,this.editForm),this.$set(this.dataList,e,this.editForm),this.dialogFormVisible=!1,this.$message({type:"error",message:"游客无法编辑！"})}},beforeMount:function(){}}},634:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"content"},[i("div",{staticClass:"table"},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:e.dataList,border:""}},[i("el-table-column",{attrs:{prop:"name",label:"仓库名",width:"200"}}),e._v(" "),i("el-table-column",{attrs:{prop:"tag",label:"地址",width:"170"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("a",{attrs:{href:e.sourceBase+t.row.name,target:"_blank"}},[i("el-tag",{attrs:{type:"primary"}},[e._v("源地址")])],1),e._v(" "),"1"===t.row.view?i("a",{attrs:{href:e.viewBase+t.row.name,target:"_blank"}},[i("el-tag",{attrs:{type:"success"}},[e._v("首页/文档")])],1):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{prop:"description",label:"详情描述"}}),e._v(" "),i("el-table-column",{attrs:{label:"管理",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button-group",[i("el-button",{attrs:{size:"small"},on:{click:function(i){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),i("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(i){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])],1)]}}])})],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"编辑信息"},model:{value:e.dialogFormVisible,callback:function(t){e.dialogFormVisible=t},expression:"dialogFormVisible"}},[i("el-form",{ref:"editForm",attrs:{model:e.editForm}},[i("el-form-item",{attrs:{label:"仓库名","label-width":"120px",prop:"name"}},[i("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.editForm.name,callback:function(t){e.$set(e.editForm,"name",t)},expression:"editForm.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"详情描述","label-width":"120px",prop:"description",rules:{required:!0,message:"请填写地址",trigger:"blur"}}},[i("el-input",{attrs:{"auto-complete":"off"},model:{value:e.editForm.description,callback:function(t){e.$set(e.editForm,"description",t)},expression:"editForm.description"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.saveForm()}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]}}});