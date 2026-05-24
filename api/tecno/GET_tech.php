<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once "../../assets/bd/config_bd.php";

try {

    $sql = "SELECT id, nom_Tec, porcentaje, img_icono 
            FROM dominiotec";

    $result = $conn->query($sql);

    $tech = [];

    while ($row = $result->fetch_assoc()) {
        $tech[] = $row;
    }

    echo json_encode([
        "status" => count($tech) > 0 ? "success" : "empty",
        "data" => $tech
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}