/**
 * 模态窗口模拟
 * sunxinjian@55.com
 */
kenjs={};
(function(_obj){

	kenjs.alert = {};
	(function(_obj){		  
		//遮罩透明度	  
		_obj.mark_opacity = 0.3; 
		//遮罩背景颜
		_obj.mark_color = "#000000"; 
		//浮动窗口背景色
		_obj.bgcolor = '#ffffff';
		//标题栏背景色
		_obj.stat_bgcolor = '#e0e0e0';
		//标题栏文字颜色
		_obj.stat_color = '#000000';
		//代码区宽度
		_obj.width = null;
		//代码区高度
		_obj.height = null;
		//todo:默认动作
		_obj.func = function(){};
		var alertWidth = null;//实际的浮动div窗口宽度
		var alertHeight = null;//实际的浮动div窗口高度
		var docObj = (document.compatMode!="CSS1Compat")?document.body:document.documentElement;
		var body = document.getElementsByTagName("body")[0];
		var markDiv = null;
		var alertDiv = null;
		var _cx = 0;
		var _cy = 0;
		//可视窗口高宽度
		_obj.winWidth=function(){return docObj.clientWidth;};
		//可视窗口高度度
		_obj.winHeight=function(){return docObj.clientHeight;	};
		//文档总高宽度(不含隐藏部分)
		_obj.docWidth=function(){return Math.max(docObj.scrollWidth,docObj.clientWidth);};
		//文档总高度(包被隐藏部分)
		_obj.docHeight=function(){return Math.max(docObj.scrollHeight,docObj.clientHeight);};
		//创建遮罩层
		_obj.createMarkDiv = function()
		{
			var w = _obj.docWidth();
			var h = _obj.docHeight();		
			markDiv = document.createElement("div");
	 		markDiv.setAttribute("id","kenjs_markDiv");
			var cssStr = 'z-index:999;width:'+w+'px;height:'+h+'px;position:absolute;top:0px;left:0px;background:'+_obj.mark_color+';filter:Alpha(opacity='+(_obj.mark_opacity*100)+');-moz-opacity:'+_obj.mark_opacity+';opacity:'+_obj.mark_opacity+';';
			markDiv.setAttribute("style",cssStr);
			markDiv.style.cssText = cssStr;
			body.appendChild(markDiv);
		}
		//改变遮罩层分宽高
		_obj.resizeMarkDiv = function()
		{
			var w = _obj.docWidth();
			var h = _obj.docHeight();
			markDiv.style.width = w+'px';
			markDiv.style.height = h+'px';
		}
		//移除遮罩层
		_obj.removeMarkDiv = function()
		{	
			body.removeChild(markDiv);
			markDiv = null;
		}
		//创建浮动窗口
		_obj.createAlert = function(title,html)
		{
			alertWidth		= _obj.width+10*2+2*1;//内容宽度+2个padding	
			alertHeight		= _obj.height+25+10*2+2*1;//内容宽度+2个padding	
			_obj.createMarkDiv();
			alertDiv		= document.createElement("div");
			alertDiv.setAttribute("id","alertDiv");
			var left		= _obj.winWidth()/2-alertWidth/2;
			var top			= _obj.winHeight()/2-alertHeight/2;
			
			var alertDiv_css			= "z-index:1000;width:"+(alertWidth-2)+"px;height:"+(alertHeight-2)+"px;position:absolute;top:"+top+"px;left:"+left+"px;background:"+_obj.bgcolor+";border-width:1px;border-style:solid;border-color:#eeeeee #666666 #666666 #eeeeee";
			var alertDiv_content_css	= "width:"+_obj.width+"px;height:"+_obj.height+"px;margin:10px;overflow:auto;";	
	
			alertDiv.setAttribute("style",alertDiv_css);
			alertDiv.style.cssText = alertDiv_css;
			//alert window title start
			alertDiv_title = document.createElement("div");
			var alertDiv_title_css = "width:auto;height:25px;padding:0 10px;line-height:25px;background:url(/js/kenjs/images/alert_title_bg.gif) repeat-x "+_obj.stat_bgcolor+";cursor:move;";			
			alertDiv_title.setAttribute("style",alertDiv_title_css);
			alertDiv_title.style.cssText = alertDiv_title_css;
			alertDiv_title.innerHTML=	'\
				<div style="width:'+(_obj.width-50)+'px;height:25px;overflow:hidden;font-size:12px;line-height:25px;font-weight:bold;float:left;color:'+_obj.stat_color+'">'+title+'</div>\
				<div style="width:30px;float:right;cursor:pointer;" onclick="kenjs.alert.close()">关闭</div>';
				alertDiv_title.onmousedown =	_obj._beginDrag;	
				alertDiv_title.onmouseup = _obj._stopDrag;	
				alertDiv.appendChild(alertDiv_title);
				//alert window title end
				
				//alert window content start
				alertDiv_content = document.createElement("div");
				alertDiv_content.setAttribute("style",alertDiv_content_css);
				alertDiv_content.style.cssText = alertDiv_content_css;
				alertDiv_content.innerHTML=	html;
				alertDiv.appendChild(alertDiv_content);
				//alert window content end
		body.appendChild(alertDiv);
	}
	_obj.resizeAlert = function()
	{
		var left	= _obj.winWidth()/2-alertWidth/2;
		var top		= _obj.winHeight()/2-alertHeight/2;
		alertDiv.style.left = left+"px";
		alertDiv.style.top	= top+"px";
	}
	_obj.removeAlert = function()
	{
		_obj.removeMarkDiv()	
		body.removeChild(alertDiv);
		alertDiv = null;
		_obj.func();
	}
	
	
	_obj._beginDrag = function(ev)
	{
		var mousePos = mouseCoords(ev);	
		_cx=alertDiv.offsetLeft-mousePos.x;
		_cy=alertDiv.offsetTop-mousePos.y;
		document.onmousemove=mouseMove;	
	}
	
	_obj._stopDrag = function(ev)
	{
		document.onmousemove = noopMouse;
		document.onmousedown = noopMouse;
		document.onmouseup = noopMouse;
		_cx=0;
		_cy=0;
	}	
	
	//获取鼠标位置
	_obj.mouseCoords = function(ev)
	{
		ev = ev || window.event;
		if(ev.pageX || ev.pageY){
			return {x:ev.pageX, y:ev.pageY};
		}
	 	return {
			x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
			y:ev.clientY + document.body.scrollTop - document.body.clientTop
		}
	}
	//窗口位置
	_obj.mouseMove = function(ev)
	{
		ev = ev || window.event;
		var mousePos = _obj.mouseCoords(ev);
	    alertDiv.style.left = (mousePos.x+_cx)+'px';
	    alertDiv.style.top = (mousePos.y+_cy)+'px';
	}	
	_obj._beginDrag = function(ev)
	{
		var mousePos = _obj.mouseCoords(ev);	
		_cx	= alertDiv.offsetLeft-mousePos.x;
		_cy	= alertDiv.offsetTop-mousePos.y;
		document.onmousemove=_obj.mouseMove;	
	}
	
	_obj._stopDrag = function(ev)
	{
		document.onmousemove	= _obj.noopMouse;
		document.onmousedown	= _obj.noopMouse;
		document.onmouseup		= _obj.noopMouse;
	}
	_obj.noopMouse = function(ev){return false;}
	_obj.open = function(title,html){
		_obj.createAlert(title,html);
	}
	_obj.close = function(){		
		_obj.removeAlert();
		//暂时解决关闭窗口后输入框无法使用
		window.location.reload(true);
	}

})(kenjs.alert)
})(kenjs)
window.onresize = function(){
	try{
		kenjs.alert.resizeMarkDiv();
		kenjs.alert.resizeAlert();
	}catch(e){}
}
