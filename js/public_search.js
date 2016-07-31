/**
 * Created by Administrator on 2016/7/30.
 */
var publicSearch = (function($){
	var id_card;
	//身份证查询；
	var idcard_search=function(){
		$("#id_card_info .btn-search").click(function(){
			id_card = $("#id_card_info input[name='id_card']").val();
			var key="b23dc3ca8d841356331b30898eb2232a";
			if(id_card==""){
				alert("请输入身份证号码！");
			}else{
				$.ajax({
					url:'http://apis.juhe.cn/idcard/index?key='+key+'&cardno='+id_card,
					type:'GET',
					dataType:'jsonp',         //指定为jsonp类型
					success:function(data){
						if(data.resultcode=="201"){
							alert(data.reason)
						}else if(data.resultcode=="200"){
							var area=data.result.area;
							var birthday=data.result.birthday;
							var sex=data.result.sex;
							var reponse_box='';
							reponse_box+= '<div class="response-box">'+
								'<a class="btn-expand btn1" onclick="publicSearch.id_card_out()">查询是否泄漏</a>'+
								'<a class="btn-expand btn2" onclick="publicSearch.id_card_lose()">查询是否挂失</a>'+
								'<p>性别：<span class="response-result">'+sex+'</span></p>'+
								'<p>地区：<span class="response-result">'+area+'</span></p>'+
								'<p>出生日期：<span class="response-result">'+birthday+'</span></p>'+
								'<p id="id_card_tip"></p></div>';
							$("#id_card_info_response").html(reponse_box);
						}
					},
					error:function(data){
						alert(data);
					}
				})
			}
		});
	};
	//手机号码查询；
	var phoneno_search=function(){
		$("#phoneno_info .btn-search").click(function(){
			var phoneno = $("#phoneno_info input[name='phoneno']").val();
			var key="737ae7282c7bd80db9036789720a641f";
			if(phoneno==""){
				alert("请输入手机号码！");
			}else{
				$.ajax({
					url:'http://apis.juhe.cn/mobile/get?phone='+phoneno+'&key='+key,
					type:'GET',
					dataType:'jsonp',         //指定为jsonp类型
					success:function(data){
						if(data.resultcode=="201"){
							alert(data.reason)
						}else if(data.resultcode=="200"){
							var reponse_box='';
							reponse_box+= '<div class="response-box">'+
								'<p>省份：<span class="response-result">'+data.result.province+'</span></p>'+
								'<p>城市：<span class="response-result">'+data.result.city+'</span></p>'+
								'<p>区号：<span class="response-result">'+data.result.areacode+'</span></p>'+
								'<p>邮编：<span class="response-result">'+data.result.zip+'</span></p>'+
								'<p>运营商：<span class="response-result">'+data.result.company+'</span></p>'+
								'<p>卡类型：<span class="response-result">'+data.result.card+'</span></p>';
								//'<p id="id_card_tip"></p></div>';
							$("#phoneno_info_response").html(reponse_box);
						}
					},
					error:function(data){
						alert(data);
					}
				})
			}
		});
	};

	return {
		init:function(){
			idcard_search();
			phoneno_search();
		},
		//身份证泄漏查询
		id_card_out:function (){
			var key="b23dc3ca8d841356331b30898eb2232a";
			var safe="#3c763d";
			var warning="#8a6d3b";
			var danger="#a94442";
			var tip_msg=$("#id_card_tip");
			if(id_card==""){
				alert("请输入身份证号码！");
			}else{
				$.ajax({
					url:'http://apis.juhe.cn/idcard/leak?key='+key+'&cardno='+id_card+'&dtype=json',
					type:'GET',
					dataType:'jsonp',         //指定为jsonp类型
					success:function(data){
						if(data.resultcode=="201"){
							alert(data.reason)
						}else if(data.resultcode=="200"){
							var tips=data.result.tips;
							if(tips=="安全"){
								tip_msg.css("color",safe);
								tips="您的身份证信息处于安全状态"
							}else if(tips=="疑似泄露"){
								tip_msg.css("color",danger);
								tips="您的身份证信息疑似泄露"
							}else if(tips=="未知"){
								tip_msg.css("color",warning);
								tips="您的身份证信息泄漏情况未知"
							}
							tip_msg.html(tips);
						}
					},
					error:function(data){
						alert(data);
					}
				})
			}
		},
		//身份证挂失查询
		id_card_lose:function (){
			var key="b23dc3ca8d841356331b30898eb2232a";
			var safe="#3c763d";
			var warning="#8a6d3b";
			var danger="#a94442";
			var tip_msg=$("#id_card_tip");
			if(id_card==""){
				alert("请输入身份证号码！");
			}else{
				$.ajax({
					url:'http://apis.juhe.cn/idcard/loss?key='+key+'&cardno='+id_card+'&dtype=json',
					type:'GET',
					dataType:'jsonp',         //指定为jsonp类型
					success:function(data){
						if(data.resultcode=="201"){
							alert(data.reason)
						}else if(data.resultcode=="200"){
							var tips=data.result.tips;
							if(tips=="未挂失"){
								tip_msg.css("color",safe);
								tips="您的身份证未挂失"
							}else if(tips=="挂失"){
								tip_msg.css("color",danger);
								tips="您的身份证已挂失！"
							}else if(tips=="未知"){
								tip_msg.css("color",warning);
								tips="您的身份证挂失查询未知"
							}
							tip_msg.html(tips);
						}
					},
					error:function(data){
						alert(data);
					}
				})
			}
		}
	}

})(jQuery);