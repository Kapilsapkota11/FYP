<?php
include("dbconfig.php"); // Ensure the file name is correct

// Validate required fields
if (!isset($_POST['email'], $_POST['password'])) {
    echo json_encode(["success" => false, "message" => "Email and password are required!"]);
    die();
}

$email = $_POST['email'];
$password = $_POST['password'];

// Fetch user data by email
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($user = mysqli_fetch_assoc($result)) {
    // Verify password
    if (password_verify($password, $user['password'])) {
        echo json_encode(["success" => true, "message" => "Login successful!", "user" => $user]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid password!"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Email not found!"]);
}

// Close connection
mysqli_close($conn);
?>
