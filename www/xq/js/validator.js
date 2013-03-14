/* *
 *  表单验证类
 */

var Validator = function(name)
{
	  this.formName = name;
	  this.errMsg = new Array();
	
	  /* *
	  * 检查用户是否输入了内容
	  * @param :  controlId   表单元素的ID
	  * @param :  msg         错误提示信息
	  */
	  this.required = function(controlId, msg)
	  {
	    var obj = document.forms[this.formName].elements[controlId];
	    if (typeof(obj) == "undefined" || Utils.trim(obj.value) == "")
	    {
	      
	      this.addErrorMsg(msg);
	      return msg;
	    }
	    return '';
	  }
	  
	  /**检查是checkbox是否有选中的
	   * wangyucheng3@55tuan.com
	   * */
	  this.required_checked = function(controlId, msg)
	  {
	    //var obj = document.forms[this.formName].elements[controlId];
		  
	    var len = $('input[name="'+controlId+'"]:checked').length;
	    if(len==0){
	    	this.addErrorMsg(msg);
		    return msg;
	    	
	    }
	    
	    return '';
	  }
	  
	  /* *
	  * 检查用户输入的是否为合法的邮件地址
	  *
	  * @param :  controlId   表单元素的ID
	  * @param :  msg         错误提示信息
	  * @param :  required    是否必须
	  */
	  this.isEmail = function(controlId, msg, required)
	  {
	    var obj = document.forms[this.formName].elements[controlId];
	    obj.value = Utils.trim(obj.value);
	
	    if ( ! required && obj.value == '')
	    {
	      return '';
	    }
	
	    if ( ! Utils.isEmail(obj.value))
	    {
	      this.addErrorMsg(msg);
	      return msg;
	    }
	    return '';
	  }
	
	  /* *
	  * 检查前一个表单元素是否大于后一个表单元素
	  *
	  * @param : fstControl   表单元素的ID
	  * @param : sndControl	  表单元素的ID
	  * @param : msg			    错误提示信息
	  */
	  this.gt = function(fstControl, sndControl, msg)
	  {
	    var fstObj = document.forms[this.formName].elements[fstControl];
	    var sndObj = document.forms[this.formName].elements[sndControl];
	
	    if (fstObj != null && sndObj != null) {
	      if (Utils.isNumber(fstObj.value) && Utils.isNumber(sndObj.value)) {
	        var v1 = parseFloat(fstObj.value) + 0;
	        var v2 = parseFloat(sndObj.value) + 0;
	      } else {
	        var v1 = fstObj.value;
	        var v2 = sndObj.value;
	      }
	
	      if (v1 <= v2){ 
	    	  
	    	  this.addErrorMsg(msg);
	    	  return msg;
	      }
	      
	    }
	    
	    return '';
	  }
	
	  /* *
	  * 检查输入的内容是否是一个数字
	  *
	  * @param :  controlId   表单元素的ID
	  * @param :  msg         错误提示信息
	  * @param :  required    是否必须
	  */
	  this.isNumber = function(controlId, msg, required)
	  {
	    var obj = document.forms[this.formName].elements[controlId];
	    obj.value = Utils.trim(obj.value);
	
	    if (obj.value == '' && ! required)
	    {
	      return '';
	    }
	    else
	    {
	      if ( ! Utils.isNumber(obj.value))
	      {
	        this.addErrorMsg(msg);
	        return msg;
	      }
	    }
	    
	    return '';
	  }
	
	  /* *
	  * 检查输入的内容是否是一个整数
	  *
	  * @param :  controlId   表单元素的ID
	  * @param :  msg         错误提示信息
	  * @param :  required    是否必须
	  */
	  this.isInt = function(controlId, msg, required)
	  {
	
	    if (document.forms[this.formName].elements[controlId])
	    {
	      var obj = document.forms[this.formName].elements[controlId];
	    }
	    else
	    {
	      return '';    
	    }
	
	    obj.value = Utils.trim(obj.value);
	
	    if (obj.value == '' && ! required)
	    {
	      return '';
	    }
	    else
	    {
	      if ( ! Utils.isInt(obj.value)) {
	    	  this.addErrorMsg(msg);
	    	  return msg;
	      }
	    }
	    return '';
	  }
	
	  /* *
	  * 检查输入的内容是否是为空
	  *
	  * @param :  controlId   表单元素的ID
	  * @param :  msg         错误提示信息
	  * @param :  required    是否必须
	  */
	  this.isNullOption = function(controlId, msg)
	  {
	    var obj = document.forms[this.formName].elements[controlId];
	
	    obj.value = Utils.trim(obj.value);
	    
	    if (obj.value > '0' )
	    {
	      return '';
	    }
	    else
	    {
	      this.addErrorMsg(msg);
	      return msg;
	    }
	    
	    return '';
	  }
	
	  /* *
	  * 检查输入的内容是否是"2006-11-12 12:00:00"格式
	  *
	  * @param :  controlId   表单元素的ID
	  * @param :  msg         错误提示信息
	  * @param :  required    是否必须
	  */
	  this.isTime = function(controlId, msg, required)
	  {
	    var obj = document.forms[this.formName].elements[controlId];
	    obj.value = Utils.trim(obj.value);
	
	    if (obj.value == '' && ! required)
	    {
	      return '';
	    }
	    else
	    {
	      if ( ! Utils.isTime(obj.value)) {
	    	  this.addErrorMsg(msg);
	    	  return msg;
	      }
	    }
	    
	    return '';
	  }
	  
	  /* *
	  * 检查前一个表单元素是否小于后一个表单元素(日期判断)
	  *
	  * @param : controlIdStart   表单元素的ID
	  * @param : controlIdEnd	  表单元素的ID
	  * @param : msg              错误提示信息
	  */
	  this.islt = function(controlIdStart, controlIdEnd, msg)
	  {
	    var start = document.forms[this.formName].elements[controlIdStart];
	    var end = document.forms[this.formName].elements[controlIdEnd];
	    start.value = Utils.trim(start.value);
	    end.value = Utils.trim(end.value);
	
	    if(start.value <= end.value)
	    {
	      return '';
	    }
	    else
	    {
	      this.addErrorMsg(msg);
	      return msg;
	    }
	    
	    return '';
	  }
	
	  /* *
	  * 检查指定的checkbox是否选定
	  *
	  * @param :  controlId   表单元素的name
	  * @param :  msg         错误提示信息
	  */
	  this.requiredCheckbox = function(chk, msg)
	  {
	    var obj = document.forms[this.formName].elements[controlId];
	    var checked = false;
	
	    for (var i = 0; i < objects.length; i ++ )
	    {
	      if (objects[i].type.toLowerCase() != "checkbox") continue;
	      if (objects[i].checked)
	      {
	        checked = true;
	        break;
	      }
	    }
	
	    if ( ! checked){
	    	this.addErrorMsg(msg);
	    	return msg;
	    }
	    
	    return '';
	  }

	  this.passed = function()
	  {
	    if (this.errMsg.length > 0)
	    {
	
	      var msg = "";
	      for (i = 0; i < this.errMsg.length; i ++ )
	      {
	        msg += "- " + this.errMsg[i] + "\n";
	      }
	
	      alert(msg);
	      return false;
	    }
	    else
	    {
	      return true;
	    }
	  }
  
	  /**
	   * 判断len1是否大于len2
	   * @author wangyucheng
	   * 
	   */
	  this.len_let = function(len1,len2,msg){
		  
		  if(Utils.isNumber(len1) && Utils.isNumber(len2)){
			  if(len1 > len2)
			  {	  
				  this.addErrorMsg(msg);
				  return msg;
			  }else{
				  
				  return '';
				  
			  }
			  
		  }else{
			  
			  alert('参数有误');
			  return '';
		  }
	  }
	  
	  /**
	   * 判断两个值是否都为空
	   * @author wangyucheng
	   * 
	   */
	  this.twoallempty = function(var1,var2,msg){
		  
		  if(Utils.isEmpty(var1) && Utils.isEmpty(var2)){
				this.addErrorMsg(msg);
				return msg;
		  }else{
			  	return '';
		  }
		  
	  }
	  
          //判断data不能为空，为空则添加错误
          this.noempty = function(data,msg){
              
              if(Utils.isEmpty(data)){
                    this.addErrorMsg(msg);
                    return msg;
              }else{
                    return '';
             }
          }
          
	  /**
	  * 增加一个错误信息
	  *
	  * @param :  str
	  */
	  this.addErrorMsg = function(str)
	  {
	    this.errMsg.push(str);
	  }
}




