<?php

/**
 * Created by PhpStorm.
 * User: Gavin
 * Date: 1/30/16
 * Time: 11:41 PM
 */
require_once '../config.php';


class Speed
{
    public function __construct() {

    }

    public static function saveSpeed($currentSpeed) {
        $db = Database::getInstance();
        $query = "INSERT
                  INTO Speed
                  VALUES(NULL, ?)";
        $params = array('');
        $params[0] .= "s";
        array_push($params, $currentSpeed);

        $db->query_with_params($query, $params);

        return $currentSpeed . " saved.";

    }


}