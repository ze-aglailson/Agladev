<?php
    $con = new PDO('mysql:host=127.0.0.1; dbname=agladev;', "root", '2909');

    $sql ="SELECT * FROM CategoriaProjeto ORDER BY  categoriaProjetoCod ASC";
    $sql = $con->prepare($sql);
    $sql->execute();
?>