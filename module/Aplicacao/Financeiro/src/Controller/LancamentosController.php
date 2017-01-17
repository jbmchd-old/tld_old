<?php

/**
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2016 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Aplicacao\Financeiro\Controller;

use Zend\View\Model\JsonModel;
use Zf3ServiceBase\Controller\GenericController;

class LancamentosController extends GenericController {

    public function __construct($sm) {
        parent::__construct($sm, __NAMESPACE__);
    }
    
    public function salvarCategoriaAction() {
    
        $request = $this->getRequest();
        if (!$request->isPost()) {
            return false;
        }

        $dados = $request->getPost()->toArray();
        
        $srv = $this->app()->getEntity('FinanLancCategoria');
        $entity = $srv->create($dados);
        $result = $srv->save($entity);
        
        return new JsonModel(['ok' => is_object($result)]);
        
    }
    
    public function buscaTodasCategoriasAction(){
        $request = $this->getRequest();
        if (!$request->isPost()) {
            return false;
        }

        $srv = $this->app()->getEntity('VFinanLancTodasCategorias');
        $result = $srv->getAll();
        
        return new JsonModel($result);
    }
    
    public function buscaCategoriasAction(){
        $request = $this->getRequest();
        if (!$request->isPost()) {
            return false;
        }

        $srv = $this->app()->getEntity('VFinanLancCategorias');
        $result = $srv->getAll();
        
        return new JsonModel($result);
    }
    
    public function salvarAction() {
    
        $request = $this->getRequest();
        if (!$request->isPost()) {
            return false;
        }

        $dados = $request->getPost()->toArray();
        $dados['dtainclusao'] = (new \DateTime())->format('Y-m-d H:i:s');
        
        $srv = $this->app()->getEntity('FinanLancamentos');
        $entity = $srv->create($dados);
        $result = $srv->save($entity);
        
        return new JsonModel(['ok' => is_object($result)]);
        
    }
    
    public function buscaLancamentosAction(){
        $request = $this->getRequest();
        if (!$request->isPost()) {
            return false;
        }
        $dados = $request->getPost()->toArray();
        $srv = $this->app()->getEntity('VFinanLancamentos');
        $result = $srv->buscaLancamentos($dados['inicio'], $dados['fim'].' 23:29:29');

        return new JsonModel($result);
    }
    
    public function buscaLancamentosListagemAction(){
        $request = $this->getRequest();
        if (!$request->isPost()) {
            return false;
        }
        $dados = $request->getPost()->toArray();
        $srv = $this->app()->getEntity('VFinanLancamentos');
        $result['lancamentos'] = $srv->buscaLancamentosListagem($dados['inicio'], $dados['fim'].' 23:29:29');
        $result['resumo'] = $srv->buscaLancamentosListagemResumo($dados['inicio'], $dados['fim'].' 23:29:29');
        $result['categorias'] = $srv->buscaLancamentosCategorias($dados['inicio'], $dados['fim'].' 23:29:29');

        return new JsonModel($result);
    }
    
    public function buscaLancamentoAction(){
        $request = $this->getRequest();
        if (!$request->isPost()) {
            return false;
        }
        $dados = $request->getPost()->toArray();

        $srv = $this->app()->getEntity('VFinanLancamentos');
        $result = $srv->getAllById($dados['id']);

        return new JsonModel($result[0]);
    }

}
