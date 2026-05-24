<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once "../../assets/bd/config_bd.php";

try {

    if (!isset($_GET["id"])) {
        echo json_encode([
            "status" => "error",
            "message" => "ID requerido"
        ]);
        exit;
    }

    $id = (int) $_GET["id"];

    $sql = "SELECT id, nom_skill, img_icono FROM skils WHERE id = $id";
    $result = $conn->query($sql);

    if ($result->num_rows === 0) {
        echo json_encode([
            "status" => "error",
            "message" => "No encontrado"
        ]);
        exit;
    }

    echo json_encode([
        "status" => "success",
        "data" => $result->fetch_assoc()
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}