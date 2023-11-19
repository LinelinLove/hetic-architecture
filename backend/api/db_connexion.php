<?php
// api.php
header('Access-Control-Allow-Origin: *');

require_once('../Config/DatabaseManager.php');

// Vérifie la connexion à la base de données
try {
    $db = \App\Config\DatabaseManager::getDB();
    $response = ['status' => 'success', 'message' => 'Database connection successful'];
} catch (\PDOException $e) {
    $response = ['status' => 'error', 'message' => 'Database connection failed: ' . $e->getMessage()];
}

header('Content-Type: application/json');

echo json_encode($response);
