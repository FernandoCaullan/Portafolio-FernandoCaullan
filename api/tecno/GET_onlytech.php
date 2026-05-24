<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once "../../assets/bd/config_bd.php";

try {

    if (!isset($_GET['id'])) {

        echo json_encode([
            "status" => "error",
            "message" => "ID requerido"
        ]);

        exit;
    }

    $id = intval($_GET['id']);

    $sql = "SELECT 
                id,
                nom_Tec,
                porcentaje,
                img_icono
            FROM dominiotec
            WHERE id = ?";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param("i", $id);

    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {

        $tech = $result->fetch_assoc();

        echo json_encode([
            "status" => "success",
            "data" => $tech
        ]);

    } else {

        echo json_encode([
            "status" => "empty",
            "message" => "Tecnología no encontrada"
        ]);
    }

} catch (Exception $e) {

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}