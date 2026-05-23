<?php

$host = "localhost";
$usuario = "fcaullan";
$password = "FxT82mQp#";
$basedatos = "fcaullan_db1";

// Crear conexión
$conn = new mysqli($host, $usuario, $password, $basedatos);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

echo "Conexión exitosa a la base de datos";

#Carga de base de datos y tablas
$sql = file_get_contents("bd.sql");

if ($conn->multi_query($sql)) {
    echo "BD instalada";
}
// Cerrar conexión
$conn->close();

?>