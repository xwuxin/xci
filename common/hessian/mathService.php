<?php
class Math{    

  function add($n1,$n2) {        

    return $n1+$n2;    

  }    

  function sub($n1,$n2) {        

    return $n1-$n2;    

  }    

  function mul($n1,$n2) {        

    return $n1*$n2;    

  }    

  function div($n1,$n2) {        

    return $n1/$n2;    

  }

}

include_once 'HessianService.php';

$service = new HessianService(new Math());

$service->handle();
