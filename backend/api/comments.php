<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER["REQUEST_METHOD"] === "GET") {

    $animeId = $_GET["animeId"];

    require_once('../Config/DatabaseManager.php');
    $db = \App\Config\DatabaseManager::getDB();

    // $sql = "SELECT * FROM comments WHERE anime_id = :anime_id";
    $sql = "SELECT comments.id, user_id, comment, date, anime_title, user.username FROM comments INNER JOIN user ON comments.user_id = user.id WHERE anime_id = :anime_id;";
    $stmt = $db->prepare($sql);

    $stmt->bindParam(":anime_id", $animeId);

    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

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
    $comment = $data['comment'];

    require_once('../Config/DatabaseManager.php');

    try {
        $db = \App\Config\DatabaseManager::getDB();
        $stmt = $db->prepare('INSERT INTO comments (user_id, anime_id, anime_title, comment) VALUES (?, ?, ?, ?)');
        $stmt->execute([$userId, $animeId, $animeTitle, $comment]);

        echo json_encode(['status' => 'success', 'message' => $data]);
    } catch (\PDOException $e) {
        error_log('Error updating user data: ' . $e->getMessage());

        echo json_encode(['status' => 'error', 'message' => 'Error updating user data: ' . $e->getMessage()]);
    }
}

// if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
//     $data = json_decode(file_get_contents('php://input'), true);

//     $userId = $data['userId'];
//     $animeId = $data['animeId'];

//     require_once('../Config/DatabaseManager.php');

//     try {
//         $db = \App\Config\DatabaseManager::getDB();
//         $stmt = $db->prepare('DELETE FROM list_favorite WHERE user_id = ? AND anime_id = ?');
//         $stmt->execute([$userId, $animeId]);

//         echo json_encode(['status' => 'success', 'message' => 'Record deleted successfully']);
//     } catch (\PDOException $e) {
//         error_log('Error deleting record: ' . $e->getMessage());

//         echo json_encode(['status' => 'error', 'message' => 'Error deleting record: ' . $e->getMessage()]);
//     }
// }
