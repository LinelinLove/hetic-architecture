<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    // Obtenez les données de l'utilisateur en fonction de son ID ou autre identifiant
    $uidFirebase = $_GET["userId"]; // Assurez-vous de valider et de sécuriser cette valeur

    // Exécutez une requête SQL pour obtenir les informations de l'utilisateur
    require_once('../Config/DatabaseManager.php');
    $db = \App\Config\DatabaseManager::getDB();

    $sql = "SELECT * FROM user WHERE uid_firebase = :uid_firebase";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(":uid_firebase", $uidFirebase);
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

    //     error_log('Received data: ' . print_r($data, true));

    $userId = $data['userId'];
    $lastname = $data['lastname'];
    $firstname = $data['firstname'];
    $telephone = $data['telephone'];
    $birthdate = $data['birthdate'];
    $gender = $data['gender'];
    $profil_picture = $data['profil_picture'];

    // Insérez les données dans la base de données
    require_once('../Config/DatabaseManager.php');

    try {
        $db = \App\Config\DatabaseManager::getDB();

        // Utilisez UPDATE pour mettre à jour les champs spécifiques pour un utilisateur existant
        $stmt = $db->prepare('UPDATE user SET lastname=?, firstname=?, telephone=?, birthdate=?, gender=?, profil_picture=? WHERE uid_firebase=?');
        $stmt->execute([$lastname, $firstname, $telephone, $birthdate, $gender, $profil_picture, $userId]);

        // echo json_encode(['status' => 'success', 'message' => 'User data updated successfully ']);
        echo json_encode(['status' => 'success', 'message' => $data]);
    } catch (\PDOException $e) {
        error_log('Error updating user data: ' . $e->getMessage());

        echo json_encode(['status' => 'error', 'message' => 'Error updating user data: ' . $e->getMessage()]);
    }
} else {
    // http_response_code(405); // Méthode non autorisée
    // exit('Invalid request method');
    // echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
