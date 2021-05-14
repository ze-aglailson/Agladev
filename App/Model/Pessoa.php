<?php
    class Pessoa{


        public function listar($parametros = array()){
            if($parametros){
                
                $id = $parametros[0];

                $conn = new Sql();
                $result = $conn->select("SELECT * FROM Pessoa WHERE pessoaCod = :CODIGO",array(
                    'CODIGO'=>$id
                ));
                $dados = array();
                while($linha = $result->fetchAll(PDO::FETCH_ASSOC)){
                    $dados[] = $linha;
                }
                
                if(!$dados){
                    throw new Exception("Nenhuma categoria de produto cadastrada"); 
                }
                
                return $dados;

            }else{

                $conn = new Sql();
                $result = $conn->select("SELECT * FROM Pessoa ORDER BY  pessoaCod ASC");
                $dados = array();
                
                while($linha = $result->fetchAll(PDO::FETCH_ASSOC)){
                    $dados[] = $linha;
                }
                
                if(!$dados){
                    throw new Exception("Nenhuma categoria de produto cadastrada"); 
                }
                
                return $dados;
            }
        }
    }


?>