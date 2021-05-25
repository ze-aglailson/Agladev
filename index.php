<?php

/*     require_once('App/Core/Core.php');
    require_once('lib/Database/Conexao.php');
    require_once('App/Controller/HomeController.php');
    require_once('App/Controller/PessoaController.php');
    require_once('App/Controller/ErroController.php');
    require_once('App/Model/Padrao.php');
    require_once('App/Model/Pessoa.php'); */
    require_once('config.php');
    require_once('vendor/autoload.php');
    


    $template = file_get_contents('App/Template/estrutura.html');
    ob_start();
    $teste = new Core;
    $teste->start($_GET);

    $saida = ob_get_contents();

    ob_end_clean();

    $templatePronto = str_replace('{{area_dinamica}}',$saida,$template);

    echo $templatePronto;


?>