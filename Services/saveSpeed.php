<?php
/**
 * Created by PhpStorm.
 * User: Gavin
 * Date: 2/25/16
 * Time: 8:38 PM
 */
header('Content-type: application/json');


require '../Classes/Speed.php';

//prevents json script hijacking
echo ")]}'\n";

$currentSpeed = $_GET['currentSpeed'];

$result = Speed::saveSpeed($currentSpeed);

echo json_encode($result);