<?php

class PessoaController{

    public function index(){



    }

    public function login($dados){
        $pessoa = new Pessoa;
        $pessoa->login($_REQUEST);
    }
    
}

?>