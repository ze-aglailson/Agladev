<?php

class Sql extends PDO{

    private $conn;

    public function __construct()
    {
        $dbdriver = 'mysql';
        $dbhost = '162.241.2.193';
        $dbname = 'ipuaon59_agladev';
        $dbuser = 'ipuaon59_admin';
        $dbpassword = '#jJ1234567891011';

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

}

?>