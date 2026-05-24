<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once "../../assets/bd/config_bd.php";

try {

    $data = json_decode(file_get_contents("php://input"), true);

    if (
        !isset($data['id']) ||
        !isset($data['nom_Tec']) ||
        !isset($data['porcentaje'])
    ) {

        echo json_encode([
            "status" => "error",
            "message" => "Faltan datos requeridos"
        ]);

        exit;
    }

    $id = intval($data['id']);
    $nom_Tec = trim($data['nom_Tec']);
    $porcentaje = intval($data['porcentaje']);
    $img_icono = $data['img_icono'] ?? null;

    $sql = "UPDATE dominiotec 
            SET 
                nom_Tec = ?, 
                porcentaje = ?, 
                img_icono = ?
            WHERE id = ?";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param(
        "sisi",
        $nom_Tec,
        $porcentaje,
        $img_icono,
        $id
    );

    if ($stmt->execute()) {

        echo json_encode([
            "status" => "success",
            "message" => "Tecnología actualizada correctamente"
        ]);

    } else {

        echo json_encode([
            "status" => "error",
            "message" => "No se pudo actualizar"
        ]);
    }

} catch (Exception $e) {

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}