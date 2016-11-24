<?php
/**
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2016 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Aplicacao\Manutencao\Controller;

use Zend\View\Model\JsonModel;
use Zf3ServiceBase\Controller\GenericController;

class ManutencaoController extends GenericController
{  
    public function __construct($sm) {
        parent::__construct($sm, __NAMESPACE__);    
    }
    
}
