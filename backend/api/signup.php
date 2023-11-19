<?php
// api/register.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérez les données du formulaire
    // $username = $_POST['username'];
    // $email = $_POST['email'];
    // $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
    $data = json_decode(file_get_contents('php://input'), true);
    error_log('Received data: ' . print_r($data, true));
    $username = $data['username'];
    $email = $data['email'];
    $password = password_hash($data['password'], PASSWORD_BCRYPT);

    error_log('Username: ' . $username);
    error_log('Email: ' . $email);

    // Validez les données (effectuez toutes les validations nécessaires)

    // Insérez les données dans la base de données
    require_once('../Config/DatabaseManager.php');

    try {
        $db = \App\Config\DatabaseManager::getDB();

        $stmt = $db->prepare('INSERT INTO user (username, mail, pwd) VALUES (?, ?, ?)');
        $stmt->execute([$username, $email, $password]);

        error_log('User registered successfully');

        echo json_encode(['status' => 'success', 'message' => 'User registered successfully']);
    } catch (\PDOException $e) {
        error_log('Error registering user: ' . $e->getMessage());

        echo json_encode(['status' => 'error', 'message' => 'Error registering user: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
