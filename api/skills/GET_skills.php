<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once "../../assets/bd/config_bd.php";

try {

    $sql = "SELECT id, nom_skill, img_icono FROM skils";
    $result = $conn->query($sql);

    $skills = [];

    while ($row = $result->fetch_assoc()) {
        $skills[] = $row;
    }

    echo json_encode([
        "status" => count($skills) > 0 ? "success" : "empty",
        "data" => $skills
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}