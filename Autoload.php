<?php

class Autoload{

    protected $extensao;
    protected $prefixo;
    protected $sufixo;

    #Define o caminho local até a raiz do script
    public function setPath($path){

        set_include_path($path);
        
    }

    #Define a extensão do arquivo a ser exportado
    public function setExtensao($ext){
        $this->extensao='.'.$ext;
    }

    #Define se havera algo a se colocar antes do nome do arquivo
    public function setPrefixo($prefixo){
        $this->prefixo=$prefixo;
    }

    #Define se havera algo a se colocar após o nome do arquivo
    public function setSufixo($sufixo){
        $this->sufixo=$sufixo;
    }

    #Transforma a classe em caminho até o arquivo correspondente
    protected function setFilename($className){
        $className = ltrim($className, DIRECTORY_SEPARATOR);
        $fileName = '';
        $namespace = '';
        if($lastNsPos = strrpos($className,DIRECTORY_SEPARATOR)){
            $namespace = substr($className,0,$lastNsPos);
            $className = substr($className,$lastNsPos+1);
            $className = $this->prefixo.$className.$this->sufixo;
            $fileName =  $namespace.DIRECTORY_SEPARATOR;
        }
        $fileName .=str_replace('_',DIRECTORY_SEPARATOR, $className).$this->extensao;
        return $fileName;
    }

    #Carrega arquivos do Core

    public function loadCore($className){

        $fileName = $this->setFilename($className);
        $fileName = get_include_path().DIRECTORY_SEPARATOR.'App'.DIRECTORY_SEPARATOR.'Core'.DIRECTORY_SEPARATOR.$fileName;

        if(is_readable($fileName)){
            require_once($fileName);
        }

    }

    #Carrega arquivos da Controller
    public function loadController($className){

        $this->sufixo = 'Controller';
        $fileName = $this->setFilename($className);
        $fileName = get_include_path().DIRECTORY_SEPARATOR.'App'.DIRECTORY_SEPARATOR.'Controller'.DIRECTORY_SEPARATOR.$fileName;

        if(is_readable($fileName)){
            require_once($fileName);
        }
    }

    #Carrega os módulos da aplicação
    public function loadModel($className){

        $fileName = $this->setFilename($className);
        $fileName = get_include_path().DIRECTORY_SEPARATOR.'App'.DIRECTORY_SEPARATOR.'Model'.DIRECTORY_SEPARATOR.$fileName;

        if(is_readable($fileName)){
            require_once($fileName);
        }
    }

    #Carrega o arquivo de conexão com banco
    public function loadConexao($className){

        $fileName = $this->setFilename($className);
        $fileName = get_include_path().DIRECTORY_SEPARATOR.'lib'.DIRECTORY_SEPARATOR.'Database'.DIRECTORY_SEPARATOR.$fileName;

        if(is_readable($fileName)){
            require_once($fileName);
        }
    }  
    
    #Carrega outros arquivos
    public function load($className){
        $fileName = $this->setFilename($className);
        $fileName = get_include_path().DIRECTORY_SEPARATOR.$fileName;

        if(is_readable($fileName)){
            require_once($fileName);
        }else{
            echo $fileName.' não encontrado!';

            echo '<pre>';
                var_dump(debug_backtrace());
            echo '</pre>';
            exit;
        }   
    }


}

?>