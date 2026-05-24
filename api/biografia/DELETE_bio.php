<?php

header("Content-Type: application/json");

require_once "../../config/config_db.php";

try {

    $sql = "UPDATE perfil SET activo = 0 WHERE id = 1";
    $conn->exec($sql);

    echo json_encode([
        "status" => "success",
        "message" => "Biografía desactivada correctamente"
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}