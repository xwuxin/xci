<?php
/*
 * Created on 2011-11-1
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */

include_once 'HessianClient.php';

//接口地址
$testurl ='http://10.9.21.242:8086/remoting/orderQuery';

$options = new HessianOptions();

$options->version = 1;

$options->saveRaw=true;

/** 当调用对方的接口，需要给对方传的参数是对象时，需要在本地先建立一个对象与远程的对象进行映射**/
class Item{

	var $pageNumber = 1;
	var $rowCount=10;
	var $beginTime=0;
	var $endTime=0;
	
	var $orderStatusList = array();
	var $payStatusList = array();
	var $refundStatusList = array();


	function __construct(){

	}	
}

try{

	//这里做对象的映射,typeMap的键为接口方的完整类路径，值为本地类名称
	$options->typeMap = array('com.tuan.ordercenter.model.param.OrderQueryListParam' => 'Item');

	//将options设置到HessianClient中.
	$proxy = new HessianClient($testurl,$options);

	$item = new Item();
	$item->pageNumber = 4;
	$item->rowCount = 10;

	$item->orderStatusList = array(1,1,1,1,1);
	$item->payStatusList = array(1,1,4,2,3,4,1);
	$item->refundStatusList = array(0,0);

	//调用接口方提供的方法，给对方传$item参数
	$result = $proxy->userOrderListQuery("xxxx","USER_CENTER",9102529,$item);
	echo "<pre>";
	var_dump($result);
	echo "</pre>";

} catch (Exception $ex){
	echo "<pre>";
	var_dump($ex);
	echo "</pre>";
	// ...handle error

}









	
		








































