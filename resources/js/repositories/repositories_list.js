;$(function(){
  page.init();
});
var page=(function(){
  var tableInit=function(){
    var dataList=[
      {name:"EvanLiu2968.github.io",view:"1",description:"github个人主页"},
      {name:"notebook",view:"0",description:"前端开发填坑手册"},
      {name:"ionic-weixin",view:"1",description:"ionic搭建的仿微信混合APP"},
      {name:"h5-animate",view:"1",description:"用jQuery和animate.css搭建的宣传H5"},
      {name:"Angular1.3_Admin_Template",view:"1",description:"用gulp搭建的基于Angular1.3的后台管理模版"},
      {name:"cyztc",view:"1",description:"春运直通车"}
    ];
    var columns=[
      {
        checkbox:true,title:""
      },
      {
        field:"name",title:"名称",width:"200px"
      },
      {
        field:"name",title:"地址",width:"160px",
        formatter:function(value,row,index){
          var base='https://github.com/EvanLiu2968/';
          var url='https://evanliu2968.github.io/';
          if(row.view=="1"){
            return '<a href="'+base+value+'" target="_blank" style="margin-right:10px"><button>源地址</button></a>' +
                '<a href="'+url+value+'" target="_blank"><button>演示地址</button></a>'
          }else {
            return '<a href="'+base+value+'" target="_blank" style="margin-right:10px"><button>源地址</button></a>'
          }
        }
      },
      {
        field:"description",title:"描述"
      }
    ];
    function queryParams(params){
      console.log(params);
      return params;
    }
    var option={
      //method: 'get',
      //url: '/qStock/AjaxPage',
      //dataType: "json", //服务器返回数据类型
      classes:"table table-hover table-responsive",
      columns: columns, //列
      data:dataList,  //使用url时，不需要data
      idField: "id",  //标识哪个字段为id主键
      sidePagination: "client",//设置在哪里进行分页，可选值为 'client' 或者 'server'
      queryParams: queryParams, //传参函数
      clickToSelect:false,
      singleSelect:false, //设置单选
      checkboxHeader:true,//设置false 将在列头隐藏check-all checkbox
      showExport: true,//显示导出按钮
      exportDataType: "all",//导出类型,support: 'basic', 'all', 'selected'.
      exportTypes:['excel','doc','txt','json', 'xml', 'csv',  'sql' ],
      onLoadError: function (status) {
        $('#table').bootstrapTable('removeAll');
      },
      onLoadSuccess:function(data){
      },
      onClickRow: function (row,$element) {
      }
    };
    option=common.extend(common.getBootstrapTableOption(),option);
    $("#table").bootstrapTable(option);
  };
  //组件初始化；
  var componentInit=function(){
    $("#modal-add-save").on("click",function(){
      var valid=$("#form-add").valid();
      console.log(valid);
      if(valid)return;
    });
    $("#modal-edit-save").on("click",function(){
      var valid=$("#form-edit").valid();
      if(valid)return;
    });
    $("#btn-edit").on("click",function(){
      var rows=$("#table").bootstrapTable("getSelections");
      if(rows.length==0){
        $.msg("请选择需要编辑的设备！");
        return;
      }
      $('#form-edit input[name="name"]').val(rows[0].name);
      $('#form-edit input[name="view"]').prop("checked",rows[0].view=='1'?true:false);
      $('#form-edit input[name="description"]').val(rows[0].description);
      $("#editModal").modal("show");
    });
    $("#btn-delete").on("click",function(){
      var rows=$("#table").bootstrapTable("getSelections");
      if(rows.length==0) {
        $.msg("请选择需要删除的设备！");
        return;
      }
      layer.closeAll();
      $.confirm("确定要删除此设备信息吗？",function(){
        layer.closeAll();
        var load=$.showLoading();
          var names=[];
          for(var k in rows){
            names.push(rows[k].name)
          }
          console.log(rows[0].name);
          $("#table").bootstrapTable('remove',{field: 'name', values: names});
          $.hideLoading(load);
      })
    });
  };
  return {
    init:function(){
      tableInit();
      formValidateInit("#form-add");
      formValidateInit("#form-edit");
      componentInit();
        
    }
  }
})();