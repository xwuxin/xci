/* $Id : utils.js 5052 2007-02-03 10:30:13Z weberliu $ */

var Browser = new Object();

Browser.isMozilla = (typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined') && (typeof HTMLDocument != 'undefined');
Browser.isIE = window.ActiveXObject ? true : false;
Browser.isFirefox = (navigator.userAgent.toLowerCase().indexOf("firefox") != - 1);
Browser.isSafari = (navigator.userAgent.toLowerCase().indexOf("safari") != - 1);
Browser.isOpera = (navigator.userAgent.toLowerCase().indexOf("opera") != - 1);

var Utils = new Object();

Utils.htmlEncode = function(text)
{
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

Utils.trim = function( text )
{
  if (typeof(text) == "string")
  {
    return text.replace(/^\s*|\s*$/g, "");
  }
  else
  {
    return text;
  }
}

/**
 * 2012-03-30 去掉指定字符串末尾的字符串，如果不指定endstr,会默认去掉字符串末尾的空格
 * @author wangyucheng
 * @email wangyucheng3@55tuan.com
 **/
Utils.rtrim = function(text,endstr){
	
	if (typeof(text) == "string")
	{
		var result = text.replace(/\s*$/g, "");
	    if(endstr != undefined){
	       var regex = new RegExp(endstr+'$','gi');
		   if(regex.test(result)){
			   result = result.replace(regex, "");
		   }
	    }
	    return result;
	}
	else
	{
	   return text;
	}
}

/**
 * 2012-03-30 去掉指定字符串头的字符串，如果不指定headerstr,会默认去掉字符串头的空格
 * @author wangyucheng
 * @email wangyucheng3@55tuan.com
 **/
Utils.ltrim = function(text,headerstr){
	
	if (typeof(text) == "string")
	{
		var result = text.replace(/^\s*/g, "");
		
	    if(headerstr != undefined){
	       var regex = new RegExp('^'+headerstr,'gi');
		   if(regex.test(result)){
			   result = result.replace(regex, "");
		   }
	    }
	    return result;
	}
	else
	{
	   return text;
	}
}


Utils.isEmpty = function( val )
{
  switch (typeof(val))
  {
    case 'string':
      return Utils.trim(val).length == 0 ? true : false;
      break;
    case 'number':
      return val == 0;
      break;
    case 'object':
      return val == null;
      break;
    case 'array':
      return val.length == 0;
      break;
    default:
      return true;
  }
}

Utils.isNumber = function(val)
{
  var reg = /^[\d|\.|,]+$/;
  return reg.test(val);
}

Utils.isInt = function(val)
{
  if (val == "")
  {
    return false;
  }
  var reg = /\D+/;
  return !reg.test(val);
}

Utils.isEmail = function( email )
{
  var reg1 = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;

  return reg1.test( email );
}

Utils.isTel = function ( tel )
{
  var reg = /^[\d|\-|\s|\_]+$/; //只允许使用数字-空格等

  return reg.test( tel );
}

Utils.fixEvent = function(e)
{
  var evt = (typeof e == "undefined") ? window.event : e;
  return evt;
}

Utils.srcElement = function(e)
{
  if (typeof e == "undefined") e = window.event;
  var src = document.all ? e.srcElement : e.target;

  return src;
}

Utils.isTime = function(val)
{
  var reg = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/;

  return reg.test(val);
}

Utils.x = function(e)
{ //当前鼠标X坐标
    return Browser.isIE?event.x + document.documentElement.scrollLeft - 2:e.pageX;
}

Utils.y = function(e)
{ //当前鼠标Y坐标
    return Browser.isIE?event.y + document.documentElement.scrollTop - 2:e.pageY;
}

Utils.request = function(url, item)
{
	var sValue=url.match(new RegExp("[\?\&]"+item+"=([^\&]*)(\&?)","i"));
	return sValue?sValue[1]:sValue;
}

Utils.limit_number = function(obj)
{
	
	obj.value=obj.value.replace(/\D/g,'');
	
}

Utils.$ = function(name)
{
    return document.getElementById(name);
}

