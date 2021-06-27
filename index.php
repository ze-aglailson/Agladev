<?php

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