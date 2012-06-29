<?php
$config = array(
                 'add_shop' => array(
                                    array(
                                            'field' => 'shop_name',
                                            'label' => '�ŵ�����',
                                            'rules' => 'required|max_length[50]'
                                         ),
                                    array(
                                            'field' => 'shop_sname',
                                            'label' => '�ŵ���',
                                            'rules' => 'required|max_length[15]'
                                         ),
                                    array(
                                            'field' => 'city',
                                            'label' => '����',
                                            'rules' => 'required'
                                         ),
                                    array(
                                            'field' => 'city_id',
                                            'label' => '���б��',
                                            'rules' => 'required'
                                         ),
                                    array(
                                            'field' => 'addr',
                                            'label' => '��ϸ��ַ',
                                            'rules' => 'required|max_length[128]'
                                         ),
                                    array(
                                            'field' => 'tel_msg',
                                            'label' => '�����е绰',
                                            'rules' => 'max_length[12]'
                                         ),
                                    array(
                                            'field' => 'business_hours',
                                            'label' => 'Ӫҵʱ��',
                                            'rules' => 'required|max_length[128]'
                                         ),
                                    array(
                                            'field' => 'parking_status',
                                            'label' => 'ͣ��״��',
                                            'rules' => 'max_length[50]'
                                         ),
                                    array(
                                            'field' => 'traffic_info',
                                            'label' => '��ͨ��Ϣ',
                                            'rules' => ''
                                         ),
                                    array(
                                            'field' => 'wifi',
                                            'label' => '��������',
                                            'rules' => ''
                                         ),
                                    array(
                                            'field' => 'credit_card',
                                            'label' => 'ˢ������',
                                            'rules' => ''
                                         ),
                                    array(
                                            'field' => 'shop_category[]',
                                            'label' => '����',
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
                                            'label' => '�ŵ�������',
                                            'rules' => 'required|max_length[50]|is_exist'
                                         ),
                                    array(
                                            'field' => 'group_sname',
                                            'label' => '�ŵ�����',
                                            'rules' => 'required|max_length[10]'
                                         )

                                    )
            );
