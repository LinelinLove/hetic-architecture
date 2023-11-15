<?php
// EXEMPLE
// app/Models/AnimeModel.php

namespace App\Models;

use App\Config\DatabaseManager;

class AnimeModel
{
    private $db;

    public function __construct()
    {
        $this->db = DatabaseManager::getDB();
    }

    public function getAnimeById($id)
    {
        // Utilisez $this->db pour effectuer des opérations sur la base de données
        // ...

        // Exemple : récupération des données de l'anime avec l'ID spécifié
        $stmt = $this->db->prepare("SELECT * FROM anime WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Autres méthodes du modèle AnimeModel
    // ...
}
