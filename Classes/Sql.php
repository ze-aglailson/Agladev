<?php

class Sql extends PDO{

    private $conn;

    public function __construct()
    {
        $dbdriver = 'mysql';
        $dbhost = '127.0.0.1';
        $dbname = 'agladev';
        $dbuser = 'root';
        $dbpassword = '2909';

        $this->conn = new PDO("$dbdriver:host=$dbhost; dbname=$dbname", $dbuser,$dbpassword);
    }

    public function setParam($statement, $key, $value){

        $statement->bindParam($key, $value);

    }

    public function setParams($statement, $parameters = array()){

        foreach ($parameters as $key => $value) {
            $this->setParam($statement, $key, $value);
        }

    }

    public function query($rawQuery, $params = array()){

        $stmt = $this->conn->prepare($rawQuery);

        $this->setParams($stmt, $params);

        $stmt->execute();

        return $stmt;

    }

    public function select($rawQuery, $params = array()){
        $stmt = $this->query($rawQuery, $params);
        return $stmt;
    }

}

?>