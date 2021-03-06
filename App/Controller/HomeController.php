<?php

class HomeController{

    public function index($param){

        try{
            $servico = new Servico;
            $listaServicos = $servico->listaTodos();
            $projeto = new Projeto;
            $listaProjetos = $projeto->listaTodos();
            $loader = new \Twig\Loader\FilesystemLoader('App/View');
            $twig = new \Twig\Environment($loader);
            $template = $twig->load('home.html');

            //Dados que irão para a view
            $parametros = array();
            $parametros['servicos'] = $listaServicos;
            $parametros['projetos'] = $listaProjetos;

            $conteudo = $template->render($parametros);
            echo $conteudo;

        }catch(Exception $e){
            echo $e->getMessage();
        }

    }
    
}

?>