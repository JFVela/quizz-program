<?php
// backend/api/register.php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // En producción, restringe el origen
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require 'conexion.php';
// Aquí podrías incluir enviarCorreo.php si vas a enviar el correo

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "Entrada JSON inválida."]);
    exit;
}

$email    = isset($data['email']) ? $data['email'] : "";
$username = isset($data['username']) ? $data['username'] : "";
$password = isset($data['password']) ? $data['password'] : "";
$pais     = isset($data['pais']) ? $data['pais'] : "";

if (empty($email) || empty($username) || empty($password) || empty($pais)) {
    http_response_code(400);
    echo json_encode(["error" => "Faltan datos requeridos."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Formato de email inválido."]);
    exit;
}

$password_hash = password_hash($password, PASSWORD_BCRYPT);
$token = bin2hex(random_bytes(32));

$stmt = $conn->prepare("INSERT INTO usuarios (email, username, password_hash, pais, puntaje_total, tiempo_segundos, verificado, token_verificacion) VALUES (?, ?, ?, ?, 0, 0, 0, ?)");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Error en la base de datos: " . $conn->error]);
    exit;
}

$stmt->bind_param("sssss", $email, $username, $password_hash, $pais, $token);

if ($stmt->execute()) {
    // Aquí se puede enviar el correo de verificación
    echo json_encode(["success" => "Registro exitoso. Revisa tu correo para confirmar tu cuenta."]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Error al registrar: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
