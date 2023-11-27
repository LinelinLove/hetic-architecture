<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER["REQUEST_METHOD"] === "GET") {

    $animeId = $_GET["animeId"];

    require_once('../Config/DatabaseManager.php');
    $db = \App\Config\DatabaseManager::getDB();

    // $sql = "SELECT anime_title, anime_id, COUNT(*) AS total_comments FROM comments WHERE user_id = :user_id GROUP BY anime_id ORDER BY `comments`.`anime_title` ASC;";
    $sql = "SELECT ROUND(AVG(note), 2) as note_general, COUNT(note) as nb FROM note WHERE anime_id = :anime_id;";
    $stmt = $db->prepare($sql);
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
    $note = $data['note'];

    require_once('../Config/DatabaseManager.php');

    try {
        $db = \App\Config\DatabaseManager::getDB();
        $stmt = $db->prepare('INSERT INTO note (user_id, anime_id, anime_title, note) VALUES (?, ?, ?, ?) 
                             ON DUPLICATE KEY UPDATE note = VALUES(note)');
        $stmt->execute([$userId, $animeId, $animeTitle, $note]);

        echo json_encode(['status' => 'success', 'message' => $data]);
    } catch (\PDOException $e) {
        error_log('Error updating user data: ' . $e->getMessage());
        echo json_encode(['status' => 'error', 'message' => 'Error updating user data: ' . $e->getMessage()]);
    }
}
