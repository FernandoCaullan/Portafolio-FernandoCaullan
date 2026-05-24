<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once "../../assets/bd/config_bd.php";

try {

    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['id'])) {

        echo json_encode([
            "status" => "error",
            "message" => "ID requerido"
        ]);

        exit;
    }

    $id = intval($data['id']);

    $sql = "DELETE FROM dominiotec WHERE id = ?";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {

        echo json_encode([
            "status" => "success",
            "message" => "Tecnología eliminada correctamente"
        ]);

    } else {

        echo json_encode([
            "status" => "error",
            "message" => "No se pudo eliminar"
        ]);
    }

} catch (Exception $e) {

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}