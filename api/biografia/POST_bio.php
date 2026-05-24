<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once __DIR__ . "/../../assets/bd/config_bd.php";

try {

    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input) {
        echo json_encode([
            "status" => "error",
            "message" => "No data received"
        ]);
        exit;
    }

    $nom_bio = $input["nom_bio"] ?? "";
    $mini_bio = $input["mini_bio"] ?? "";
    $detalle_bio = $input["detalle_bio"] ?? "";
    $img_bio = $input["img_bio"] ?? "";

    if ($nom_bio == "" || $mini_bio == "" || $detalle_bio == "" || $img_bio == "") {
        echo json_encode([
            "status" => "error",
            "message" => "Campos incompletos"
        ]);
        exit;
    }

    // 👉 desactivar anteriores (soft delete real)
    $conn->query("UPDATE perfil SET activo = 0");

    // 👉 insertar nueva bio activa
    $sql = "INSERT INTO perfil (nom_bio, mini_bio, detalle_bio, img_bio, activo)
            VALUES (?, ?, ?, ?, 1)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $nom_bio, $mini_bio, $detalle_bio, $img_bio);

    $stmt->execute();

    echo json_encode([
        "status" => "success",
        "message" => "Biografía guardada correctamente"
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}