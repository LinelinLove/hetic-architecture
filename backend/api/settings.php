<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
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
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!empty($result)) {
        echo json_encode(["status" => "success", "data" => $result[0]]);
    } else {
        echo json_encode(["status" => "error", "message" => "Utilisateur non trouvé"]);
    }
}



// // Endpoint pour mettre à jour les informations de l'utilisateur
// if ($_SERVER["REQUEST_METHOD"] === "POST") {
//     // Récupérez les données envoyées depuis le client
//     $userId = $_POST["userId"]; // Assurez-vous de valider et de sécuriser cette valeur
//     $newData = $_POST["newData"]; // Les nouvelles données à mettre à jour


//     // username
//     // email
//     // lastname
//     // firstname
//     // phone
//     // birthdate

//     // Exécutez une requête SQL pour mettre à jour les informations de l'utilisateur
//     // $sql = "UPDATE utilisateurs SET champ1 = '$newData1', champ2 = '$newData2' WHERE id = $userId";
//     $sql = "UPDATE user SET username=?, email=?, lastname=?, firstname=?, telephone=?, birthday=? WHERE id=?";

//     $result = $conn->query($sql);

//     if ($result === TRUE) {
//         echo json_encode(["success" => "Données mises à jour avec succès"]);
//     } else {
//         echo json_encode(["error" => "Erreur lors de la mise à jour des données"]);
//     }
// }

// // Fermez la connexion à la base de données
// $conn->close();


// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     $data = json_decode(file_get_contents('php://input'), true);

//     error_log('Received data: ' . print_r($data, true));
//     $username = $data['username'];
//     $email = $data['email'];
//     $password = password_hash($data['password'], PASSWORD_BCRYPT);

//     // Ajoutez la récupération de l'UID depuis Firebase
//     $firebaseUid = $data['firebaseUid']; // Assurez-vous que cette clé correspond à celle utilisée côté client

//     error_log('Username: ' . $username);
//     error_log('Email: ' . $email);

//     // Validez les données (effectuez toutes les validations nécessaires)

//     // Insérez les données dans la base de données
//     require_once('../Config/DatabaseManager.php');

//     try {
//         $db = \App\Config\DatabaseManager::getDB();
//         $stmt = $db->prepare('INSERT INTO user (username, mail, pwd, uid_firebase) VALUES (?, ?, ?, ?)');
//         $stmt->execute([$username, $email, $password, $firebaseUid]);

//         // error_log('User registered successfully');

//         echo json_encode(['status' => 'success', 'message' => 'User registered successfully']);
//         // echo json_encode(['data' => $data]);
//     } catch (\PDOException $e) {
//         error_log('Error registering user: ' . $e->getMessage());

//         echo json_encode(['status' => 'error', 'message' => 'Error registering user: ' . $e->getMessage()]);
//     }
// } else {
//     echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
// }
