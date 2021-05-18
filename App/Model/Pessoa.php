<?php
    class Pessoa extends Padrao{
        

        public function listaTodos(){

            $result = $this->select("SELECT * FROM Pessoa ORDER BY pessoaCod ASC");

            return $result;

        }

        public function login($dados){
            echo "Email: ".$dados['email'];
            echo "<br>";
            echo "dados: ".$dados['senha'];

        }

       
    }




?>