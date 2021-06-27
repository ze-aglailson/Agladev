<?php
    session_start();
    require_once("../config.php");
    if(!isset($_SESSION['logado'])){

        header('location:../index.php');

    }

    $pessoa = new Pessoa;
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

    <button><a href="../?pagina=pessoa&metodo=logout">Sair</a></button><br>
    <h2>Seja bem vindo ao painel<?php echo " <a href='#'>".$_SESSION['nome'] ."</a>"?></h2>
    
</body>
</html>

<!-- CRIAR UM TEMPLATE PARA O PAINEL DE CONTROLE-->