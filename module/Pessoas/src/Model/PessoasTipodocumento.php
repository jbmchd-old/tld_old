<?php

namespace Pessoas\Model;

use ZeDb\Model;

class PessoasTipodocumento extends Model {
    
    public function __construct($options = null) {
        $this->tableName = __CLASS__;
        parent::__construct('id', $options);
    }
}