<?php

/**
 * 返回需要自动加载的路径或者类名称
 */
return array(
	'application.models.*',				// 所有模型
	'application.libraries.*',			// 所有库
	'application.helpers.*',			// 所有辅助类
	'application.third_party.*',		// 所有第三方扩展
	'common.hessian.*',					// 加载hessian
	'common.stomp.*',					// 加载stomp
);
?>
