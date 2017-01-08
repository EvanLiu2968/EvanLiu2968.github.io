/*****************************************************************
@import "./jquery.metadata.js"
 *****************************************************************/
(function($) {
    //console.log('@import "./jquery.metadata.js"');

    $.extend({
      metadata : {
        defaults : {
          type: 'class',
          name: 'metadata',
          cre: /({.*})/,
          single: 'metadata'
        },
        setType: function( type, name ){
          this.defaults.type = type;
          this.defaults.name = name;
        },
        get: function( elem, opts ){
          var settings = $.extend({},this.defaults,opts);
          // check for empty string in single property
          if ( !settings.single.length ) settings.single = 'metadata';
          
          var data = $.data(elem, settings.single);
          // returned cached data if it already exists
          if ( data ) return data;
          
          data = "{}";
          
          var getData = function(data) {
            if(typeof data != "string") return data;
            
            if( data.indexOf('{') < 0 ) {
              data = eval("(" + data + ")");
            }
          };
          
          var getObject = function(data) {
            if(typeof data != "string") return data;
            
            data = eval("(" + data + ")");
            return data;
          };
          
          if ( settings.type == "html5" ) {
            var object = {};
            $( elem.attributes ).each(function() {
              var name = this.nodeName;
              if(name.match(/^data-/)) name = name.replace(/^data-/, '');
              else return true;
              object[name] = getObject(this.nodeValue);
            });
          } else {
            if ( settings.type == "class" ) {
              var m = settings.cre.exec( elem.className );
              if ( m )
                data = m[1];
            } else if ( settings.type == "elem" ) {
              if( !elem.getElementsByTagName ) return;
              var e = elem.getElementsByTagName(settings.name);
              if ( e.length )
                data = $.trim(e[0].innerHTML);
            } else if ( elem.getAttribute != undefined ) {
              var attr = elem.getAttribute( settings.name );
              if ( attr )
                data = attr;
            }
            object = getObject(data.indexOf("{") < 0 ? "{" + data + "}" : data);
          }
          
          $.data( elem, settings.single, object );
          return object;
        }
      }
    });

    $.fn.metadata = function( opts ){
      return $.metadata.get( this[0], opts );
    };

})(jQuery);

/*****************************************************************
@import "./messages_zh.js"
 *****************************************************************/
(function( factory ) {
    //console.log('@import "./messages_zh.js"');
    if ( typeof define === "function" && define.amd ) {
        define( ["jquery", "./jquery.validate"], factory );
    } else {
        factory( jQuery );
    }
}(function( $ ) {

    /*
     * Translated default messages for the jQuery validation plugin.
     * Locale: ZH (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
     */
    $.extend($.validator.messages, {
        required: "该输入项为必填项",
        remote: "请修正此字段",
        email: "请输入有效的电子邮件地址",
        url: "请输入有效的网址",
        date: "请输入有效的日期",
        dateISO: "请输入有效的日期 (YYYY-MM-DD)",
        number: "请输入有效的数字",
        digits: "只能输入数字",
        creditcard: "请输入有效的信用卡号码",
        equalTo: "您的两次输入不相同",
        extension: "请输入有效的后缀",
        maxlength: $.validator.format("最多可以输入 {0} 个字符"),
        minlength: $.validator.format("最少要输入 {0} 个字符"),
        rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
        range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
        max: $.validator.format("请输入不大于 {0} 的数值"),
        min: $.validator.format("请输入不小于 {0} 的数值")
    });

}));

/*****************************************************************
 jQuery Validate扩展验证方法
 *****************************************************************/
(function(){
    //console.log('@import jQuery Validate扩展验证方法');

    // 判断整数value是否等于0
    jQuery.validator.addMethod("isIntEqZero", function(value, element) {
        value=parseInt(value);
        return this.optional(element) || value==0;
    }, "整数必须为0");

    // 判断整数value是否大于0
    jQuery.validator.addMethod("isIntGtZero", function(value, element) {
        value=parseInt(value);
        return this.optional(element) || value>0;
    }, "整数必须大于0");

    // 判断整数value是否大于或等于0
    jQuery.validator.addMethod("isIntGteZero", function(value, element) {
        value=parseInt(value);
        return this.optional(element) || value>=0;
    }, "整数必须大于或等于0");

    // 判断整数value是否不等于0
    jQuery.validator.addMethod("isIntNEqZero", function(value, element) {
        value=parseInt(value);
        return this.optional(element) || value!=0;
    }, "整数必须不等于0");

    // 判断整数value是否小于0
    jQuery.validator.addMethod("isIntLtZero", function(value, element) {
        value=parseInt(value);
        return this.optional(element) || value<0;
    }, "整数必须小于0");

    // 判断整数value是否小于或等于0
    jQuery.validator.addMethod("isIntLteZero", function(value, element) {
        value=parseInt(value);
        return this.optional(element) || value<=0;
    }, "整数必须小于或等于0");

    // 判断浮点数value是否等于0
    jQuery.validator.addMethod("isFloatEqZero", function(value, element) {
        value=parseFloat(value);
        return this.optional(element) || value==0;
    }, "浮点数必须为0");

    // 判断浮点数value是否大于0
    jQuery.validator.addMethod("isFloatGtZero", function(value, element) {
        value=parseFloat(value);
        return this.optional(element) || value>0;
    }, "浮点数必须大于0");

    // 判断浮点数value是否大于或等于0
    jQuery.validator.addMethod("isFloatGteZero", function(value, element) {
        value=parseFloat(value);
        return this.optional(element) || value>=0;
    }, "浮点数必须大于或等于0");

    // 判断浮点数value是否不等于0
    jQuery.validator.addMethod("isFloatNEqZero", function(value, element) {
        value=parseFloat(value);
        return this.optional(element) || value!=0;
    }, "浮点数必须不等于0");

    // 判断浮点数value是否小于0
    jQuery.validator.addMethod("isFloatLtZero", function(value, element) {
        value=parseFloat(value);
        return this.optional(element) || value<0;
    }, "浮点数必须小于0");

    // 判断浮点数value是否小于或等于0
    jQuery.validator.addMethod("isFloatLteZero", function(value, element) {
        value=parseFloat(value);
        return this.optional(element) || value<=0;
    }, "浮点数必须小于或等于0");

    // 判断浮点型
    jQuery.validator.addMethod("isFloat", function(value, element) {
        return this.optional(element) || /^[-\+]?\d+(\.\d+)?$/.test(value);
    }, "只能包含数字、小数点等字符");

    // 匹配integer
    jQuery.validator.addMethod("isInteger", function(value, element) {
        return this.optional(element) || (/^[-\+]?\d+$/.test(value) && parseInt(value)>=0);
    }, "匹配整数类型");

    // 匹配integer
    jQuery.validator.addMethod("isPercent", function(value, element) {
        return this.optional(element) || (/^[-\+]?\d+$/.test(value) && parseInt(value)>=0 && parseInt(value)<=100);
    }, "匹配整数类型(0~100之间)");

    // 判断数值类型，包括整数和浮点数
    jQuery.validator.addMethod("isNumber", function(value, element) {
        return this.optional(element) || /^[-\+]?\d+$/.test(value) || /^[-\+]?\d+(\.\d+)?$/.test(value);
    }, "匹配数值类型，包括整数和浮点数");

    // 只能输入[0-9]数字
    jQuery.validator.addMethod("isDigits", function(value, element) {
        return this.optional(element) || /^\d+$/.test(value);
    }, "只能输入0-9数字");

    // 判断中文字符
    jQuery.validator.addMethod("isChineseChar", function(value, element) {
        return this.optional(element) || /^[\u0391-\uFFE5]+$/.test(value);
    }, "只能包含中文字符");

    // 判断英文字符
    jQuery.validator.addMethod("isEnglishChar", function(value, element) {
        return this.optional(element) || /^[A-Za-z]+$/.test(value);
    }, "只能包含英文字符");

    // 手机号码验证
    jQuery.validator.addMethod("isMobile", function(value, element) {
        var length = value.length;
        return this.optional(element) || (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value));
    }, "请正确填写您的手机号码");

    // 电话号码验证
    jQuery.validator.addMethod("isTel", function(value, element) {
        var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
        return this.optional(element) || (tel.test(value));
    }, "请正确填写您的电话号码");

    // 联系电话(手机/电话皆可)验证
    jQuery.validator.addMethod("isPhone", function(value,element) {
        var length = value.length;
        var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
        return this.optional(element) || tel.test(value) || (length==11 && mobile.test(value));
    }, "请正确填写您的联系方式(手机/电话皆可)");

    // 匹配qq
    jQuery.validator.addMethod("isQq", function(value, element) {
        return this.optional(element) || /^[1-9]\d{4,12}$/;
    }, "请正确填写您的QQ");

    // 邮政编码验证
    jQuery.validator.addMethod("isZipCode", function(value, element) {
        var zip = /^[0-9]{6}$/;
        return this.optional(element) || (zip.test(value));
    }, "请正确填写您的邮政编码。");

    // 匹配密码，以字母开头，长度在6-12之间，只能包含字符、数字和下划线。
    jQuery.validator.addMethod("isPwd", function(value, element) {
        return this.optional(element) || /^[a-zA-Z]\\w{6,12}$/.test(value);
    }, "以字母开头，长度在6-12之间，只能包含字符、数字和下划线。");

    // 身份证号码验证
    jQuery.validator.addMethod("isIdCardNo", function(value, element) {
        //var idCard = /^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/;
        return this.optional(element) || isIdCardNo(value);
    }, "请输入正确的身份证号码。");

    // IP地址验证
    jQuery.validator.addMethod("ip", function(value, element) {
        return this.optional(element) || /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/.test(value);
    }, "请填写正确的IP地址。");

    // 字符验证，只能包含中文、英文、数字、下划线等字符。
    jQuery.validator.addMethod("stringCheck", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/.test(value);
    }, "只能包含中文、英文、数字、下划线等字符");

    // 字符验证，除了纯空格，支持中文、英文、数字、空格、括号、下划线、中划线、点号及其组合，包括中文（）—。，
    jQuery.validator.addMethod("charCheck", function(value, element) {
        return this.optional(element) ||/^[a-zA-Z0-9\u4e00-\u9fa5-_().（）—。，\s]*[a-zA-Z0-9\u4e00-\u9fa5-_().（）—。，][a-zA-Z0-9\u4e00-\u9fa5-_().（）—。，\s]*$/g.test(value);
    }, "名称支持中文、英文、数字、空格、括号、下划线、中划线、点号及其组合（单独输入空格不支持）");

    // 字符验证，除了纯空格，支持英文、数字、空格、下划线、中划线、点号及其组合
    jQuery.validator.addMethod("charEnCheck", function(value, element) {
        return this.optional(element) ||/^[a-zA-Z0-9-_.\s]*[a-zA-Z0-9-_.][a-zA-Z0-9-_.\s]*$/g.test(value);
    }, "名称支持英文、数字、空格、下划线、中划线、点号及其组合（单独输入空格不支持）");

    // 字符验证，不能只输入纯空格
    jQuery.validator.addMethod("isSpaceLimit", function(value, element) {
        return this.optional(element) ||/^[\s]*$/g.test(value)==false;
    }, "不能单独输入空格");

    // 匹配english
    jQuery.validator.addMethod("isEnglish", function(value, element) {
        return this.optional(element) || /^[A-Za-z]+$/.test(value);
    }, "请输入English");

    // 匹配汉字E
    jQuery.validator.addMethod("isChinese", function(value, element) {
        return this.optional(element) || /^[\u4e00-\u9fa5]+$/.test(value);
    }, "请输入汉字");

    // 匹配中文(包括汉字和字符)
    jQuery.validator.addMethod("isChineseChar", function(value, element) {
        return this.optional(element) || /^[\u0391-\uFFE5]+$/.test(value);
    }, "请输入中文(包括汉字和字符) ");

    // 判断是否为合法字符(a-zA-Z0-9-_)
    jQuery.validator.addMethod("isRightfulString", function(value, element) {
        return this.optional(element) || /^[A-Za-z0-9_-]+$/.test(value);
    }, "请输入英文、数字、下划线、中划线");

    // 判断是否包含中英文特殊字符，除英文"-_"字符外
    jQuery.validator.addMethod("isContainsSpecialChar", function(value, element) {
        var reg = RegExp(/[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/);
        return this.optional(element) || !reg.test(value);
    }, "含有中英文特殊字符");

    // url地址验证
    jQuery.validator.addMethod("url", function(value, element) {
        return this.optional(element) || /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w\-\./?%&=]*)?$/g.test(value);
    }, "请填写正确的url链接");

    // 判断角色编码是否重复
    jQuery.validator.addMethod("checkRepeat", function(value, element) {
        $(element).trigger("myCheck");
        return true == $(element).attr("isRepeat");
    }, "该角色已存在");

    // 判断两个input值为从小到大的范围，需要两个input为兄弟元素
    jQuery.validator.addMethod("checkRange", function(value, element) {
        return this.optional(element) || checkRange(value,element);
    }, "请输入正确的范围");

    // 判断邮箱地址
    jQuery.validator.addMethod("isEmail", function(value, element) {
        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        return this.optional(element) || reg.test(value);
    }, "请输入正确的邮箱地址");

    function checkRange(value,element){
        var target=$(element).siblings("input");
        if(target.length==1){
            if(value>=target.val()){
                return true;
            }
            else{
                return false;
            }
        }else{
            console.log("请将input置于兄弟元素中")
        }
    }
    //身份证号码的验证规则
    function isIdCardNo(num){
        //if (isNaN(num)) {alert("输入的不是数字！"); return false;}
        var len = num.length, re;
        if (len == 15)
            re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
        else if (len == 18)
            re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);
        else {
            //alert("输入的数字位数不对。");
            return false;
        }
        var a = num.match(re);
        if (a != null)
        {
            if (len==15)
            {
                var D = new Date("19"+a[3]+"/"+a[4]+"/"+a[5]);
                var B = D.getYear()==a[3]&&(D.getMonth()+1)==a[4]&&D.getDate()==a[5];
            }
            else
            {
                var D = new Date(a[3]+"/"+a[4]+"/"+a[5]);
                var B = D.getFullYear()==a[3]&&(D.getMonth()+1)==a[4]&&D.getDate()==a[5];
            }
            if (!B) {
                //alert("输入的身份证号 "+ a[0] +" 里出生日期不对。");
                return false;
            }
        }
        if(!re.test(num)){
            //alert("身份证最后一位只能是数字和字母。");
            return false;
        }
        return true;
    }
    //车牌号校验
    function isPlateNo(plateNo){
        var re = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
        if(re.test(plateNo)){
            return true;
        }
        return false;
    }

})();

//通用方法 为表单元素初始化 参数selector为form表单的选择器字符串，()
function formValidateInit(selector) {
    $.metadata.setType('attr', 'validate');
    $(selector).validate({
        errorElement: "em",
        errorPlacement: function (error, element) {
            error.addClass("help-block");
            error.css({
                "display":"block",
                "color":"#e47068",
                "margin":"0"
            });

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            }else if(element.siblings("input").length ===1){
                element.parent().append(error);
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("has-error").removeClass("has-success");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("has-success").removeClass("has-error");
        }
    });
}