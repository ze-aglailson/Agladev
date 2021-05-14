<?php

    class Categoria{

        public function listar($parametros = array()){
            if($parametros){
                
                $id = $parametros[0];

                $conn = new Sql();
                $result = $conn->select("SELECT * FROM Categoria WHERE categoriaCod = :CODIGO",array(
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
                $result = $conn->select("SELECT * FROM Categoria ORDER BY  categoriaCod ASC");
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