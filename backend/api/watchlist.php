<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $userId = $data['userId'];
    $animeId = $data['animeId'];
    $animeTitle = $data['animeTitle'];
    $status = $data['status'];

    require_once('../Config/DatabaseManager.php');

    try {
        $db = \App\Config\DatabaseManager::getDB();
        $stmt = $db->prepare('INSERT INTO watchlist (user_id, anime_id, anime_title, status) VALUES (?, ?, ?, ?) 
                             ON DUPLICATE KEY UPDATE status = VALUES(status)');
        $stmt->execute([$userId, $animeId, $animeTitle, $status]);

        echo json_encode(['status' => 'success', 'message' => $data]);
    } catch (\PDOException $e) {
        error_log('Error updating user data: ' . $e->getMessage());
        echo json_encode(['status' => 'error', 'message' => 'Error updating user data: ' . $e->getMessage()]);
    }
}
