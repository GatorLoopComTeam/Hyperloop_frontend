<?php
/**
 * Created by PhpStorm.
 * User: Gavin
 * Date: 2/25/16
 * Time: 8:25 PM
 */



class Database
{
    // Store the single instance of Database
    private static $m_pInstance;

    private $db_host='localhost:33333';
    private $db_user = 'gavin';
    private $db_pass = 'password';
    private $db_name = 'gatorloop';
    private static $conn;

    // Private constructor to limit object instantiation to within the class
    private function __construct()
    {
        self::$conn = new mysqli($this->db_host,$this->db_user,$this->db_pass);
        mysqli_select_db(self::$conn, $this->db_name);
    }

    // Getter method for creating/returning the single instance of this class
    public static function getInstance()
    {
        if (!self::$m_pInstance)
        {
            self::$m_pInstance = new Database();
        }
        return self::$m_pInstance;
    }

    public function query($query)
    {
        $stmt = self::$conn->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result;
    }


    public function query_with_params($query, $params) {
        $stmt = self::$conn->prepare($query);
        if($stmt) {
            call_user_func_array(array($stmt, 'bind_param'), self::refValues($params));
            $stmt->execute();
            $result = $stmt->get_result();
            return $result;
        }
        else {
            print("prepare failed");
            print($query);
            return 0;
        }

    }

    private function refValues($arr){
        if (strnatcmp(phpversion(),'5.3') >= 0) //Reference is required for PHP 5.3+
        {
            $refs = array();
            foreach($arr as $key => $value)
                $refs[$key] = &$arr[$key];
            return $refs;
        }
        return $arr;
    }

    public function __destruct()
    {
        self::$conn->close();
    }


}

?>
