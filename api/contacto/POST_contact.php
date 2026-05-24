<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once "../../assets/bd/config_bd.php";

try {

    // recibir JSON
    $data = json_decode(file_get_contents("php://input"), true);

    // validar campos
    if (
        empty($data["nom_jefe"]) ||
        empty($data["email"]) ||
        empty($data["dato_importa"]) ||
        empty($data["msg_importa"])
    ) {

        echo json_encode([
            "status" => "error",
            "message" => "Todos los campos son obligatorios"
        ]);

        exit;
    }

    // limpiar datos
    $nom_jefe = trim($data["nom_jefe"]);
    $email = trim($data["email"]);
    $dato_importa = trim($data["dato_importa"]);
    $msg_importa = trim($data["msg_importa"]);

    // insertar
    $stmt = $conn->prepare("
        INSERT INTO llamado
        (nom_jefe, email, dato_importa, msg_importa)
        VALUES (?, ?, ?, ?)
    ");

    $stmt->bind_param(
        "ssss",
        $nom_jefe,
        $email,
        $dato_importa,
        $msg_importa
    );

    $stmt->execute();

    echo json_encode([
        "status" => "success",
        "message" => "Mensaje enviado correctamente"
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}