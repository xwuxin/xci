// 城市所有json

var cityObj = new Object();
var json = [];

/**判断一个值是否在一个数组中*/
function in_array(needle, haystack) {

	var type = typeof needle;
	
	 if(type == 'string' || type =='number') {
	  for(var i in haystack) {
	   if(haystack[i] == needle) {
	     return true;
	   }
	  }
	 }
	 return false;
}

/**获取商圈*/
cityObj.getArea=function(){
	
	var id = $('#district_id').val();
	
	$.getJSON('/common/newbee/areas',{'id':id},function (data){
		
//			$('#area_id').html("<option value=''>全部商圈</option>");
//			if(data)
//			{
//				for(var i in data)
//				{
//					$('#area_id').append('<option value='+data[i]['id']+'>'+data[i]['name']+'</option>');
//				}
//			}
		
		$('#areas_span').html('');
		if(data)
		{
			var curr_area_ids = '';
			if(app_config['curr_area_ids'] != ''){
				curr_area_ids = app_config['curr_area_ids'].split(",");
			}

			for(var i in data)
			{
				var check = '';
				if(curr_area_ids != ''){
					
					if(in_array(data[i]['id'],curr_area_ids)){
						
						check = "checked='checked'";
						
					}
				}
				
				$('#areas_span').append('<div style="display: inline;float: left; margin: 5px 0; width: 90px;"><input type="checkbox" onclick="shop.test_areas_len(this);" name="area_ids[]" '+check+' value='+data[i]['id']+' />'+'&nbsp;&nbsp;'+data[i]['name']+"&nbsp;&nbsp;</div>");
				var n = parseInt(i)+1;
				
			}
		}
		
	});
	
}

/**获取地区*/
cityObj.getDistricts = function(city_id,area_bool){
	
	$.getJSON('/common/newbee/districts',{'city_id':city_id},function (data){
		$('#district_id').html("<option value=''>选择区域</option>");
		if(data)
		{
			for(var i in data)
			{
				var select = '';
				
				if(i == app_config['curr_district_id']){
					select = "selected='true'";
				}
				
				$('#district_id').append('<option '+select+' value='+i+'>'+data[i]+'</option>');
			}
			
			if(area_bool == true){
				
				cityObj.getArea();
				
			}
		}
	});
	
}
var tip = '输入城市首字母';
var cacheCity;
var cacheCityID;
$(document).ready(function (){
	//$('#city').val(tip);
	$.getJSON('/common/newbee/citys',{'city_type':'city'},function (data){
		
		var json = data;
		//去掉全国选项
		for(var i in json)
		{
			if(json[i].id == 0)
			{
				json.splice(i,1);
				break;
			}
		}
		$('#city').autocomplete(json, {
			minChars: 0,
			width: 200,
			matchContains: true,
			autoFill: false,
			readonly:true,
			formatItem: function(row, i) {
				return i + ': "' + row.name+ '" [ '+ row.pinyin+ ']';
			},
			formatMatch: function(row, i, max) {
				return row.name + ' ' + row.initials;
			},
			formatResult: function(row) {
				return row.name;
			}
		}).result(function (e,json,value,sec){
			
			$('#city_id').val(json.id);
			cityObj.getDistricts(json.id,false);
			$('[name="list_form"]').submit();
                         
		}).click(function(){
			cacheCity 	= $('#city').val();
			cacheCityID = $('#city_id').val();
			$('#city').val('');
			
		}).blur(function(){
			if($('#city').val() == '' || $('#city_id').val() == ''){
				$('#city').val(tip);
				$('#city_id').val('');
			}		
		});
		
		if($('#city_id').val() != ''){
			
			var city_id = parseInt($('#city_id').val());
			
			cityObj.getDistricts(city_id,true);
			
		}
			
		$('#district_id').change(function (){
			cityObj.getArea();
		});
	
	});
		
});


		
