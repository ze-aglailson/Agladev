<?php

class PessoaController{

    public function index(){

        try{
            $pessoa = new Pessoa;
            $listaPessoas = $pessoa->listaTodos();
            $loader = new \Twig\Loader\FilesystemLoader('App/View');
            $twig = new \Twig\Environment($loader);
            $template = $twig->load('home.html');

            //Dados que irão para a view
            $parametros = array();
            $parametros['pessoas'] = $listaPessoas;

            $conteudo = $template->render($parametros);
            echo $conteudo;

        }catch(Exception $e){
            echo $e->getMessage();
        }


    }

    public function login($dados){
        $pessoa = new Pessoa;
        $pessoa->login($_REQUEST);
    }
    
}

?>