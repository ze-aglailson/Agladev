<?php
require_once("App/Controller/PessoaController.php");
require_once("App/Model/Padrao.php");
require_once("App/Model/Pessoa.php");

    header('Content-Type: application/json');
    
    if(isset($_POST)){
        
        $email = isset($_POST['email'])?$_POST['email']:"";
        $senha = isset($_POST['senha'])?$_POST['senha']:"";

        $pessoa = new Pessoa;
        $login = $pessoa->login($email,$senha);

        if($login['login']){

            $_SESSION['logado'] = true;
            $_SESSION['codigo'] = $pessoa->getPessoaCod();
            $_SESSION['nome'] = $pessoa->getPessoaNome()." ".$pessoa->getPessoaSobrenome();
            $_SESSION['email'] = $pessoa->getPessoaEmail();
            $_SESSION['dataCadastro'] = $pessoa->getPessoadataCadastro();
            $_SESSION['imagem'] = $pessoa->getPessoaImagem();
            

        }

        echo json_encode(array(
            "email"=>$email,
            "senha"=>$senha,
            "login"=>array(
                "status"=>$login['login'],
                "mensagem"=>$login['mensagem']
            )
        ));

    }
        
    
?>