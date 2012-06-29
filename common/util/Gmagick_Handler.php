<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
 * Created on 2011-11-1
 * @author  xwuxin<xwuxin@xwuxin.com>
 * @version 3.0 2011/11/24 15:23
 * @copyright 2011.11.24 xwuxin
 * $gmagick = new Gmagick_handler();
 * $gmagick->make_thumb("images/1.jpg",200,300,true,80,"newimage/1.jpg");
 *
 *
 */
 class Gmagick_Handler{

 	 var $fillcolor = "#FFFFFF";

 	 function __construct()
         {

         }

 	/**
 	 *
	 * @param  string $img:ԴͼƬ��ַ; 
	 * @param  float $thumb_width: ���տ��; 
	 * @param  float $thumb_height: ���ո߶�; 
	 * @param boolean $crop: �Ƿ�ü�,Ĭ��Ϊ��.
	 * @param float $qualityΪ����ͼƬ��ѹ������(1-100); 
	 * @param string $pathΪ�����ļ���·�����������ļ�����
 	 * @return �����ɹ��������ɵ��ļ��������򷵻�false
 	 */
 	function make_thumb($img,$thumb_width = 0, $thumb_height = 0,$crop=false,$quality=90,$path = ''){

        /* �������ͼ��Ⱥ͸߶��Ƿ�Ϸ� */
        if ($thumb_width == 0 && $thumb_height == 0)
        {
            throw new Exception("width and height Invalid!");
            return false;
        }

 	/*���ԭʼ�ļ��Ƿ���ڼ����ԭʼ�ļ�����Ϣ */
        $org_info = @getimagesize($img);
        if (!$org_info)
         {
	    throw new Exception("image not exists");
            return false;
         }

 	/* ��������Ŀ¼ */
        if (empty($path))
        {
            $dir = 'images/' . date('Ym').'/';
        }
        else
        {
            $dir = $path;
        }

        /* ���Ŀ��Ŀ¼�����ڣ��򴴽��� */
        if (!file_exists($dir))
         {
            if (!$this->make_dir($dir))
            {
                /* ����Ŀ¼ʧ�� */
                throw new Exception("directory readonly");
                return false;
            }
         }

        /* ����ļ���Ϊ�գ����ɲ���������ļ��� */
        $filename = $this->unique_name($dir);

		 try{	

			$gmagick = new Gmagick($img);
                        $ext = self::get_extension_name($gmagick->getimageformat());
                        $filename .= '.'.$ext;

			if($crop == false){

				$canvas = new Gmagick();
				$canvas->newimage($thumb_width,$thumb_height,$this->fillcolor,$gmagick->getimageformat());

				$gmagick->scaleimage($thumb_width,$thumb_height,true);
				/* ȡ����ͼ��ʵ�ʴ�С */
				$gw = $gmagick->getimagewidth();
				$gh = $gmagick->getimageheight();  

				$x = ( $thumb_width - $gw) / 2;
				$y = ( $thumb_height - $gh ) / 2;
				$tempgmagick = $gmagick;

				$gmagick = $canvas->compositeimage($gmagick,Gmagick::COMPOSITE_OVER,$x,$y);

			}else{

				$gmagick->cropthumbnailimage($thumb_width,$thumb_height);

			}
			$gmagick->setCompressionQuality($quality);
			$gmagick->write($dir . $filename);
			$gmagick->destroy();

			if($canvas != null){

				$canvas->destroy();
				$tempgmagick->destroy();
			}

			//ȷ���ļ��Ƿ�����
	       if (file_exists($dir . $filename))
	        {
	            return $dir. $filename;
	        }
	       else
	        {
	              //����ͼƬʧ��!
	            throw new Exception("create image error!");
	            return false;
	        }

		}catch(Exception $e){

			throw new Exception($e);
			return false;

		}

 	}
      

      static function get_extension_name($format){
		
	switch($format){
		case 'JPEG':
		     return 'jpg';
		     break;
                case 'PNG':
                     return 'png';
                     break;
                case 'GIF':
		     return 'GIF';
                     break;
                default:
                     return 'jpg';
		
	}
        	
      }

     /**
       *  ����ָ��Ŀ¼���������ļ���
       *
       * @access  public
       * @param   string      $dir        Ҫ����Ƿ���ͬ���ļ���Ŀ¼
       *
       * @return  string      �ļ���
       */
    private function unique_name($dir)
    {
        $filename = '';

        while (empty($filename))
         {

            $filename = $this->random_filename();

            if (file_exists($dir . $filename . '.jpg') || file_exists($dir . $filename . '.gif') || file_exists($dir . $filename . '.png'))
            {
                $filename = '';
            }
         }

        return $filename;
    }

     /**
     * ������������ִ�
     *
     * @return string
     */
    private function random_filename()
    {

        $str = '';
        for($i = 0; $i < 9; $i++)
        {
            $str .= mt_rand(0, 9);
        }

        return $this->gmtime() . $str;

    }

     /**
	  *
	  * ��������ͼƬ
	  *
	  */
    function file_list($path){
	    if ($handle = opendir($path)) {
	        while (false !== ($file = readdir($handle))) {
	            if ($file != "." && $file != "..") {
	                if (is_dir($path."/".$file)) {
	                    echo $path."/".$file."<br>";//ȥ��������ʾ�������еķ�Ŀ¼�ļ�
	                    file_list($path."/".$file);
	                } else {

	                	  $arr = explode('.',$file);
						   echo end($arr);
	                    echo $path."/".$file."<br>";
	                }
	            }
	        }
	    }
	}

        /**
	 * ��õ�ǰ��������ʱ���ʱ���
	 *
	 * @return  integer
	 */
	private function gmtime()
	{
	    return (time() - date('Z'));
	}

 	private function make_dir($folder)
	{
	    $reval = false;

	    if (!file_exists($folder))
	    {
	        /* ���Ŀ¼���������Դ�����Ŀ¼ */
	        @umask(0);

	        /* ��Ŀ¼·����ֳ����� */
	        preg_match_all('/([^\/]*)\/?/i', $folder, $atmp);

	        /* �����һ���ַ�Ϊ/��������·������ */
	        $base = ($atmp[0][0] == '/') ? '/' : '';

	        /* ��������·����Ϣ������ */
	        foreach ($atmp[1] AS $val)
	        {
	            if ('' != $val)
	            {
	                $base .= $val;

	                if ('..' == $val || '.' == $val)
	                {
	                    /* ���Ŀ¼Ϊ.����..��ֱ�Ӳ�/������һ��ѭ�� */
	                    $base .= '/';

	                    continue;
	                }
	            }
	            else
	            {
	                continue;
	            }

	            $base .= '/';

	            if (!file_exists($base))
	            {
	                /* ���Դ���Ŀ¼���������ʧ�������ѭ�� */
	                if (@mkdir(rtrim($base, '/'), 0777))
	                {
	                    @chmod($base, 0777);
	                    $reval = true;
	                }
	            }
	        }
	    }
	    else
	    {
	        /* ·���Ѿ����ڡ����ظ�·���ǲ���һ��Ŀ¼ */
	        $reval = is_dir($folder);
	    }

	    clearstatcache();

	    return $reval;
	}
 }
