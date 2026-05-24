<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once "../../assets/bd/config_bd.php";

try {

    $sql = "SELECT id, titulo, descripcion, img_prev, demo_url, github_url 
            FROM trabajos";

    $result = $conn->query($sql);

    $projects = [];

    while ($row = $result->fetch_assoc()) {
        $projects[] = $row;
    }

    echo json_encode([
        "status" => count($projects) > 0 ? "success" : "empty",
        "data" => $projects
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}