<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
 * Created on 2012-3-7
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */
include_once (FRAME_PATH.'common/log4php/Logger.php');
define('LOG4PHP_DIR', FRAME_PATH.'application/'.APPLICATION_NAME.'/config/'.ENVIRONMENT);

class Log4php extends Logger{
	

}
//������־��������ļ�·��
$logPath=LOG4PHP_DIR . "/log4php.properties";
//���������ļ�
Log4php :: configure($logPath);

