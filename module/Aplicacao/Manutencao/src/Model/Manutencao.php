<?php

namespace Aplicacao\Manutencao\Model;

use ZeDb\Model;

class Manutencao extends Model {
    
    public function __construct($options = null) {
        $this->tableName = __CLASS__;
        parent::__construct('id', $options);
    }
}