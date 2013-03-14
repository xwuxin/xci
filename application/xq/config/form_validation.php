<?php
$config = array(
                 'add_shop' => array(
                                    array(
                                            'field' => 'shop_name',
                                            'label' => '门店名称',
                                            'rules' => 'required|max_length[50]'
                                         ),
                                    array(
                                            'field' => 'shop_sname',
                                            'label' => '门店简称',
                                            'rules' => 'required|max_length[15]'
                                         ),
                                    array(
                                            'field' => 'city',
                                            'label' => '城市',
                                            'rules' => 'required'
                                         ),
                                    array(
                                            'field' => 'city_id',
                                            'label' => '城市编号',
                                            'rules' => 'required'
                                         ),
                                    array(
                                            'field' => 'addr',
                                            'label' => '详细地址',
                                            'rules' => 'required|max_length[128]'
                                         ),
                                    array(
                                            'field' => 'tel_msg',
                                            'label' => '短信中电话',
                                            'rules' => 'max_length[12]'
                                         ),
                                    array(
                                            'field' => 'business_hours',
                                            'label' => '营业时间',
                                            'rules' => 'required|max_length[128]'
                                         ),
                                    array(
                                            'field' => 'parking_status',
                                            'label' => '停车状况',
                                            'rules' => 'max_length[50]'
                                         ),
                                    array(
                                            'field' => 'traffic_info',
                                            'label' => '交通信息',
                                            'rules' => ''
                                         ),
                                    array(
                                            'field' => 'wifi',
                                            'label' => '无线上网',
                                            'rules' => ''
                                         ),
                                    array(
                                            'field' => 'credit_card',
                                            'label' => '刷卡消费',
                                            'rules' => ''
                                         ),
                                    array(
                                            'field' => 'shop_category[]',
                                            'label' => '分类',
                                            'rules' => 'required'
                                         )
                                         
                                    ),
                                    
                 'email' => array(
                                    array(
                                            'field' => 'emailaddress',
                                            'label' => 'EmailAddress',
                                            'rules' => 'required|valid_email'
                                         ),
                                    array(
                                            'field' => 'name',
                                            'label' => 'Name',
                                            'rules' => 'required|alpha'
                                         ),
                                    array(
                                            'field' => 'title',
                                            'label' => 'Title',
                                            'rules' => 'required'
                                         ),
                                    array(
                                            'field' => 'message',
                                            'label' => 'MessageBody',
                                            'rules' => 'required'
                                         )
                                    ),                          
                 'add_group'=> array(
                                    array(
                                            'field' => 'group_name',
                                            'label' => '门店组名称',
                                            'rules' => 'required|max_length[50]|is_exist'
                                         ),
                                    array(
                                            'field' => 'group_sname',
                                            'label' => '门店组简称',
                                            'rules' => 'required|max_length[10]'
                                         )

                                    )
            );
