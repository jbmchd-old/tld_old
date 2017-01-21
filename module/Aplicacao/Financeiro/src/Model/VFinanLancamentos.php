<?php

namespace Aplicacao\Financeiro\Model;

use ZeDb\Model;

class VFinanLancamentos extends Model {
    
    public function __construct($options = null) {
        $this->tableName = __CLASS__;
        parent::__construct('id', $options);
    }
    
    public function buscaLancamentos($data_inicio, $data_fim){
        
        $sql = "select * from {$this->tableName} where dtainclusao between '$data_inicio' and '$data_fim'";
        return $this->executeSql($sql);
        
    }
    
    public function buscaLancamentosListagem($data_inicio, $data_fim){
        
        $sql = "select * from {$this->tableName} where dtainclusao between '$data_inicio' and '$data_fim'";
        return $this->executeSql($sql)['result'];
        
    }
    
    public function buscaLancamentosListagemResumo($data_inicio, $data_fim){
        
        $sql = "SELECT 
                    (select sum(valor) from {$this->tableName} where tipo='R' and situacao='A' and dtainclusao between '$data_inicio' and '$data_fim') 'receita_receber',
                    (select sum(valor) from {$this->tableName} where tipo='R' and situacao='P' and dtainclusao between '$data_inicio' and '$data_fim') 'receita_caixa',

                    (select sum(valor) from {$this->tableName} where tipo='D' and situacao='A' and dtainclusao between '$data_inicio' and '$data_fim') 'despesa_pagar',
                    (select sum(valor) from {$this->tableName} where tipo='D' and situacao='P' and dtainclusao between '$data_inicio' and '$data_fim') 'despesa_paga',

                    ((select sum(valor) from {$this->tableName} where tipo='R' and situacao='P' and dtainclusao between '$data_inicio' and '$data_fim')- (select sum(valor) from {$this->tableName} where tipo='D' and situacao='P' and dtainclusao between '$data_inicio' and '$data_fim')) 'caixa_total',
                    round((((select sum(valor) from {$this->tableName} where tipo='R' and situacao='P' and dtainclusao between '$data_inicio' and '$data_fim')- (select sum(valor) from {$this->tableName} where tipo='D' and situacao='P' and dtainclusao between '$data_inicio' and '$data_fim'))*10)/100,2) 'dizimo'
                    
                FROM dual";
        
        return $this->executeSql($sql)['result'][0];
        
    }
    
    public function buscaLancamentosCategorias($data_inicio, $data_fim){
        
        $sql = "select b.nome, a.tipo, a.situacao, sum(a.valor) total
                from {$this->tableName} a
                left join finan_lanc_categoria b on b.id=a.categoria_id
                where dtainclusao between '$data_inicio' and '$data_fim' 
                group by b.nome, a.tipo, a.situacao
                order by b.nome, a.tipo desc, a.situacao";
        
        return $this->executeSql($sql)['result'];
        
    }
    
}