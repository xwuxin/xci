<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

class Welcome extends CI_Controller {
	
	function index(){
		
		 $this->load->view("index");
		
	}
	
	function md5_page(){
		
		 $this->load->view("base/index");
	}
	
	
}
?>
