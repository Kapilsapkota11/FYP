<?php
// Include the database configuration file
include("dbconfig.php"); // Ensure dbconfig.php contains the correct database connection

// Set header to return JSON response
header('Content-Type: application/json');

// Ensure database connection is established
if (!$conn) {
    die(json_encode(["message" => "Database connection failed.", "error" => mysqli_connect_error()]));
}

// Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get values from POST request
    $title       = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $state       = $_POST['state'] ?? '';
    $price       = $_POST['price'] ?? '';
    $created_at  = $_POST['created_at'] ?? date('Y-m-d H:i:s'); // Default to current timestamp if not provided
    $condition   = $_POST['condition'] ?? '';
    // $user_id     = $_POST['user_id'] ?? '';

    // Validate required fields
    if (empty($title) || empty($description) || empty($state) || empty($price) ) {
        echo json_encode(["message" => "Please fill in all required fields."]);
        exit;
    }

    // Validate user_id (foreign key constraint)
    // $userCheckSql = "SELECT user_id FROM users WHERE user_id = ?";
    // if ($userCheckStmt = $conn->prepare($userCheckSql)) {
    //     $userCheckStmt->bind_param("i", $user_id);
    //     $userCheckStmt->execute();
    //     $userCheckStmt->store_result();

    //     // If no user exists with the provided user_id, return an error
    //     if ($userCheckStmt->num_rows === 0) {
    //         echo json_encode(["message" => "Error: Invalid user_id. User does not exist."]);
    //         exit;
    //     }
    //     $userCheckStmt->close();
    // } else {
    //     echo json_encode(["message" => "Error: Could not validate user_id.", "error" => $conn->error]);
    //     exit;
    // }

    // Define the target directory
    $targetDir = "Boats/";

    // Ensure the target directory exists
    if (!is_dir($targetDir)) {
        if (!mkdir($targetDir, 0777, true) && !is_dir($targetDir)) {
            die(json_encode(["message" => "Error: Unable to create directory $targetDir."]));
        }
    }

    // File upload process
    $image = ''; // Default empty
    if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
        // Generate a unique file name
        $fileName   = time() . "_" . basename($_FILES["image"]["name"]);
        $targetFile = $targetDir . $fileName;

        // Attempt to move the uploaded file to the target directory
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
            $image = $fileName; // Store the file name (or full path if needed)
        } else {
            echo json_encode(["message" => "Error uploading file."]);
            exit;
        }
    } else {
        // If no file is uploaded, set a default image or use an existing one
        $image = $_POST['image'] ?? 'default.png'; 
    }

    // SQL query using placeholders (Fixed: `condition` wrapped in backticks)
    $sql = "INSERT INTO boats (title, description, state, price, created_at, image, `condition`) 
            VALUES (?, ?, ?, ?, ?, ?, ?)";

    // Prepare the statement
    if ($stmt = $conn->prepare($sql)) {
        // Bind parameters as strings
        $stmt->bind_param("ssssssi", $title, $description, $state, $price, $created_at, $image, $condition);

        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(["message" => "Boat added successfully."]);
        } else {
            echo json_encode(["message" => "Error: Could not execute the query.", "error" => $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(["message" => "Error: Could not prepare the query.", "error" => $conn->error]);
    }

    // Close the database connection
    $conn->close();

} else {
    echo json_encode(["message" => "Invalid request method. Please use POST."]);
}