<?php

namespace Aplicacao\Manutencao\Entity;

use ZeDb\Entity;

class VManutencaoItens extends Entity {
    
    public function __call($name, $arguments) {
        $attr = lcfirst(substr($name, 3));
        if(strpos($name, 'set') === 0){
            $this->$attr = $arguments[0];
        } else if(strpos($name, 'get') === 0){
            return $this->$attr;
        } else {
            return false;;
        }
    }



}
