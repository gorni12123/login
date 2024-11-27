<?php
header('Content-Type: application/json');

$conn = new mysqli('localhost', 'root', '', 'auth_demo');

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

$data = json_decode(file_get_contents('php://input'), true);
$username = $conn->real_escape_string($data['username']);
$password = password_hash($data['password'], PASSWORD_BCRYPT);

$result = $conn->query("SELECT * FROM users WHERE username='$username'");
if ($result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Username already exists']);
} else {
    $conn->query("INSERT INTO users (username, password) VALUES ('$username', '$password')");
    echo json_encode(['success' => true, 'message' => 'Registration successful']);
}
$conn->close();
?>
