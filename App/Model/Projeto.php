<?php
    class Projeto extends Padrao{
        
        public function listar(){
            
            $resultado = $this->select('SELECT * FROM Projeto ORDER BY projetoCod');

            return $resultado;

        }
 

       
    }




?>