<?php

class PessoaController{

    public function index(){

        echo "Voce ta na controller de pessoa";

    }

    public function login($dados){
        $pessoa = new Pessoa;
        $pessoa->login($_REQUEST);
    }
    
}

?>