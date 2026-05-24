<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once "../../assets/bd/config_bd.php";

try {

    $id = $_GET["id"] ?? null;

    if (!$id) {
        echo json_encode([
            "status" => "error",
            "message" => "ID requerido"
        ]);
        exit;
    }

    $stmt = $conn->prepare("
        SELECT id, titulo, descripcion, img_prev, demo_url, github_url
        FROM trabajos
        WHERE id = ?
    ");

    $stmt->bind_param("i", $id);
    $stmt->execute();

    $result = $stmt->get_result();
    $data = $result->fetch_assoc();

    if (!$data) {
        echo json_encode([
            "status" => "error",
            "message" => "No encontrado"
        ]);
        exit;
    }

    echo json_encode([
        "status" => "success",
        "data" => $data
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}