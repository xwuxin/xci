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
	 * @param  string $img:源图片地址; 
	 * @param  float $thumb_width: 最终宽度; 
	 * @param  float $thumb_height: 最终高度; 
	 * @param boolean $crop: 是否裁剪,默认为否.
	 * @param float $quality为生成图片的压缩质量(1-100); 
	 * @param string $path为生成文件的路径（不包括文件名）
 	 * @return 创建成功返回生成的文件名，否则返回false
 	 */
 	function make_thumb($img,$thumb_width = 0, $thumb_height = 0,$crop=false,$quality=90,$path = ''){

        /* 检查缩略图宽度和高度是否合法 */
        if ($thumb_width == 0 && $thumb_height == 0)
        {
            throw new Exception("width and height Invalid!");
            return false;
        }

 	/*检查原始文件是否存在及获得原始文件的信息 */
        $org_info = @getimagesize($img);
        if (!$org_info)
         {
	    throw new Exception("image not exists");
            return false;
         }

 	/* 创建当月目录 */
        if (empty($path))
        {
            $dir = 'images/' . date('Ym').'/';
        }
        else
        {
            $dir = $path;
        }

        /* 如果目标目录不存在，则创建它 */
        if (!file_exists($dir))
         {
            if (!$this->make_dir($dir))
            {
                /* 创建目录失败 */
                throw new Exception("directory readonly");
                return false;
            }
         }

        /* 如果文件名为空，生成不重名随机文件名 */
        $filename = $this->unique_name($dir);

		 try{	

			$gmagick = new Gmagick($img);
                        $ext = self::get_extension_name($gmagick->getimageformat());
                        $filename .= '.'.$ext;

			if($crop == false){

				$canvas = new Gmagick();
				$canvas->newimage($thumb_width,$thumb_height,$this->fillcolor,$gmagick->getimageformat());

				$gmagick->scaleimage($thumb_width,$thumb_height,true);
				/* 取得缩图的实际大小 */
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

			//确认文件是否生成
	       if (file_exists($dir . $filename))
	        {
	            return $dir. $filename;
	        }
	       else
	        {
	              //生成图片失败!
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
       *  生成指定目录不重名的文件名
       *
       * @access  public
       * @param   string      $dir        要检查是否有同名文件的目录
       *
       * @return  string      文件名
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
     * 生成随机的数字串
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
	  * 批量处理图片
	  *
	  */
    function file_list($path){
	    if ($handle = opendir($path)) {
	        while (false !== ($file = readdir($handle))) {
	            if ($file != "." && $file != "..") {
	                if (is_dir($path."/".$file)) {
	                    echo $path."/".$file."<br>";//去掉此行显示的是所有的非目录文件
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
	 * 获得当前格林威治时间的时间戳
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
	        /* 如果目录不存在则尝试创建该目录 */
	        @umask(0);

	        /* 将目录路径拆分成数组 */
	        preg_match_all('/([^\/]*)\/?/i', $folder, $atmp);

	        /* 如果第一个字符为/则当作物理路径处理 */
	        $base = ($atmp[0][0] == '/') ? '/' : '';

	        /* 遍历包含路径信息的数组 */
	        foreach ($atmp[1] AS $val)
	        {
	            if ('' != $val)
	            {
	                $base .= $val;

	                if ('..' == $val || '.' == $val)
	                {
	                    /* 如果目录为.或者..则直接补/继续下一个循环 */
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
	                /* 尝试创建目录，如果创建失败则继续循环 */
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
	        /* 路径已经存在。返回该路径是不是一个目录 */
	        $reval = is_dir($folder);
	    }

	    clearstatcache();

	    return $reval;
	}
 }
