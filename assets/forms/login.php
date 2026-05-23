<?php
session_start();

include "../bd/config_bd.php";

// evitar errores si no viene del form
if (!isset($_POST['user']) || !isset($_POST['pass'])) {
    header("Location: ../index.php");
    exit;
}

$user = $_POST['user'];
$pass = $_POST['pass'];

$sql = "SELECT * FROM usuario WHERE nombre='$user' AND pasword='$pass'";
$result = $conn->query($sql);

if ($result && $result->num_rows == 1) {

    $row = $result->fetch_assoc();

    $_SESSION['admin'] = true;
    $_SESSION['user'] = $row['nombre'];

    header("Location: ../../dashboard.php");
    exit;

} else {
    echo "Usuario o contraseña incorrectos";
}
?>