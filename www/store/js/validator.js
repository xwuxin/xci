/* *
 *  ����֤��
 */

var Validator = function(name)
{
	  this.formName = name;
	  this.errMsg = new Array();
	
	  /* *
	  * ����û��Ƿ�����������
	  * @param :  controlId   ��Ԫ�ص�ID
	  * @param :  msg         ������ʾ��Ϣ
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
	  
	  /**�����checkbox�Ƿ���ѡ�е�
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
	  * ����û�������Ƿ�Ϊ�Ϸ����ʼ���ַ
	  *
	  * @param :  controlId   ��Ԫ�ص�ID
	  * @param :  msg         ������ʾ��Ϣ
	  * @param :  required    �Ƿ����
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
	  * ���ǰһ����Ԫ���Ƿ���ں�һ����Ԫ��
	  *
	  * @param : fstControl   ��Ԫ�ص�ID
	  * @param : sndControl	  ��Ԫ�ص�ID
	  * @param : msg			    ������ʾ��Ϣ
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
	  * �������������Ƿ���һ������
	  *
	  * @param :  controlId   ��Ԫ�ص�ID
	  * @param :  msg         ������ʾ��Ϣ
	  * @param :  required    �Ƿ����
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
	  * �������������Ƿ���һ������
	  *
	  * @param :  controlId   ��Ԫ�ص�ID
	  * @param :  msg         ������ʾ��Ϣ
	  * @param :  required    �Ƿ����
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
	  * �������������Ƿ���Ϊ��
	  *
	  * @param :  controlId   ��Ԫ�ص�ID
	  * @param :  msg         ������ʾ��Ϣ
	  * @param :  required    �Ƿ����
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
	  * �������������Ƿ���"2006-11-12 12:00:00"��ʽ
	  *
	  * @param :  controlId   ��Ԫ�ص�ID
	  * @param :  msg         ������ʾ��Ϣ
	  * @param :  required    �Ƿ����
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
	  * ���ǰһ����Ԫ���Ƿ�С�ں�һ����Ԫ��(�����ж�)
	  *
	  * @param : controlIdStart   ��Ԫ�ص�ID
	  * @param : controlIdEnd	  ��Ԫ�ص�ID
	  * @param : msg              ������ʾ��Ϣ
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
	  * ���ָ����checkbox�Ƿ�ѡ��
	  *
	  * @param :  controlId   ��Ԫ�ص�name
	  * @param :  msg         ������ʾ��Ϣ
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
	   * �ж�len1�Ƿ����len2
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
			  
			  alert('��������');
			  return '';
		  }
	  }
	  
	  /**
	   * �ж�����ֵ�Ƿ�Ϊ��
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
	  
          //�ж�data����Ϊ�գ�Ϊ������Ӵ���
          this.noempty = function(data,msg){
              
              if(Utils.isEmpty(data)){
                    this.addErrorMsg(msg);
                    return msg;
              }else{
                    return '';
             }
          }
          
	  /**
	  * ����һ��������Ϣ
	  *
	  * @param :  str
	  */
	  this.addErrorMsg = function(str)
	  {
	    this.errMsg.push(str);
	  }
}




