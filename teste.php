<?php

require_once('App/Model/Funcionario.php');
require_once('App/Model/Cliente.php');

    $f = new Funcionario();
    $f->setPessoaNome('José');
    $f->setPessoaSobrenome('Aglailson');
    $f->setPessoaEmail('jaglailson1@gmail.com');
    $f->setPessoaSenha('aglailson');
    $f->setPessoaImagem('img/user/funcionario/ja.jpg');
    $f->setFuncionarioCargo(1);
    $f->setFuncionarioSetor(1);

    /* echo $f->Cadastro(); */
    
   
    $f->login('jaglailson1@gmail.com', 'aglailson');

    echo $f;



?>