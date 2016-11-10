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

class PessoasController extends GenericController {

    public function __construct($sm) {
        parent::__construct($sm, __NAMESPACE__);
    }

    public function salvarAction() {
        
        $request = $this->getRequest();

        if (!$request->isPost()) {
            return false;
        }

        $dados_pes = $request->getPost()->toArray();

        $dados_pes['nrodocumento'] = preg_replace('/[^0-9]/', '', $dados_pes['nrodocumento']);

        $dados_pes['dtanascimento'] = implode('-', array_reverse(explode('/', $dados_pes['dtanascimento'])));

        $dados_pes['fone1'] = preg_replace('/[^0-9]/', '', $dados_pes['fone1']);
        $dados_pes['fone2'] = preg_replace('/[^0-9]/', '', $dados_pes['fone2']);

        $dados_pes['status'] = ($dados_pes['status'] == true) ? 'A' : 'I';

        
        if($dados_pes['id']>0){
            $dados_pes['dtaultimaalteracao'] = (new \DateTime())->format('Y-m-d H:m:i');
        } else {
            $dados_pes['dtacadastro'] = (new \DateTime())->format('Y-m-d H:m:i');
        }
        
        try {
            $srv_pessoas = $this->app()->getEntity('Pessoas');
            $entity = $srv_pessoas->create($dados_pes);
            $result = $srv_pessoas->save($entity);
            
            return new JsonModel($result->toArray());
            
        } catch (\Exception $exc) {
            return new JsonModel(['error'=>'1', 'message'=>$exc->getMessage()]);
        }

    }

    public function buscaTiposDocumentosAction() {

        $request = $this->getRequest();
        if (!$request->isPost()) {
            return false;
        }

        $srv_tipos_doc = $this->app()->getEntity('PessoasTipodocumento');
        $tipos_doc = $srv_tipos_doc->getAll();
        return new JsonModel($tipos_doc);
    }

    public function buscaPessoasAction() {
        $request = $this->getRequest();
        if (!$request->isPost()) {
            return false;
        }

        $srv_tipos_doc = $this->app()->getEntity('Pessoas');
        $tipos_doc = $srv_tipos_doc->getAll();
        return new JsonModel($tipos_doc);
    }
    
    public function buscaPessoaAction() {
        $request = $this->getRequest();
        if (!$request->isPost()) {
            return false;
        }
        $dados = $request->getPost()->toArray();
        $srv_pes = $this->app()->getEntity('Pessoas');
        $pessoa = $srv_pes->getAllById($dados['id']);
        return new JsonModel($pessoa);
    }
}
