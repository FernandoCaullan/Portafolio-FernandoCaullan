<?php
header("Content-Type: application/json");
require_once "../../assets/bd/config_bd.php";

$input = json_decode(file_get_contents("php://input"), true);

$id = $input["id"] ?? null;

if (!$id) {
    echo json_encode(["status" => "error", "message" => "ID requerido"]);
    exit;
}

$sql = "DELETE FROM skils WHERE id = $id";

if ($conn->query($sql)) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}