<?php
    class Pessoa extends Padrao{
        
        private $pessoaCod;
        private $pessoaNome;
        private $pessoaSobrenome;
        private $pessoaEmail;
        private $pessoaSenha;
        private $pessoadataCadastro;
        private $pessoaImg;

        public function setPessoaCod($codigo){
            $this->pessoaCod = $codigo;
        }
        public function getPessoaCod(){
            return $this->pessoaCod;
        }

        public function setPessoaNome($nome){
            $this->pessoaNome = $nome;
        }
        public function getPessoaNome(){
            return $this->pessoaNome;
        }

        public function setPessoaSobrenome($sobrenome){
            $this->pessoaSobrenome = $sobrenome;
        }
        public function getPessoaSobrenome(){
            return $this->pessoaSobrenome;
        }

        public function setPessoaEmail($email){
            $this->pessoaEmail = $email;
        }
        public function getPessoaEmail(){
            return $this->pessoaEmail;
        }

        public function setPessoaSenha($senha){
            $this->pessoaSenha = password_hash($senha, PASSWORD_DEFAULT);
        }
        public function getPessoaSenha(){
            return $this->pessoaSenha;
        }

        public function setPessoadataCadastro($data){
            $data = new DateTime($data);
            $this->pessoadataCadastro = $data->format("d-m-Y H:i");
        }
        public function getPessoadataCadastro(){
            return $this->pessoadataCadastro;
        }

        public function setPessoaImagem($imagem){
            $this->pessoaImg = $imagem;
        }
        public function getPessoaImagem(){
            return $this->pessoaImg;
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
                "Imagem"=>$this->getPessoaImagem()
            ));
        }

        public function getPasswordHash($email){
            $hash = "";
            $resultado = $this->select("CALL sp_get_hash(:EMAIL)", array(
                ':EMAIL'=>$email
            ));
    
            $result = (bool)$resultado[0]['resultado'];
    
            if($result != false){
                $hash = $resultado[0]['resultado'];
                return $hash;
            }else{
    
                throw new Exception("O email informado não está cadastrado!");
                return false;
                
            }
    
        }

        public function setaDados($dados){
            $this->setPessoaCod($dados['pessoaCod']);
            $this->setPessoaNome($dados['pessoaNome']);
            $this->setPessoaSobrenome($dados['pessoaSobrenome']);
            $this->setPessoaEmail($dados['pessoaEmail']);
            $this->setPessoaSenha($dados['pessoaSenha']);
            $this->setPessoadataCadastro($dados['pessoaDataCadastro']);
            $this->setPessoaImagem($dados['pessoaImg']);
        }

        public function login($email, $senha){
            $result = array(
                'login'=>'',
                'mensagem'=>''
            );
            try{
                $dados = array();
                $hash = $this->getPasswordHash($email);
                if(password_verify($senha, $hash)){
                      
                    $senha = $hash;

                    $resultado = $this->select("CALL sp_pessoa_login(:EMAIL,:SENHA)", array(
                        ':EMAIL'=>$email,
                        ':SENHA'=>$senha
                    ));

                    $dados = $resultado[0];
                    $this->setaDados($dados);
                    
                    $result['login'] = true;
                    $result['mensagem'] = 'Logado com sucesso!';

                }else{

                    $result['login'] = false;
                    $result['mensagem'] = 'Senha incorreta!';

                }

            }catch(Exception $e){
                $result['login'] = false;
                $result['mensagem'] = $e->getMessage();

            }

            return $result;
        }
 

       
    }




?>