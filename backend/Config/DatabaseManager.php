<?php

// app/Config/DatabaseManager.php

namespace App\Config;
function loadEnv()
{
    $envFile = __DIR__ . '../../.env';

    if (!file_exists($envFile)) {
        die("Le fichier .env n'a pas été trouvé.");
    }

    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {
        // Ignore les commentaires
        if (strpos($line, '#') !== false) {
            continue;
        }

        list($key, $value) = explode('=', $line, 2) + [null, null];
        $key = trim($key);
        $value = trim($value);

        // Définir la variable d'environnement si la clé et la valeur sont présentes
        if ($key !== null && $value !== null) {
            $_ENV[$key] = $value;
        }
    }
}

loadEnv();
use PDO;
use PDOException;

class DatabaseManager
{
    private static $dbInstance;

    public static function getDB()
    {
        if (!isset(self::$dbInstance)) {
            $host = $_ENV['DB_HOST'];
            $dbname = $_ENV['DB_NAME'];
            $username = $_ENV['DB_USER'];
            $password = $_ENV['DB_PASSWORD'];            

            try {
                self::$dbInstance = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
                self::$dbInstance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                die("Database connection failed: " . $e->getMessage());
            }
        }

        return self::$dbInstance;
    }
}
