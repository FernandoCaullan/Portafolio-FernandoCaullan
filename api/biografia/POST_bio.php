<?php

header("Content-Type: application/json");

require_once "../../config/config_db.php";

try {

    // Leer JSON
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

    // Validación básica
    if (!$nom_bio || !$mini_bio || !$detalle_bio || !$img_bio) {
        echo json_encode([
            "status" => "error",
            "message" => "Faltan campos obligatorios"
        ]);
        exit;
    }

    // Verificar si ya existe perfil
    $check = $conn->prepare("SELECT id FROM perfil WHERE activo = 1 LIMIT 1;");
    $check->execute();
    $exists = $check->fetch(PDO::FETCH_ASSOC);

    if ($exists) {
        echo json_encode([
            "status" => "error",
            "message" => "Ya existe una biografía. Usa PUT para editar."
        ]);
        exit;
    }

    // Insertar biografía
    $sql = "INSERT INTO perfil (nom_bio, mini_bio, detalle_bio, img_bio)
            VALUES (:nom_bio, :mini_bio, :detalle_bio, :img_bio)";

    $stmt = $conn->prepare($sql);

    $stmt->bindParam(":nom_bio", $nom_bio);
    $stmt->bindParam(":mini_bio", $mini_bio);
    $stmt->bindParam(":detalle_bio", $detalle_bio);
    $stmt->bindParam(":img_bio", $img_bio);

    $stmt->execute();

    echo json_encode([
        "status" => "success",
        "message" => "Biografía creada correctamente"
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}