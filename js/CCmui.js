
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
//                  奔驰宝马贵者趣，公交自行程序员。  
//                  别人笑我忒疯癫，我笑自己命太贱；   

var requestURL = 'http://120.27.27.28:8899/';
//var requestURL = 'http://112.74.101.152:8899/';
//var requestURL = 'http://192.168.2.205:8081/';//周
//var requestURL = 'http://112.74.101.152:8899/';//yun



/**
 * 
 * 国际时间转换
 * */
 //调用//console.log(new Date('2016-03-04T15:09:35.67').Format("yyyy-MM-dd hh:mm:ss"));
Date.prototype.Format = function (fmt) {  
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
/*
 公用页面替换加载页面代码
 * 
 * *
 * */

	function loadPublicPage(forPageUrl,forPageTitle,publicPageID){
		//console.log(nowPage+'+'+forPageUrl);
		var template = null,subWebview=null,nowPage = null;  
		if(!forPageUrl){return;}
		if (subWebview == null) {
			//获取共用父窗体
			template = plus.webview.getWebviewById(publicPageID);
			//console.log(template.getURL);
		} 
		if(nowPage == forPageUrl){ 
			subWebview = template.children()[0];  
			//修改共用父模板的标题 
			mui.fire(template, 'updateHeader', {
				title: forPageTitle,
				showMenu: false
			}); 
			subWebview.show('auto');
			template.show('pop-in', 120,function(){},'capture');									
		}else{ 
			subWebview = template.children()[0]; 
			subWebview.loadURL(forPageUrl); 
			//修改共用父模板的标题
			mui.fire(template, 'updateHeader', {
				title: forPageTitle,
				showMenu: false
			});
			nowPage = forPageUrl; 
			template.show('pop-in', 120,function(){},'capture');	
			//console.log(template.getURL);
			//console.log(subWebview.getURL);
			//subWebview.show('auto');
		}	 
	}
 
/***
 * 判断添加删除class
 * 
 * 
 * ******/
function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}

function removeClass(obj, cls) { 
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}

//根据url参数获得值
function GetUrlParms() {//GetUrlParms()["zaiYuYue"]
    var args = new Object();
    var query = location.search.substring(1); //获取查询串   
    var pairs = query.split("&"); //在逗号处断开   
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('='); //查找name=value   
        if (pos == -1) continue; //如果没有找到就跳过   
        var argname = pairs[i].substring(0, pos); //提取name   
        var value = pairs[i].substring(pos + 1); //提取value   
        args[argname] = decodeURI(value); //存为属性   
    }
    return args;
}

//手机号验证
function CCphoneTest(str) { 
    return /^(13|15|18|17)\d{9}$/i.test(str);
}

/*
 
 * 当前网络
 * 
 * 
 * */
function GetNowNetwork() {
    var str = "";
//  str += "名称：" + plus.os.name + "\n";
//  str += "版本：" + plus.os.version + "\n";
//  str += "语言：" + plus.os.language + "\n";
//  str += "厂商：" + plus.os.vendor + "\n";
//  str += "网络类型：";
 
	    var types = {};
	    types[plus.networkinfo.CONNECTION_UNKNOW] = "未知";
	    types[plus.networkinfo.CONNECTION_NONE] = "未连接网络";
	    types[plus.networkinfo.CONNECTION_ETHERNET] = "有线网络";
	    types[plus.networkinfo.CONNECTION_WIFI] = "WiFi网络";
	    types[plus.networkinfo.CONNECTION_CELL2G] = "2G蜂窝网络";
	    types[plus.networkinfo.CONNECTION_CELL3G] = "3G蜂窝网络";
	    types[plus.networkinfo.CONNECTION_CELL4G] = "4G蜂窝网络";
	    str += types[plus.networkinfo.getCurrentType()]; 
			    
	    return str;
 
 

}
/*
 
 * 在一个元素的后面添加元素
 * */
	function insertAfter( newElement, targetElement )
	{ // newElement是要追加的元素 targetElement 是指定元素的位置
		var parent = targetElement.parentNode; // 找到指定元素的父节点
		if( parent.lastChild == targetElement ){ // 判断指定元素的是否是节点中的最后一个位置 如果是的话就直接使用appendChild方法
			parent.appendChild( newElement, targetElement );
		}else{
			parent.insertBefore( newElement, targetElement.nextSibling );
		};
	}; 
/**
 * 
 * 
 * 打开页面
 * **/
 
 

function OpenPage(url,extras){ 
		var id=null;
		if(url.lastIndexOf("/") > 0 ){
		    id = url.substring(parseInt(url.lastIndexOf("/"))+1,url.lastIndexOf(".") ); 
		}else{
			id=url.substring(0,url.lastIndexOf("."));  
		}  	 
		var styles={};
		// 在Android5以上设备，如果默认没有开启硬件加速，则强制设置开启
		if(!plus.webview.defauleHardwareAccelerated()&&parseInt(plus.os.version)>=5){
			styles.hardwareAccelerated=true;
		} 
		console.log('是否设备加速：'+plus.webview.defauleHardwareAccelerated());
		mui.openWindow({   
		    url:url,
		    id:id,
		    styles:{
	//	      top:newpage-top-position,//新页面顶部位置
	//	      bottom:newage-bottom-position,//新页面底部位置
	//	      width:newpage-width,//新页面宽度，默认为100%
	//	      height:newpage-height,//新页面高度，默认为100%
		   //   ......
		    },
		    extras:{extras:extras},
		    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		    show:{
		      autoShow:true,//页面loaded事件发生后自动显示，默认为true
		      aniShow:"pop-in",//页面显示动画，默认为”slide-in-right“；
		      duration:300//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
		    },
		    waiting:{
		      autoShow:false,//自动显示等待框，默认为true
	//	      title:'正在加载...',//等待对话框上显示的提示内容
	//	      options:{
	//	        width:waiting-dialog-widht,//等待框背景区域宽度，默认根据内容自动计算合适宽度
	//	        height:waiting-dialog-height,//等待框背景区域高度，默认根据内容自动计算合适高度
	//	        ......
	//	      }
		    }
		})
		
}
	/**
 * 
 * 
 * 打开预加载页面
 * **/	
	function openLoadPage(id,extras){
		var webview_style = {
			 
		};		
		var duration = 200;		  
		mui.openWindow({
				id: id,
				styles: webview_style,
				show: {
					autoShow:true,
					aniShow: 'pop-in',
					duration:200
				},
				waiting: {
					autoShow: false,
					duration:duration,
					title:'正在加载...'
				},
				extras:{
					extras:{extras:extras},  
				}
			}); 	 
	}
/***
 * 
 * 
 * 文件时间转换
 * */

	dateToStr=function(d){
		return (d.getFullYear()+"-"+ultZeroize(d.getMonth()+1)+"-"+ultZeroize(d.getDate())+" "+ultZeroize(d.getHours())+":"+ultZeroize(d.getMinutes())+":"+ultZeroize(d.getSeconds()));
	}	      	
	ultZeroize=function(v,l){
		var z="";
		l=l||2;
		v=String(v);
		for(var i=0;i<l-v.length;i++){
			z+="0";
		}
		return z+v;
	};   
	

/***
 * 
 * 随机字符串
 * 
 * */
    function randomString(len) {
    　　len = len || 32;
            　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            　　var maxPos = $chars.length;
            　　var pwd = '';
            　　for (i = 0; i < len; i++) {
            　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            　　}
    　　  return pwd;
    }    
    /****
     * 
     *用js得到元素的css样式，兼容外部、嵌入、内嵌
     ***/
    var $$=function(id){return document.getElementById(id) };
 
	/*
	* @string id
	* @string styleName 样式名
	*/
	function getEyeJsStyle(id,styleName){
		if($$(id).currentStyle){//ie
			return $$(id).currentStyle[styleName];
		}else{ //ff
			var $$arr=$$(id).ownerDocument.defaultView.getComputedStyle($$(id), null);
			return $$arr[styleName];
		}
	} 
//得到现在时间格式CCnowDateTime()2015-02-04 12:03:12

function CCnowDateTime() {

    var date = new Date();
    if ((date.getMonth() + 1) < 10) {
        var getMonth = ('0' + (date.getMonth() + 1))

    } else {
        var getMonth = (date.getMonth() + 1);

    }
    if (date.getDate() < 10) {
        var getDate = ('0' + date.getDate())
    } else {
        var getDate = date.getDate();
    }
    if (date.getHours() < 10) {
        var getHours = ('0' + date.getHours())
    } else {
        var getHours = date.getHours();
    }
    if (date.getSeconds() < 10) {
        var getSeconds = ('0' + date.getSeconds())
    } else {
        var getSeconds = date.getSeconds();
    }
    if (date.getMinutes() < 10) {
        var getMinutes = ('0' + date.getMinutes())
    } else {
        var getMinutes = date.getMinutes();
    }

    return date.getFullYear() + '-' + getMonth + '-' + getDate + ' ' + getHours + ':' + getMinutes + ':' + getSeconds;

}
//时间格式
function changeData(dataStr){//'2016-04-12T16:11:22.88'
	var data = new Date(dataStr);
	//console.log(data.getUTCMonth())
	var newData = data.getUTCFullYear()+'-'+(data.getUTCMonth()+1)+'-'+data.getUTCDate()+' '+data.getUTCHours()+':'+data.getUTCMinutes()+':'+data.getUTCSeconds();
	return newData;

}