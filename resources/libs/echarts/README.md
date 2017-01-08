#commonChart.js#
> 抽离图表插件常用图标样式配置

###echarts.js引用文件说明###
> http://echarts.baidu.com/download.html
- echarts.min.js 完整版：包含所有图表组件
- echarts.js 源码：包含所有图表组件源码，常见警告，错误提示
- echarts.common.min.js 常用版：包含常用图表组件
- echarts.simple.min.js 精简版：包含基础图表组件
- vintage.js 复古主题
- dark.js 深色主题
- world.json、china.json、guangdong.json 地图数据

###commonChart.js使用说明###
详情请参考demo.html
```
<script>
    var myChart = echarts.init(document.getElementById('pie'));

    // 扩展图表的配置项和数据
    var option = {
	    title : {
	        text: '广州客流去向分布图',
	        subtext: '周边城市',
        },
	    legend: {
	        data: ['深圳','东莞','佛山','珠海','中山']
	    },
	    series : [
	        {
	            name: '客流去向',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            data:[
	                {value:335, name:'深圳'},
	                {value:310, name:'东莞'},
	                {value:234, name:'佛山'},
	                {value:135, name:'珠海'},
	                {value:89, name:'中山'}
	            ],
	        }
	    ]
    };
    //commonChart.extend(即$.extend)第一个参数设为true(默认false)，开启深拷贝
    option=commonChart.extend(true,commonChart.echarts.getOption('pie'),option);
    // 使用合并后的配置项和数据显示图表。
    myChart.setOption(option);
</script>
```