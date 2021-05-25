<?php

    require_once("Autoload.php");
    define('ROOT', dirname(__FILE__));
    
    $autoload = new Autoload;
    $autoload->setPath(ROOT);
    $autoload->setExtensao('php');

    spl_autoload_register(array($autoload, 'loadCore'));
    spl_autoload_register(array($autoload, 'loadController'));
    spl_autoload_register(array($autoload, 'loadModel'));
    spl_autoload_register(array($autoload, 'loadConexao'));


/* 
    spl_autoload_register(function($className){

        $dirs = array(
            "lib/Database",
            "App/Controller",
            "App/Core",
            "App/Model"
        );

        foreach ($dirs as $dir) {
            $filename = $dir.DIRECTORY_SEPARATOR.$className.".php";
            $filename = str_replace('\\','/', $filename);
            
            if(file_exists($filename)){

                require_once($filename);

            }
        }
    }) */

?>