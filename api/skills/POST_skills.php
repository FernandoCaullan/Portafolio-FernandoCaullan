<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once "../../assets/bd/config_bd.php";

try {

    // 📥 leer JSON del frontend
    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input["nom_skill"]) || !isset($input["img_icono"])) {
        echo json_encode([
            "status" => "error",
            "message" => "Datos incompletos"
        ]);
        exit;
    }

    $nom_skill = $conn->real_escape_string($input["nom_skill"]);
    $img_icono = $conn->real_escape_string($input["img_icono"]);

    $sql = "INSERT INTO skils (nom_skill, img_icono)
            VALUES ('$nom_skill', '$img_icono')";

    if ($conn->query($sql)) {

        echo json_encode([
            "status" => "success",
            "message" => "Skill creada"
        ]);

    } else {

        echo json_encode([
            "status" => "error",
            "message" => $conn->error
        ]);
    }

} catch (Exception $e) {

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}