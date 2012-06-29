<?php

/**
 * ���ø�����
 * ����������
 * ��ȡIP
 * ��ȡ��ǰURL
 * ��ȡ��Դ
 * ��ȡ����+8-8ʱ��
 * ���㵱ǰ����
 * �����ת
 *
 * @author qixiaopeng <qixiaopeng@55tuan.com>
 */
class Utility
{

	/**
	 * �û�IP
	 * @var string
	 */
	private static $_realIp = NULL;

	/**
	 * ����û�����ʵIP��ַ
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
				/* ȡX-Forwarded-For�е�һ����unknown����ЧIP�ַ��� */
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
	 * �õ���ǰ��ҳ��
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
	 * ����һ��JS������ת��������ڿ���У��򽫿��ҳ��ˢ��Ϊ$url
	 * @param string $url Ҫ��ת����url
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
	 * ���json����
	 * @param stirng $json
	 */
	public static function printJson($json)
	{
		header('Content-type: application/json');
		echo $json;
	}
	/**
	 * ����һ���Ե�ǰʱ��-8Сʱ���ʱ��
	 * @param $input_time �����ʱ�䣬Ĭ��Ϊ��
	 * @return int $input_time=''ʱ�����ص�ǰʱ��Ķ�Ӧֵ
	 */
	public static function inputTime($input_time = '')
	{
		if(strlen($input_time) == 0 || !is_numeric($input_time))
			return time()-(3600*8);
		else
			return $input_time-(3600*8);
	}

	/**
	 * ����һ����$time��ʱ��+8Сʱ��ʱ��
	 * @param $output_time �����ʱ�䣬Ĭ��Ϊ��
	 * @return int $output_time=''ʱ�����ص�ǰʱ��Ķ�Ӧֵ
	 */
	public static function outputTime($output_time='')
	{
		if(strlen($output_time) == 0 || !is_numeric($output_time))
			return time()+(3600*8);
		else
			return $output_time+(3600*8);
	}

}