<?php
    class Projeto extends Padrao{
        
        public function listaTodos(){
            
            $result = $this->select('SELECT * FROM Projeto ORDER BY projetoCod ASC');

            return $result;

        }
 

       
    }




?>