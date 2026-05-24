<?php
session_start();
include "../bd/config_bd.php";

header('Content-Type: application/json');

$user = $_POST['user'] ?? '';
$pass = $_POST['pass'] ?? '';

$sql = "SELECT * FROM usuario WHERE nombre = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $user);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows == 1) {

    $row = $result->fetch_assoc();

    if ($pass === $row['pasword']) {

        $_SESSION['admin'] = true;
        $_SESSION['user'] = $row['nombre'];

        echo json_encode(["status" => "ok"]);
        exit;
    }
}

echo json_encode(["status" => "error"]);
exit;
?>