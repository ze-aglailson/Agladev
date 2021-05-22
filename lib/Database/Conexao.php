<?php
class Conexao extends PDO{
   //Conexao padrão singleton
   private static $conn;

   public function __construct()
   {
      $db_driver = "mysql";
      $db_host = "127.0.0.1";
      $db_name = "agladev";
      $db_user = "root";
      $db_password = "2909";

      //informação do sistema
      $sistema_titulo = "AglaDev";
      $sistema_email = "jaglailson1@gmail.com";

      try{
         self::$conn = new PDO("$db_driver:host=$db_host; dbname=$db_name;", $db_user, $db_password);
         self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
         self::$conn->exec('SET NAMES utf8');

      }catch(Exception $e){
         mail($sistema_email,"PDOException no sistema $sistema_titulo", $e->getMessage());
         die('Connection Error: '. $e->getMessage());
      }

   }

   public static function conectar(){
      if(!self::$conn){
         new Conexao;
      }

      return self::$conn;
   }

}

?>