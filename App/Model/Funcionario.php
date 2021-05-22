<?php
require_once('App/Model/Padrao.php');
require_once('App/Model/Pessoa.php');
class Funcionario extends Pessoa{

    private $cargoCod;
    private $setorCod;

    public function setFuncionarioCargo($codigo){
        $this->cargoCod = $codigo;
    }
    public function getFuncionarioCargo(){
        return $this->cargoCod;
    }

    public function setFuncionarioSetor($codigo){
        $this->setorCod = $codigo;
    }
    public function getFuncionarioSetor(){
        return $this->setorCod;
    }

    public function __toString()
    {
        return json_encode(array(
            "Código"=>$this->getPessoaCod(),
            "Nome"=>$this->getPessoaNome(),
            "Sobrenome"=>$this->getPessoaSobrenome(),
            "Email"=>$this->getPessoaEmail(),
            "Senha"=>$this->getPessoaSenha(),
            "Data cadastro"=>$this->getPessoadataCadastro(),
            "Imagem"=>$this->getPessoaImagem(),
            "Setor"=>$this->getFuncionarioSetor(),
            "Cargo"=>$this->getFuncionarioCargo()
        ));
    }

    public function setaDados($dados){
        $this->setPessoaCod($dados['pessoaCod']);
        $this->setPessoaNome($dados['pessoaNome']);
        $this->setPessoaSobrenome($dados['pessoaSobrenome']);
        $this->setPessoaEmail($dados['pessoaEmail']);
        $this->setPessoaSenha($dados['pessoaSenha']);
        $this->setPessoadataCadastro($dados['pessoaDataCadastro']);
        $this->setPessoaImagem($dados['pessoaImg']);
        $this->setFuncionarioCargo($dados['cargoNome']);
        $this->setFuncionarioSetor($dados['setorNome']);
    }

    public function Cadastro(){

        $resultado = $this->select("CALL sp_funcionario_cadastro(:NOME,:SOBRENOME,:EMAIL,:SENHA,:IMAGEM,:CARGOCOD,:SETORCOD)", array(
            ":NOME"=>$this->getPessoaNome(),
            ":SOBRENOME"=>$this->getPessoaSobrenome(),
            ":EMAIL"=>$this->getPessoaEmail(),
            ":SENHA"=>$this->getPessoaSenha(),
            ":IMAGEM"=>$this->getPessoaImagem(),
            "CARGOCOD"=>$this->getFuncionarioCargo(),
            "SETORCOD"=>$this->getFuncionarioSetor()
        ));

        $result = $resultado[0];
        return $result['resultado'];

    }





}



?>