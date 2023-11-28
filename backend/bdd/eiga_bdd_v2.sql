-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 27 nov. 2023 à 10:26
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `eiga_bdd`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `anime_id` int DEFAULT NULL,
  `comment` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `anime_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `anime_id`, `comment`, `date`, `anime_title`) VALUES
(2, 23, 40357, 'J\'ai vraiment adoré cet anime, incroyable, je recommande !!', '2023-11-27 00:23:18', 'Tate no Yuusha no Nariagari Season 3'),
(28, 23, 53887, 'J\'adore Anya !', '2023-11-27 10:29:58', 'Spy x Family Season 2'),
(31, 23, 53887, 'Bonjour', '2023-11-27 11:12:42', 'Spy x Family Season 2');

-- --------------------------------------------------------

--
-- Structure de la table `list_favorite`
--

DROP TABLE IF EXISTS `list_favorite`;
CREATE TABLE IF NOT EXISTS `list_favorite` (
  `user_id` int DEFAULT NULL,
  `anime_id` int DEFAULT NULL,
  `anime_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `list_favorite`
--

INSERT INTO `list_favorite` (`user_id`, `anime_id`, `anime_title`) VALUES
(23, 53887, 'Spy x Family Season 2'),
(23, 54492, 'Kusuriya no Hitorigoto'),
(23, 52991, 'Sousou no Frieren'),
(23, 40357, 'Tate no Yuusha no Nariagari Season 3');

-- --------------------------------------------------------
--
-- Structure de la table `note`
--

DROP TABLE IF EXISTS `note`;
CREATE TABLE IF NOT EXISTS `note` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `anime_id` int DEFAULT NULL,
  `note` int DEFAULT NULL,
  `anime_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_anime` (`user_id`,`anime_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `note`
--

INSERT INTO `note` (`id`, `user_id`, `anime_id`, `note`, `anime_title`) VALUES
(1, 23, 53887, 6, 'Spy x Family Season 2');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lastname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telephone` int DEFAULT NULL,
  `pwd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `gender` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `uid_firebase` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `profil_picture` longblob,
  `birthdate` date DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `username`, `firstname`, `lastname`, `mail`, `telephone`, `pwd`, `gender`, `uid_firebase`, `profil_picture`, `birthdate`, `role`) VALUES
(24, 'test', NULL, NULL, 'test@test.to', NULL, '$2y$10$G2Zg9lYmIZbPGTErOBNpl.TfBNfZ12Vqy2GjjnHuByxs8kgE9V51G', NULL, 'xr1MWqPTA1MnEonNlCpHDTajV3K3', NULL, NULL, NULL),
(25, 'chris', 'pedro', 'sanchez', 'test2@test.to', NULL, '$2y$10$Dr3cbgG8fTIztPGvHSoGjul5dZgHZRViTMwkOZlQvabXx8OlA8Tg6', 'Homme', 'qedsjdDeAJVkBKaiZkusMBE7afy1', NULL, '2000-06-03', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `watchlist`
--

DROP TABLE IF EXISTS `watchlist`;
CREATE TABLE IF NOT EXISTS `watchlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `anime_id` int DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `current_episode` int DEFAULT NULL,
  `anime_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `list_favorite`
--
ALTER TABLE `list_favorite`
  ADD CONSTRAINT `list_favorite_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `note`
--
ALTER TABLE `note`
  ADD CONSTRAINT `note_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `watchlist`
--
ALTER TABLE `watchlist`
  ADD CONSTRAINT `watchlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;