<?php
session_start();
class PessoaController{

    public function index(){

        echo "Voce ta na controller de pessoa";

    }

    public function login(){
        
        try{
            
            
            if(isset($_SESSION['logado'])){
                
                
                header('Location:painel/index.php');

                

            }else{
                
                $loader = new \Twig\Loader\FilesystemLoader('App/View');
                $twig = new \Twig\Environment($loader);
                $template = $twig->load('login.html');
                
                //Dados que irão para a view
                $parametros = array();
                $parametros[''] = '';
                
                
                $conteudo = $template->render($parametros);
                echo $conteudo;

            }
        }catch(Exception $e){
            echo $e->getMessage();
        }
    }

    public function logout(){

        session_destroy();
        header("location:index.php");

    }
    
}

?>