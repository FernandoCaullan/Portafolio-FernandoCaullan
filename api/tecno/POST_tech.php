<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once "../../assets/bd/config_bd.php";

try {

    $data = json_decode(file_get_contents("php://input"), true);

    $nom_Tec = $data["nom_Tec"] ?? null;
    $porcentaje = $data["porcentaje"] ?? null;
    $img_icono = $data["img_icono"] ?? null;

    if (!$nom_Tec || !$porcentaje) {
        echo json_encode([
            "status" => "error",
            "message" => "Datos incompletos"
        ]);
        exit;
    }

    $stmt = $conn->prepare("
        INSERT INTO dominiotec (nom_Tec, porcentaje, img_icono)
        VALUES (?, ?, ?)
    ");

    $stmt->bind_param("sis", $nom_Tec, $porcentaje, $img_icono);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success"
        ]);
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