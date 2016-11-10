<?php

namespace Acesso\Model;

use ZeDb\Model;

class AcessoUsuario extends Model {
    
    public function __construct($options = null) {
        $this->tableName = __CLASS__;
        parent::__construct('id', $options);
    }
}