<?php

    class CategoriaProjeto{

        public function listar(){

            $conn = new Sql();
            $result = $conn->select("SELECT * FROM CategoriaProjeto ORDER BY  categoriaProjetoCod ASC");
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