<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "quizz-program";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
} else {
    echo "Connected successfully";
}
?>
