CREATE TABLE `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `firstname` varchar(255),
  `lasname` varchar(255),
  `mail` varchar(255),
  `telephone` int,
  `pwd` varchar(255),
  `gender` varchar(255),
  `uid_firebase` int,
  `profil_picture` blob,
  `birthday` date,
  `role` varchar(255)
);

CREATE TABLE `watchlist` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `anime_id` int,
  `status` varchar(255),
  `current_episode` int
);

CREATE TABLE `list_favorite` (
  `user_id` int,
  `anime_id` int
);

CREATE TABLE `note` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `anime_id` int,
  `note` int
);

CREATE TABLE `commentaire` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `anime_id` int,
  `commentaire` varchar(255)
);

ALTER TABLE `watchlist` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `list_favorite` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `note` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `commentaire` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
