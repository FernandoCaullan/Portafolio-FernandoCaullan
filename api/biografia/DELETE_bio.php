<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once __DIR__ . "/../../assets/bd/config_bd.php";

try {

    // 👉 soft delete: desactivar biografía activa
    $sql = "UPDATE perfil SET activo = 0 WHERE activo = 1";

    $result = $conn->query($sql);

    if (!$result) {
        throw new Exception($conn->error);
    }

    echo json_encode([
        "status" => "success",
        "message" => "Biografía desactivada correctamente"
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}