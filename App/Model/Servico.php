<?php

class Servico extends Padrao{

    public function listaTodos(){

        $result = $this->select("SELECT * FROM Servico ORDER BY servicoCod ASC");
        return $result;

        echo $result;

    }


}

?>