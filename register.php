<?php
include("dbconfig.php"); // Ensure the file name is correct

// Validate required fields
if (!isset($_POST['email'], $_POST['full_name'], $_POST['password'], $_POST['phone'])) {
    echo json_encode(["success" => false, "message" => "Email, name, and password are required!"]);
    die();
}

$email = $_POST['email'];
$name = $_POST['full_name'];
$password = $_POST['password'];
$phone = $_POST['phone'];

// Check if email already exists
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$count = mysqli_num_rows($result);

if ($count > 0) {
    echo json_encode(["success" => false, "message" => "Email already exists!"]);
    die();
}

// Encrypt the password
$encrypted_password = password_hash($password, PASSWORD_DEFAULT);

// Insert user data
$sql = "INSERT INTO users (full_name, email, password, phone) VALUES (?, ?, ?, ?)";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $encrypted_password, $phone);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["success" => true, "message" => "Registration successful!"]);
} else {
    echo json_encode(["success" => false, "message" => "Registration failed!"]);
}

// Close connection
mysqli_close($conn);
?>
