<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER["REQUEST_METHOD"] === "GET") {

    $userId = $_GET["userId"]; // Assurez-vous de valider et de sécuriser cette valeur
    $animeId = $_GET["animeId"]; // Assurez-vous de valider et de sécuriser cette valeur

    require_once('../Config/DatabaseManager.php');
    $db = \App\Config\DatabaseManager::getDB();

    // Requête SQL avec une validation de base des paramètres
    $sql = "SELECT * FROM list_favorite WHERE user_id = :user_id AND anime_id = :anime_id";
    $stmt = $db->prepare($sql);

    // Valider et lier les paramètres
    $stmt->bindParam(":user_id", $userId);
    $stmt->bindParam(":anime_id", $animeId);

    // Exécutez la requête préparée
    $stmt->execute();

    // Récupérez le résultat de la requête
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

    require_once('../Config/DatabaseManager.php');

    try {
        $db = \App\Config\DatabaseManager::getDB();
        $stmt = $db->prepare('INSERT INTO list_favorite (user_id, anime_id) VALUES (?, ?)');
        $stmt->execute([$userId, $animeId]);

        echo json_encode(['status' => 'success', 'message' => $data]);
    } catch (\PDOException $e) {
        error_log('Error updating user data: ' . $e->getMessage());

        echo json_encode(['status' => 'error', 'message' => 'Error updating user data: ' . $e->getMessage()]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);

    $userId = $data['userId'];
    $animeId = $data['animeId'];

    require_once('../Config/DatabaseManager.php');

    try {
        $db = \App\Config\DatabaseManager::getDB();
        $stmt = $db->prepare('DELETE FROM list_favorite WHERE user_id = ? AND anime_id = ?');
        $stmt->execute([$userId, $animeId]);

        echo json_encode(['status' => 'success', 'message' => 'Record deleted successfully']);
    } catch (\PDOException $e) {
        error_log('Error deleting record: ' . $e->getMessage());

        echo json_encode(['status' => 'error', 'message' => 'Error deleting record: ' . $e->getMessage()]);
    }
}
