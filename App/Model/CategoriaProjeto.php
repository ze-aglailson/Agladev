<?php

    class CategoriaProjeto extends Padrao{

        public function listar(){

            $resultado = $this->select("SELECT * FROM CategoriaProjeto ORDER BY  categoriaProjetoCod ASC");

            if(!$resultado){
                throw new Exception("Nenhuma categoria de produto cadastrada"); 
            }

            return $resultado;
        }

    }

?>