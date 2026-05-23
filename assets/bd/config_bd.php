<?php

$host = "localhost";
$usuario = "fcaullan";
$password = "FxT82mQp#";
$basedatos = "fcaullan_db1";

$conn = new mysqli($host, $usuario, $password, $basedatos);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

?>