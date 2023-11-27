<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER["REQUEST_METHOD"] === "GET") {

    $userId = $_GET["userId"];

    require_once('../Config/DatabaseManager.php');
    $db = \App\Config\DatabaseManager::getDB();

    // $sql = "SELECT anime_title, anime_id, COUNT(*) AS total_comments FROM comments WHERE user_id = :user_id GROUP BY anime_id ORDER BY `comments`.`anime_title` ASC;";
    $sql = "SELECT comment, date, anime_title, comments.anime_id FROM comments INNER JOIN user on user.id = comments.user_id WHERE user_id = :user_id";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(":user_id", $userId);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode(["status" => "success", "data" => $result]);
    } else {
        echo json_encode(["status" => "error", "message" => "Utilisateur non trouvé"]);
    }
}
