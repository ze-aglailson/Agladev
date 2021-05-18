<?php
    require_once('Conexao.php');
    
    $con = new Conexao;
    $stmt = $con->conectar()->prepare("SELECT * FROM Pessoa");
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);

   /*  $stmt = $con->prepare('SELECT * FROM Pessoa ORDER BY pessoaCod DESC');
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result) */

?>