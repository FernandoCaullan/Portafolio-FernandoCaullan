<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once "../../assets/bd/config_bd.php";

try {

    $data = json_decode(file_get_contents("php://input"), true);

    $id = $data["id"] ?? null;
    $titulo = $data["titulo"] ?? null;
    $descripcion = $data["descripcion"] ?? null;
    $img_prev = $data["img_prev"] ?? null;
    $demo_url = $data["demo_url"] ?? null;
    $github_url = $data["github_url"] ?? null;

    if (!$id) {
        echo json_encode([
            "status" => "error",
            "message" => "ID requerido"
        ]);
        exit;
    }

    $stmt = $conn->prepare("
        UPDATE trabajos
        SET titulo = ?, descripcion = ?, img_prev = ?, demo_url = ?, github_url = ?
        WHERE id = ?
    ");

    $stmt->bind_param("sssssi", $titulo, $descripcion, $img_prev, $demo_url, $github_url, $id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Error al actualizar"
        ]);
    }

} catch (Exception $e) {

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}