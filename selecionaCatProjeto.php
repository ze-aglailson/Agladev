<?php
    header('Content-type: application/json'); //A PAGINA É CONVERTIDA PARA JSON E RECEBIDA PELO JS

    $pdo = new PDO('mysql:host=127.0.0.1; dbname=agladev;' ,'root','2909');

    $stmt = $pdo->prepare("SELECT * FROM CategoriaProjeto");
    $stmt->execute();

    if($stmt->rowCount()>=1){
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }else{
        echo json_encode("Falha ao buscar ");
    }
?>