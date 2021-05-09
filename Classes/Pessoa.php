<?php
    class Pessoa{


        public function listar(){
            $conn = new Sql();
            $result = $conn->select("SELECT * FROM Pessoa ORDER BY  pessoaCod ASC");
            $dados = array();

            while($linha = $result->fetchAll(PDO::FETCH_ASSOC)){
                $dados[] = $linha;
            }

            if(!$dados){
                throw new Exception("Nenhuma pessoa cadastrada"); 
            }

            return $dados;
        }
    }


?>