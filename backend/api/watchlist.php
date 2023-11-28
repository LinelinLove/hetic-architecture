<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER["REQUEST_METHOD"] === "GET") {

    $userId = $_GET["userId"];
    $animeId = $_GET["animeId"];

    require_once('../Config/DatabaseManager.php');
    $db = \App\Config\DatabaseManager::getDB();

    $sql = "SELECT status FROM watchlist WHERE user_id = :user_id AND anime_id = :anime_id";
    $stmt = $db->prepare($sql);

    $stmt->bindParam(":user_id", $userId);
    $stmt->bindParam(":anime_id", $animeId);

    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode(["status" => "success", "data" => $result]);
    } else {
        echo json_encode(["status" => "error", "message" => "Utilisateur non trouvé"]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $userId = $data['userId'];
    $animeId = $data['animeId'];
    $animeTitle = $data['animeTitle'];
    $status = $data['status'];

    require_once('../Config/DatabaseManager.php');

    try {
        $db = \App\Config\DatabaseManager::getDB();

        if ($status === "") {
            // Si status est vide, supprimer la ligne
            $stmt = $db->prepare('DELETE FROM watchlist WHERE user_id = ? AND anime_id = ?');
            $stmt->execute([$userId, $animeId]);
        } else {
            // Sinon, insérer ou mettre à jour la ligne
            $stmt = $db->prepare('INSERT INTO watchlist (user_id, anime_id, anime_title, status) VALUES (?, ?, ?, ?) 
                                 ON DUPLICATE KEY UPDATE status = VALUES(status)');
            $stmt->execute([$userId, $animeId, $animeTitle, $status]);
        }

        echo json_encode(['status' => 'success', 'message' => $data]);
    } catch (\PDOException $e) {
        error_log('Error updating user data: ' . $e->getMessage());
        echo json_encode(['status' => 'error', 'message' => 'Error updating user data: ' . $e->getMessage()]);
    }
}
