<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once "../../assets/bd/config_bd.php";

try {

    $data = json_decode(file_get_contents("php://input"), true);

    $titulo = $data["titulo"] ?? null;
    $descripcion = $data["descripcion"] ?? null;
    $img_prev = $data["img_prev"] ?? null;
    $demo_url = $data["demo_url"] ?? null;
    $github_url = $data["github_url"] ?? null;

    if (!$titulo || !$descripcion) {
        echo json_encode([
            "status" => "error",
            "message" => "Datos incompletos"
        ]);
        exit;
    }

    $stmt = $conn->prepare("
        INSERT INTO trabajos (titulo, descripcion, img_prev, demo_url, github_url)
        VALUES (?, ?, ?, ?, ?)
    ");

    $stmt->bind_param("sssss", $titulo, $descripcion, $img_prev, $demo_url, $github_url);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Error al insertar"
        ]);
    }

} catch (Exception $e) {

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}