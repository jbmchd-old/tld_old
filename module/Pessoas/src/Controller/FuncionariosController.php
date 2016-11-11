<?php

/**
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2016 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Pessoas\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\JsonModel;
use Zf3ServiceBase\Controller\GenericController;

class FuncionariosController extends GenericController {

    public function __construct($sm) {
        parent::__construct($sm, __NAMESPACE__);
    }

    public function buscaFuncionariosAction() {
        $request = $this->getRequest();
        if (!$request->isPost()) { return false; }

        $srv_func = $this->app()->getEntity('Pessoas');
        $func = $srv_func->getAllByTipo('FUN');
        return new JsonModel($func);
    }
    
    public function buscaFuncionarioAction() {
        $request = $this->getRequest();
        if (!$request->isPost()) {
            return false;
        }
        $dados = $request->getPost()->toArray();
        $srv_pes = $this->app()->getEntity('VFuncionarios');
        $pessoa = $srv_pes->getAllByPessoasId($dados['pessoas_id']);
        return new JsonModel($pessoa);
    }
    
    public function salvarAction() {
        
        $request = $this->getRequest();

        if (!$request->isPost()) { return false; }

        $dados = $request->getPost()->toArray();
        if($dados['id']>0){
            $dados['dtaalteracao'] = (new \DateTime())->format('Y-m-d H:m:i');
        } else {
            $dados['dtainclusao'] = (new \DateTime())->format('Y-m-d H:m:i');
        }
        
        $dados['salario'] = str_replace(',', '.', $dados['salario']);
        
        try {
            $srv_pessoas = $this->app()->getEntity('PessoasFuncionarios');
            $entity = $srv_pessoas->create($dados);
            $result = $srv_pessoas->save($entity);
            
            return new JsonModel($result->toArray());
            
        } catch (\Exception $exc) {
            return new JsonModel(['error'=>'1', 'message'=>$exc->getMessage()]);
        }

    }
}
