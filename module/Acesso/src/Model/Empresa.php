<?php

namespace Acesso\Model;

use ZeDb\Model;

class Empresa extends Model {
    
    public function __construct($options = null) {
        $this->tableName = __CLASS__;
        parent::__construct('id', $options);
    }
}