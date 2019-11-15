<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'vendor/autoload.php';

ob_start();

if(isset($_POST['sess'])){
	session_id($_POST['sess']);
	session_start();
}else{
	session_start();
}

if($_SERVER['HTTP_HOST'] == 'localhost' || $_SERVER['HTTP_HOST'] == 'localhost:8080' || $_SERVER['HTTP_HOST'] == 'localhost:8081' || $_SERVER['HTTP_HOST'] == 'localhost:8082'){
	$servername = "localhost";
	$username = "root";
	$password = "";
}

try {
    $conn = new PDO("mysql:host=$servername;dbname=db_crypto_asset", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e)
{
	echo "Connection failed: " . $e->getMessage();
}
?>