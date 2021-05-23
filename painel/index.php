<?php
    session_start();
    if(!isset($_SESSION['logado'])){

        header('location:../index.php');

    }

    echo "<a href='../?pagina=pessoa&metodo=logout'>Sair</a>";
    echo "Seja bem vindo ao painel ". $_SESSION['nome'];
  


?>