<?php

require_once('App/Model/Funcionario.php');

    $f = new Funcionario;
    $f->setPessoaNome('Erick');
    $f->setPessoaSobrenome('Abrante');
    $f->setPessoaEmail('ta@gmail.com');
    $f->setPessoaSenha('tobias');
    $f->setPessoaImagem('img/user/tobias.jpg');
    $f->setFuncionarioCargo(1);
    $f->setFuncionarioSetor(1);

    //echo $f->Cadastro();
   
    $f->login('ag@gmail.com', 'alex');

    echo $f;



?>