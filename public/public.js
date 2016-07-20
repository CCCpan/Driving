//                            _ooOoo_  
//                           o8888888o  
//                           88" . "88  
//                           (| -_- |)  
//                            O\ = /O  
//                        ____/`---'\____  
//                      .   ' \\| |// `.  
//                       / \\||| : |||// \  
//                     / _||||| -:- |||||- \  
//                       | | \\\ - /// | |  
//                     | \_| ''\---/'' | |  
//                      \ .-\__ `-` ___/-. /  
//                   ___`. .' /--.--\ `. . __  
//                ."" '< `.___\_<|>_/___.' >'"".  
//               | | : `- \`.;`\ _ /`;.`/ - ` : | |  
//                 \ \ `-. \_ __\ /__ _/ .-` / /  
//         ======`-.____`-.___\_____/___.-`____.-'======  
//                            `=---='  
//  
//         .............................................  
//                  佛祖保佑             永无BUG 
//          佛曰:  
//                  写字楼里写字间，写字间里程序员；  
//                  程序人员写程序，又拿程序换酒钱。  
//                  酒醒只在网上坐，酒醉还来网下眠；  
//                  酒醉酒醒日复日，网上网下年复年。  
//                  但愿老死电脑间，不愿鞠躬老板前；  
//                  奔驰宝马贵者趣，公交自行程序员。  
//                  别人笑我忒疯癫，我笑自己命太贱；  
//                  不见满街漂亮妹，哪个归得程序员？

//提示框CCshowMsg(msg)
//一般按钮变化 CCbtnChange(state,obj,color,value)
// 动态设置选中某一个setSelectChecked(selectId, checkValue)
//计算俩时间是否差一天
//2015-12-15 09:52:00格式不计算秒dateChaOneDay(star,end)
//加载loding显示CCshowLoading(msgContent)
//加载loding关闭CChideLoading()
//手机号验证CCphoneTest(str) 
//打开新页面CCopenPage(url)
//数字验证CCcheckNum(nubmer)
//得到现在时间格式CCnowDateTime()
//比较俩个日期大小格式2015-12-15    2015-12-05 前者大于等于后者返回true CCcompareDate(star, end)
//判断是什么平台CCisModels() 
//CCLoadMore加载更多obj的父元素，fn需要执行的方法，msg加载完成后显示的文字
//js创建CSS样式
//当class=easyui-validatebox获得表单数据，自动组成json格式
//没有数据时显示一个无数据的图片
//根据url参数获得值

var requestURL = 'http://120.76.26.35/'; //云接口 
function muiOpenPage(url) {
	if(!localStorage.userInfo){
		mui.toast('请先登陆!');
		window.location.href='../login/login.html'
		return;
	}
	mui.openWindow({
		url: url
	})
}
var load = '';
$(function() { //配置load全局变量
		load = new Loading();
		load.init();
		//	load.start();   
		//	setTimeout(function() {
		//		load.stop();
		//	}, 30000)	
	})
	//根据url参数获得值
function GetUrlParms() { //GetUrlParms()["zaiYuYue"]
	var args = new Object();
	var query = location.search.substring(1); //获取查询串   
	var pairs = query.split("&"); //在逗号处断开   
	for(var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf('='); //查找name=value   
		if(pos == -1) continue; //如果没有找到就跳过   
		var argname = pairs[i].substring(0, pos); //提取name   
		var value = pairs[i].substring(pos + 1); //提取value   
		args[argname] = decodeURI(value); //存为属性   
	}
	return args;
}

//ajax获取数据并错误处理

function CCajax(url, successFn, errorFn) {
	var url = url;
	$.ajax({
		url: url,
		type: "POST",
		success: function(rp) {
			if(successFn)
				successFn(eval("(" + rp + ")"));
		},
		error: function() {
			if(errorFn)
			errorFn();
		}
	}); 
}

//没有数据时显示一个无数据的图片
function CCnoDateShow(hTop) {
	if(hTop == 'hide') {
		$('#empt_img').remove();
		return;
	}
	var headerTop = 0;
	var height = '';
	var top = '';
	if(hTop) {
		headerTop = hTop;
	} else {
		headerTop = 51;

	}
	if(CCisModels() == '苹果App') {
		height = ($(window).height() - (headerTop + 20)) + 'px';
		top = (headerTop + 20) + 'px';
		//   $('#empt_img').css('height', ($(window).height() - 71) + 'px').css('top', '71px');
	} else {
		height = ($(window).height() - headerTop) + 'px';
		top = headerTop + 'px';
		//  $('#empt_img').css('height', ($(window).height() - 51) + 'px').css('top', '51px');
	}

	var html = '';
	html = ' <div id="empt_img" style="position:absolute;width:100%;text-align:center;background:#F9F9F9;z-index:10;height:' + height + ';top:' + top + '">' +
		'<div style="width:100%;text-align:center;margin-top:200px;"><img style="height:100px;width:100px" src="/Mobile/Accton/img/empt_img.png"/></div>' +
		'<div style="width:100%;text-align:center;font-size:18px;color:#E4E4E9">没&nbsp;有&nbsp;数&nbsp;据</div> ' +
		'</div>';
	$('body').append(html);

}

//加载更多obj的父元素，fn需要执行的方法，msg加载完成后显示的文字

function CCLoadMore(obj, fn, msg) {

	obj.find('#ClickLoadMore').detach();
	obj.find('.emplet').detach();
	if(obj.children().length < 5) {
		return;
	}

	var Msgges = '';
	if(msg) {
		Msgges = msg;
	} else {
		Msgges = '点击加载更多';
	}
	var html = '';
	html += ' <div id="ClickLoadMore" style="border:1px solid #EEEEEE;width:80%;height:35px;background:#F8F9FB;color:#525355;text-align:center;margin:10px auto;line-height:35px;margin-bottom:5px;z-index:2000;">';
	html += '<div class="ClickLoadMorebefor" style="display:block;">' + Msgges + '</div><div class="after" style="width:100%;height:100%;">';
	html += ' <div class="ClickLoadMoreafter_left" style="display:none;width:50%;height:35px;line-height:35px;text-align:right;float:left;padding-top:6px;"><img style="height:25px;width:25px;" src="/Mobile/image/goodLoading.gif"/>&nbsp;&nbsp;</div>';
	html += '<div class="ClickLoadMoreafter_right" style="display:none;width:50%;height:35px;line-height:35px;text-align:left;float:left;">加载中...</div>';
	html += '</div></div>';
	//html += '<div class="emplet" style="height:160px;clear:both"> &nbsp;</div>'
	obj.append(html);

	html = '';
	var thiss = obj.find('#ClickLoadMore');
	thiss.parent().css('padding-bottom', '5px');

	thiss.click(function() {

		thiss.find('.ClickLoadMorebefor').hide();
		thiss.find('.ClickLoadMoreafter_left,.ClickLoadMoreafter_right').show();
		fn(++page);

	})
}

//js创建CSS样式
function CCaddCSS(cssText) {
	var style = document.createElement('style'), //创建一个style元素
		head = document.head || document.getElementsByTagName('head')[0]; //获取head元素
	style.type = 'text/css'; //这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
	if(style.styleSheet) { //IE
		var func = function() {
				try { //防止IE中stylesheet数量超过限制而发生错误
					style.styleSheet.cssText = cssText;
				} catch(e) {

				}
			}
			//如果当前styleSheet还不能用，则放到异步中则行
		if(style.styleSheet.disabled) {
			setTimeout(func, 10);
		} else {
			func();
		}
	} else { //w3c
		//w3c浏览器中只要创建文本节点插入到style元素中就行了
		var textNode = document.createTextNode(cssText);
		style.appendChild(textNode);
	}
	head.appendChild(style); //把创建的style元素插入到head中    
}

//当class=easyui-validatebox获得表单数据
//<div  style="display:none;" id="div_imageInfo">
//  <input type="hidden" id="TableName" value="HR_YG_YuanGongDangAn" myclass="easyui-validatebox" />
//  <input type="hidden" id="AnnexID" myclass="easyui-validatebox" />
//  <input type="hidden" id="KeyID" myclass="easyui-validatebox" />
//  <input type="hidden" id="IndexID" value="1" myclass="easyui-validatebox" />
//  <input type="hidden" id="AnnexType" value="美容师头像"  myclass="easyui-validatebox" />
//  <input type="hidden" id="AnnexFileName"  myclass="easyui-validatebox" />
//  <input type="hidden" id="AnnexFileType"  myclass="easyui-validatebox" />
//  <input type="hidden" id="AnnexFileSize"  myclass="easyui-validatebox" />
//  <input type="hidden" id="AnnexName"  myclass="easyui-validatebox" />
//</div>
function CheckValid(obj) {
	var item_value = '[{"';
	var myclass = '';
	var pk_id = '';
	$(obj).find("input,select,textarea,div").each(function() {
		pk_id = $(this).attr('id');
		myclass = $(this).attr("myclass");
		if($(this).attr("disabled") == true) {
			$('input').attr("disabled", false);
		}
		if(myclass == "easyui-validatebox") {
			if($(this).val() != undefined && $(this).val() != "") {
				if($(this).attr("myid") != undefined && $(this).attr("myid") != "")
					pk_id = $(this).attr("myid");
				item_value += pk_id + "\":\"" + $(this).val() + "\",\"";
			}
		}
	});
	item_value = item_value.substring(0, item_value.length - 2) + "}]";
	return item_value;
}

//判断是什么平台CCisModels() 
function CCisModels() {
	var ua = navigator.userAgent.toLowerCase();

	if(/micromessenger/.test(ua)) { // 微信浏览器：

		if(/android/i.test(ua)) { //若安卓，换个地方打开；
			return '微信安卓';

		} else {

			return '微信苹果';
		}
	} else {

		if(/android/i.test(ua)) { //若安卓，换个地方打开；
			return '安卓App';

		} else {
			return '苹果App';
		}
		//else {

		//    return '苹果App';
		//}

	}
}
//提示框
function CCshowMsg(msg) {
	var strHtml = '<div id="loadMsg" class="loadMsg" style="width:85%;height:45px;opacity:0.8;background:#999999;text-align:center;line-height:45px;position:fixed;left:10%;top:3px;font-weight:bold;border-radius: 5px;color: #FFFFFF;z-index:2000;font-size:18px;">' + msg + ' </div>'
	$('body').after(strHtml)
	$('#loadMsg').animate({
		opacity: '0.8'
	})
	$('#loadMsg').show();
	setTimeout(function() {
		$('#loadMsg').animate({
			opacity: '0'
		});
	}, 2000)
	setTimeout(function() {
		$("#loadMsg").remove();
	}, 2500)
}

//一般按钮变化
function CCbtnChange(state, obj, color, value) {
	if(state != 'end') {
		if(value == '') {
			obj.css('pointer-events', 'none').css('background', color);
		} else {
			obj.css('pointer-events', 'none').css('background', color).attr('value', value);
		}
	} else {
		if(value == '') {
			obj.css('pointer-events', 'auto').css('background', color);
		} else {
			obj.css('pointer-events', 'auto').css('background', color).attr('value', value);
		}
	}
}
// 动态设置选中某一个Select
function setSelectChecked(selectId, checkValue) {
	var select = document.getElementById(selectId);
	for(var i = 0; i < select.options.length; i++) {
		if(select.options[i].innerHTML == checkValue) {
			select.options[i].selected = true;
			break;
		}
	}
}
//得到现在时间
function nowDate() {
	var date = new Date();
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

}
//得到现在时间格式CCnowDateTime()2015-02-04 12:03:12

function CCnowDateTime() {

	var date = new Date();
	if((date.getMonth() + 1) < 10) {
		var getMonth = ('0' + (date.getMonth() + 1))

	} else {
		var getMonth = (date.getMonth() + 1);

	}
	if(date.getDate() < 10) {
		var getDate = ('0' + date.getDate())
	} else {
		var getDate = date.getDate();
	}
	if(date.getHours() < 10) {
		var getHours = ('0' + date.getHours())
	} else {
		var getHours = date.getHours();
	}
	if(date.getSeconds() < 10) {
		var getSeconds = ('0' + date.getSeconds())
	} else {
		var getSeconds = date.getSeconds();
	}
	if(date.getMinutes() < 10) {
		var getMinutes = ('0' + date.getMinutes())
	} else {
		var getMinutes = date.getMinutes();
	}

	return date.getFullYear() + '-' + getMonth + '-' + getDate + ' ' + getHours + ':' + getMinutes + ':' + getSeconds;

}

//计算俩时间是否差一天
//2015-12-15 09:52:00格式不计算秒
function dateChaOneDay(star, end) {

	var starDate = star.split(' ')[0] //日期比较 2015-12-15
	var starTime = star.split(' ')[1] //  时间比较09:52:00 
	var endDate = end.split(' ')[0]
	var endTime = end.split(' ')[1];

	if(Math.abs(starDate.split('-')[0] - endDate.split('-')[0]) >= 1) {
		return false;
	}
	if(Math.abs(starDate.split('-')[1] - endDate.split('-')[1]) >= 1) {
		return false;
	}
	if(Math.abs(starDate.split('-')[2] - endDate.split('-')[2]) >= 2) {
		return false;
	}

	//   alert(parseInt(starTime.split(':')[2]) +'+'+ parseInt(endTime.split(':')[2]))
	if(Math.abs(starDate.split('-')[2] - endDate.split('-')[2]) == 1) { //天
		if(parseInt(starTime.split(':')[0]) < parseInt(endTime.split(':')[0])) {
			return false;
		} else if(parseInt(starTime.split(':')[0]) > parseInt(endTime.split(':')[0])) {
			return true;

		} else if(parseInt(starTime.split(':')[0]) == parseInt(endTime.split(':')[0])) {

			//    alert(parseInt(starTime.split(':')[1]) < parseInt(endTime.split(':')[1]))
			if(parseInt(starTime.split(':')[1]) < parseInt(endTime.split(':')[1])) { //分

				return false;
			} else if(parseInt(starTime.split(':')[1]) > parseInt(endTime.split(':')[1])) {

				return true;

			} else if(parseInt(starTime.split(':')[1]) == parseInt(endTime.split(':')[1])) {

				if(parseInt(starTime.split(':')[2]) < parseInt(endTime.split(':')[2])) { //秒
					return false;
				} else if(parseInt(starTime.split(':')[2]) > parseInt(endTime.split(':')[2])) {

					return true;
				} else {

					return true;
				}

			}

		}

		//   alert(parseInt(starTime.split(':')[0]) == parseInt(endTime.split(':')[0]))

	} else if(Math.abs(starDate.split('-')[2] - endDate.split('-')[2]) == 0) {
		return true;
	}

}

//比较俩个日期大小格式2015-12-15    2015-12-05 前者大于等于后者返回true CCcompareDate(star, end)
function CCcompareDate(star, end) {
	// alert(star + '+' + end)
	if(star.split('-')[0] > end.split('-')[0]) {
		return true;
	} else if(star.split('-')[0] == end.split('-')[0]) {
		if(star.split('-')[1] > end.split('-')[1]) {
			return true;
		} else if(star.split('-')[1] == end.split('-')[1]) {
			if(star.split('-')[2] > end.split('-')[2]) {
				return true;
			} else if(star.split('-')[2] == end.split('-')[2]) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}

	} else {
		return false;
	}

}
//加载loding显示CCshowLoading(msgContent)
function CCshowLoading(msgContent, all) {
	//   var top = '';
	// alert(CCisModels())
	//if (all == 'all') {
	//    top = '-100%';
	//} else if (CCisModels() == '苹果App') {
	//    top = '71px';
	//} else {
	//    top = '51px'; 
	//}top:'+top+'
	var html = '';
	html += '<div id="CCload"> <div class="simple_tips" id="loading_simple_div" style="display:none; position: fixed;"> <div class="simple_tips_content text-center"><div id="loading" class="loading ma"> <div>  <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>';
	html += '</div>  </div> <div class="simple_tips_text mt10" > <div class="spinner" style="margin-bottom: 10px;"> <div class="spinner-container container1"> <div class="circle1"></div> <div class="circle2"></div> <div class="circle3"></div> <div class="circle4"></div>';
	html += '</div> <div class="spinner-container container2"> <div class="circle1"></div> <div class="circle2"></div>  <div class="circle3"></div>';
	html += '<div class="circle4"></div>  </div> <div class="spinner-container container3">  <div class="circle1"></div>  <div class="circle2"></div>     <div class="circle3"></div>  <div class="circle4"></div></div>  </div>  <p class="loading_text"><span id="loading_text">加载中...</span></p>  </div> </div>  </div>  <div class="overlay" id="overlayImage" style="display: none;"></div> </div>';
	$('body').append(html);
	//传入的信息为空
	if(msgContent == undefined || msgContent == "") {
		$("#loading_text").html("加载中...");
	} else {
		$("#loading_text").html(msgContent);
	}

	$(".overlay").show();
	win_height = document.getElementById("overlayImage").offsetHeight / 5;
	win_width = document.getElementById("overlayImage").offsetWidth;
	//$("#loading_simple_div").show();
	document.getElementById("loading_simple_div").style.display = "block";
	//让加载中剧中对齐
	var tips_width = document.getElementById("loading_simple_div").offsetWidth,
		tips_height = document.getElementById("loading_simple_div").offsetHeight,
		top = (win_height - tips_height) / 2,
		left = (win_width - tips_width) / 2;
	$("#loading_simple_div").css({
		'top': top + "px",
		'left': left + "px"
	});
} //加载loding关闭
function CChideLoading() {
	$(".overlay").hide();
	$("#loading_simple_div").hide();
	$("#loading_simple_div").remove();
	$(".overlay").remove();
	// document.getElementById("loading_simple_div").style.display = "none";
}

//手机号验证
function CCphoneTest(str) {

	return /^(13|15|18|17|13)\d{9}$/i.test(str);
}
//打开新页面
function CCopenPage(url) {
	window.location = url;
}
//数字验证
function CCcheckNum(nubmer) {

	return /^[0-9]+.?[0-9]*$/.test(nubmer);
}

//弹出层
function showHideChooseItem(isShow) {
	if(isShow) {
		$("#modal_chooseItem").show();
		$(".overlay_modal").show();
	} else {
		$("#modal_chooseItem").hide();
		$(".overlay_modal").hide();
	}
}

function loadChooseItemModalStyle(w, h, top, left) {
	$("#modal_chooseItem *").removeAttr("disabled");

	///   alert($("#overlay_modal").height());
	var win_height = $("#overlay_modal").height() / 5;
	var win_width = $("#overlay_modal").width();

	$("#modal_chooseItem").css({
		'width': win_width * w + "px",
		'height': win_height * h + "px",
	});

	var tips_width = $("#modal_chooseItem").width(),
		tips_height = $("#modal_chooseItem").height(),
		$top = (win_height - tips_height) / top,
		$left = (win_width - tips_width) / left;
	$("#modal_chooseItem").css({
		'top': $top + "px",
		//'left': $left + "px",
	});
}

/*loading
 * Created with Sublime Text 3.
 * license: http://www.lovewebgames.com/jsmodule/index.html
 * github: https://github.com/tianxiangbing/format-number
 * User: 田想兵
 * Date: 2015-08-05
 * Time: 11:27:55    
 * Contact: 55342775@qq.com
 */
;
(function(root, factory) {
	//amd
	if(typeof define === 'function' && define.amd) {
		define(['$'], factory);
	} else if(typeof exports === 'object') { //umd
		module.exports = factory();
	} else {
		root.Loading = factory(window.Zepto || window.jQuery || $);
	}
})(this, function($) {
	var Loading = function() {};
	Loading.prototype = {
		loadingTpl: '<div class="ui-loading"><div class="ui-loading-mask"></div><i></i></div>',
		stop: function() {
			var content = $(this.target);
			this.loading.remove();
		},
		start: function() {
			var _this = this;
			var target = _this.target;
			var content = $(target);
			var loading = this.loading;
			if(!loading) {
				loading = $(_this.loadingTpl);
				$('body').append(loading);
			}
			this.loading = loading;
			var ch = $(content).outerHeight();
			var cw = $(content).outerWidth();
			if($(target)[0].tagName == "HTML") {
				ch = Math.max($(target).height(), $(window).height());
				cw = Math.max($(target).width(), $(window).width());
			}
			//console.log(cw,ch)
			loading.height(ch).width(cw);
			loading.find('div').height(ch).width(cw);
			if(ch < 100) {
				loading.find('i').height(ch).width(ch);
			}
			var offset = $(content).offset();
			loading.css({
				top: offset.top,
				left: offset.left
			});
			var icon = loading.find('i');
			var h = ch,
				w = cw,
				top = 0,
				left = 0;
			if($(target)[0].tagName == "HTML") {
				h = $(window).height();
				w = $(window).width();
				top = (h - icon.height()) / 2 + $(window).scrollTop();
				left = (w - icon.width()) / 2 + $(window).scrollLeft();
			} else {
				top = (h - icon.height()) / 2;
				left = (w - icon.width()) / 2;
			}
			icon.css({
				top: top,
				left: left
			})
		},
		init: function(settings) {
			settings = settings || {};
			this.loadingTpl = settings.loadingTpl || this.loadingTpl;
			this.target = settings.target || 'html';
			this.bindEvent();
		},
		bindEvent: function() {
			var _this = this;
			try {
				$(this.target).on('stop', function() {
					_this.stop();
				});
			} catch(e) {
				//TODO handle the exception
			}
		}
	}
	return Loading;
});