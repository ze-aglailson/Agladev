<?php
require_once('App/Model/Padrao.php');
require_once('App/Model/Pessoa.php');
class Cliente extends Pessoa{

    private $nomeFantasia;

    public function setClienteNomeFantasia($nome){
        $this->nomeFantasia = $nome;
    }
    public function getClienteNomeFantasia(){
        return $this->nomeFantasia;
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
            "Nome Fantasia"=>$this->getClienteNomeFantasia()
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
        $this->setClienteNomeFantasia($dados['clientenomeFantasia']);
    }

    public function Cadastro(){

        $resultado = $this->select("CALL sp_cliente_cadastro(:NOME,:SOBRENOME,:EMAIL,:SENHA,:IMAGEM,:NOMEFANTASIA)", array(
            ":NOME"=>$this->getPessoaNome(),
            ":SOBRENOME"=>$this->getPessoaSobrenome(),
            ":EMAIL"=>$this->getPessoaEmail(),
            ":SENHA"=>$this->getPessoaSenha(),
            ":IMAGEM"=>$this->getPessoaImagem(),
            ":NOMEFANTASIA"=>$this->getClienteNomeFantasia()
        ));

        $result = $resultado[0];
        return $result['resultado'];

    }





}



?>