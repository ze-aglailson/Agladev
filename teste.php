<?php

require_once("config.php");


    $f = new Cliente();
    $f->setPessoaNome('José');
    $f->setPessoaSobrenome('Aglailson');
    $f->setPessoaEmail('jaglailson1@gmail.com');
    $f->setPessoaSenha('aglailson');
    $f->setPessoaImagem('img/user/funcionario/ja.jpg');
    $f->setClienteNomeFantasia('testes');

    
    
   
    $f->login('rs@gmail.com', 'roberto');

    echo $f;

?>