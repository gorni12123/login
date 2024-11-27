<?php
header('Content-Type: application/json');

$conn = new mysqli('localhost', 'root', '', 'auth_demo');

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

$data = json_decode(file_get_contents('php://input'), true);
$username = $conn->real_escape_string($data['username']);
$password = $data['password'];

$result = $conn->query("SELECT * FROM users WHERE username='$username'");
if ($result->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
} else {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        echo json_encode(['success' => true, 'message' => 'Login successful']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
    }
}
$conn->close();
?>
