<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");

require_once "../../config/config_db.php";

try {

    // Leer datos enviados en PUT
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        echo json_encode([
            "status" => "error",
            "message" => "No se recibieron datos"
        ]);
        exit;
    }

    $nom_bio = $data['nom_bio'] ?? null;
    $mini_bio = $data['mini_bio'] ?? null;
    $detalle_bio = $data['detalle_bio'] ?? null;
    $img_bio = $data['img_bio'] ?? null;

    // Validación mínima
    if (!$nom_bio || !$mini_bio || !$detalle_bio || !$img_bio) {
        echo json_encode([
            "status" => "error",
            "message" => "Faltan campos obligatorios"
        ]);
        exit;
    }

    // Como es CMS de 1 solo registro, usamos id fijo (1)
    $sql = "UPDATE perfil 
            SET nom_bio = :nom_bio,
                mini_bio = :mini_bio,
                detalle_bio = :detalle_bio,
                img_bio = :img_bio
            WHERE id = 1";

    $stmt = $conn->prepare($sql);

    $stmt->bindParam(":nom_bio", $nom_bio);
    $stmt->bindParam(":mini_bio", $mini_bio);
    $stmt->bindParam(":detalle_bio", $detalle_bio);
    $stmt->bindParam(":img_bio", $img_bio);

    $stmt->execute();

    echo json_encode([
        "status" => "success",
        "message" => "Biografía actualizada correctamente"
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}