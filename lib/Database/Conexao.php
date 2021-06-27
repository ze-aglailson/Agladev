<?php
class Conexao extends PDO{
   //Conexao padrão singleton
   private static $conn;

   public function __construct()
   {
      $con_dev = array(
         'driver'=>'mysql',
         'host'=>'127.0.0.1',
         'dbname'=>'agladev',
         'dbuser'=>'root',
         'password'=>'2909'
      );
      $con_producao = array(
         'driver'=>'mysql',
         'host'=>'162.241.2.193',
         'dbname'=>'ipuaon59_agladev',
         'dbuser'=>'ipuaon59_admin',
         'password'=>'#jJ1234567891011'
      );

      unset($con_dev); //Para mudar para o banco de dev basta comentar essa linha

      $con = isset($con_dev)?$con_dev:$con_producao;

      //informação do sistema
      $sistema_titulo = "AglaDev";
      $sistema_email = "jaglailson1@gmail.com";

      try{
         self::$conn = new PDO("{$con['driver']}:host={$con['host']}; dbname={$con['dbname']};", $con['dbuser'], $con['password']);
         self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
         self::$conn->exec('SET NAMES utf8');

      }catch(Exception $e){
         $headers = array(
            'From'=>'jaglailson1@gmail.com',
            'Reply-to'=>'jaglailson1@gmail.com',
            'X-Mailer'=>'PHP/'. phpversion()
         );
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