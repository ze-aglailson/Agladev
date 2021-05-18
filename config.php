<?php

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
    })

?>