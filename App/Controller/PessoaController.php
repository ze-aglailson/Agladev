<?php

class PessoaController{

    public function index(){

        echo "Voce ta na controller de pessoa";

    }

    public function login($dados){
        
        try{
            $pessoa = new Pessoa;
            $pessoa->login($dados);
            $loader = new \Twig\Loader\FilesystemLoader('App/View');
            $twig = new \Twig\Environment($loader);
            $template = $twig->load('login.html');

            //Dados que irão para a view
            $parametros = array();
            $parametros[''] = '';

            $conteudo = $template->render($parametros);
            echo $conteudo;

        }catch(Exception $e){
            echo $e->getMessage();
        }
    }
    
}

?>