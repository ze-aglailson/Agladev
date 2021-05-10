<?php

    class Categoria{

        public function listar(){

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

?>