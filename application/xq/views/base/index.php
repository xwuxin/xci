<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$this->load->view("common/header");
?>

    <div class="container-fluid">
      <div class="row-fluid">
        
		<?php 
		$this->load->view("common/sidebar_1");
		?>
		
        <div class="span9">
			  <table class="table">
				  
				  <tr>
					  <td>明文：</td>
					  <td><input type="text" /></td>
				  </tr>
					<tr>
						<td>md5加密：</td>
						<td><span>asdfasdf</span>
						</td>
					</tr>
					<tr>
						<td> 双md5加密：</td>
						<td><span>asdfasdf</span></td>
					</tr>
				</table>  
         
        </div><!--/span-->
      </div><!--/row-->

      <hr>

     

<?php
$this->load->view("common/footer");

?>