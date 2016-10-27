<?php
/**
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2016 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Aplicacao\Pessoas\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

use Zf3ServiceBase\Controller\GenericController;

class IndexController extends GenericController
{
   
    public function __construct($sm) {
        parent::__construct($sm, __NAMESPACE__);    
    }
    
    public function indexAction(){
        echo '<pre>';
        print_r('aki');
        die();
        return new ViewModel([
            "telas" => [],
        ]);
    }
    
    
}
