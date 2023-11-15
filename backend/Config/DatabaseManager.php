<?php

// app/Config/DatabaseManager.php

namespace App\Config;

use PDO;
use PDOException;

class DatabaseManager
{
    private static $dbInstance;

    public static function getDB()
    {
        if (!isset(self::$dbInstance)) {
            $host = getenv('DB_HOST');
            $dbname = getenv('DB_NAME');
            $username = getenv('DB_USER');
            $password = getenv('DB_PASSWORD');

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
