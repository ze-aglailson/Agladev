<?php

    spl_autoload_register(function($className){

        $dir = "../../Classes";
        $filename = $dir.DIRECTORY_SEPARATOR.$className.".php";
        $filename = str_replace('\\','/', $filename);

        if(file_exists($filename)){

            require_once($filename);

        }

    })

?>