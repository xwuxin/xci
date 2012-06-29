/**地图操作**/
var dumap = new Object();

var marker_trick = false;

var lat ;
var lon ;
var zoom_level = 17;
var point = new BMap.Point(116.404, 39.915);

if(app_config['act'] == 'edit' || app_config['act'] == 'confirm_update' ||  app_config['act'] == 'audit'  || app_config['act'] == 'view'  || app_config['act'] == 'freeze'){
	
	lat = document.getElementById("lat").value;
	lon = document.getElementById("lon").value;
	zoom_level = document.getElementById("zoom_level").value;
  
	point = new BMap.Point(lon,lat);  // 创建点坐标  
	
}

var map = new BMap.Map("map_container");
map.addControl(new BMap.NavigationControl());  

map.enableAutoResize();

var marker = new BMap.Marker(point, {
	
            enableMassClear: false,
            enableDragging:true,
            raiseOnDrag: true

});

marker.enableDragging(true);
marker.closeInfoWindow();

marker.addEventListener("dragend", function(e){  
	 dumap.setResult( e.point.lng, e.point.lat);
});

map.centerAndZoom(point, zoom_level);
map.addOverlay(marker);

map.addEventListener("tilesloaded",function(){
	
	//map.enableScrollWheelZoom();
	
	//map.removeEventListener("tilesloaded");
});

map.addEventListener("click", function(e){
            if(!(e.overlay)){
                map.clearOverlays();
                marker.show();
                marker.closeInfoWindow();  
                marker.setPosition(e.point);
                dumap.setResult(e.point.lng, e.point.lat);
            }
});

map.addEventListener("zoomend", function(e){
   document.getElementById("zoom_level").value = this.getZoom();
});

marker.addEventListener("dragend", function(e){

 	dumap.setResult(e.point.lng, e.point.lat);

});

var local = new BMap.LocalSearch(map, {

	renderOptions:{map: map},

	pageCapacity: 1

});

local.setSearchCompleteCallback(function(results){

	if(local.getStatus() !== BMAP_STATUS_SUCCESS){

		//alert("无结果");

	} else {
		
		marker.closeInfoWindow();  
		marker.hide();
		
	}
});

local.setMarkersSetCallback(function(pois){
	
	for(var i=pois.length; i--; ){
		
		var xmarker = pois[i].marker;
		
		var pos = xmarker.getPosition();
	    dumap.setResult(pos.lng, pos.lat);
	   
    }
	
});

local.setInfoHtmlSetCallback(function(info){
	map.closeInfoWindow();
        
        if(app_config['act'] != 'add'){
            map.setZoom(document.getElementById("zoom_level").value);
        }else{
            
            map.setZoom(zoom_level);
        }
});

dumap.searchmap = function(){
    
    var center =document.getElementById("addr").value;
    var city = document.getElementById("city").value;
    local.search(city+center);

};

/*
 * setResult : 定义得到标注经纬度后的操作
 * 请修改此函数以满足您的需求
 * lng: 标注的经度
 * lat: 标注的纬度
 */
dumap.setResult = function(lng, lat){
    document.getElementById("lat").value = lat;
    document.getElementById("lon").value = lng ;
}

if(app_config['act'] == 'add'){
	
	local.search("北京");
	
}