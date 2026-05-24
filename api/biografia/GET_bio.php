<?php

header("Content-Type: application/json");

require_once "../../config/config_db.php";

try {

    $sql = "SELECT * FROM perfil WHERE activo = 1 LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $perfil = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($perfil) {
        echo json_encode([
            "status" => "success",
            "data" => $perfil
        ]);
    } else {
        echo json_encode([
            "status" => "empty",
            "message" => "No hay biografía creada aún"
        ]);
    }

} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}