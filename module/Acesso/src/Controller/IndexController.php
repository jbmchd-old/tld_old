<?php

namespace Acesso\Controller;

use Zend\Mvc\Controller\AbstractActionController;

use Zf3Authentication\Controller\AuthenticateController;

class IndexController extends AuthenticateController {

    public function __construct($sm) { parent::__construct($sm); }
    
    public function loginAction() { parent::loginAction(); }

    public function logadoAction() { parent::logadoAction(); }
    
    public function logoutAction($redirect = true) { parent::logoutAction($redirect); }


}
