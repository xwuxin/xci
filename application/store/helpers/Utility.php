<?php

/**
 * 公用辅助类
 * 包括方法：
 * 获取IP
 * 获取当前URL
 * 获取来源
 * 获取各种+8-8时间
 * 计算当前域名
 * 框架跳转
 *
 * @author qixiaopeng <qixiaopeng@55tuan.com>
 */
class Utility
{

	/**
	 * 用户IP
	 * @var string
	 */
	private static $_realIp = NULL;

	/**
	 * 获得用户的真实IP地址
	 *
	 * @access  public
	 * @return  string
	 */
	public static function realIp()
	{
		if (self::$_realIp != NULL)
		{
			return self::$_realIp;
		}
		if (isset($_SERVER))
		{
			if (isset($_SERVER['HTTP_X_FORWARDED_FOR']))
			{
				$arr = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
				/* 取X-Forwarded-For中第一个非unknown的有效IP字符串 */
				foreach ($arr AS $ip)
				{
					$ip = trim($ip);
					if ($ip != 'unknown')
					{
						$realip = $ip;
						break;
					}
				}
			}
			elseif (isset($_SERVER['HTTP_CLIENT_IP']))
			{
				$realip = $_SERVER['HTTP_CLIENT_IP'];
			}
			else
			{
				if (isset($_SERVER['REMOTE_ADDR']))
				{
					$realip = $_SERVER['REMOTE_ADDR'];
				}
				else
				{
					$realip = '0.0.0.0';
				}
			}
		}
		else
		{
			if (getenv('HTTP_X_FORWARDED_FOR'))
			{
				$realip = getenv('HTTP_X_FORWARDED_FOR');
			}
			elseif (getenv('HTTP_CLIENT_IP'))
			{
				$realip = getenv('HTTP_CLIENT_IP');
			}
			else
			{
				$realip = getenv('REMOTE_ADDR');
			}
		}
		preg_match("/[\d\.]{7,15}/", $realip, $onlineip);
		$realip = !empty($onlineip[0]) ? $onlineip[0] : '0.0.0.0';
		return $realip;
	}

	/**
	 * 得到当前的页面
	 * @return string
	 */
	public static function getUri()
	{
		$url = 'http://';
		$url .= $_SERVER['SERVER_NAME'];
		$port = $_SERVER['SERVER_PORT'];
		if ($port != 80)
		{
			$url .= ':' . $port;
		}
		if ($_SERVER['REQUEST_URI'] == '/' || $_SERVER['REQUEST_URI'] == '' || $_SERVER['REQUEST_URI'] == '/index.php')
		{
			return '';
		}
		$url .= $_SERVER['REQUEST_URI'];
		if (!strstr($url, '?') && isset($_SERVER['QUERY_STRING']) && $_SERVER['QUERY_STRING'] != '')
		{
			$url .= '?' . $_SERVER['QUERY_STRING'];
		}
		return urlencode($url);
	}

	/**
	 * 输入一段JS进行跳转，如果处在框架中，则将框架页面刷新为$url
	 * @param string $url 要跳转到的url
	 */
	public static function frame_redirect($url)
	{
		$js = "
		<script type='text/javascript'>
			if (window.parent == 'undefined') {
				window.location = '$url';
			}
			window.parent.location = '$url';
		</script>";
		echo $js;
	}

		/**
	 * 输出json数据
	 * @param stirng $json
	 */
	public static function printJson($json)
	{
		header('Content-type: application/json');
		echo $json;
	}
	/**
	 * 生成一个以当前时间-8小时后的时间
	 * @param $input_time 输入的时间，默认为空
	 * @return int $input_time=''时，返回当前时间的对应值
	 */
	public static function inputTime($input_time = '')
	{
		if(strlen($input_time) == 0 || !is_numeric($input_time))
			return time()-(3600*8);
		else
			return $input_time-(3600*8);
	}

	/**
	 * 生成一个以$time的时间+8小时的时间
	 * @param $output_time 输入的时间，默认为空
	 * @return int $output_time=''时，返回当前时间的对应值
	 */
	public static function outputTime($output_time='')
	{
		if(strlen($output_time) == 0 || !is_numeric($output_time))
			return time()+(3600*8);
		else
			return $output_time+(3600*8);
	}

}