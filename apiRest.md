# API REST EIGA

# Sommaire

1. [comments.php](#1-commentsphp)
   - [GET](#get)
   - [POST](#post)

2. [db_connexion.php](#2-db_connexionphp)

3. [favorite.php](#3-favoritephp)
   - [GET](#get)
   - [POST](#post)
   - [DELETE](#delete)

4. [getCommentPerUser.php.php](#4-getcommentperuserphpphp)
   - [GET](#get)

5. [getFavoriteperUser.php.php](#5-getfavoriteperuserphpphp)
   - [GET](#get)

6. [getNotePerUser.php](#6-getnoteperuserphp)
   - [GET](#get)

7. [getNotePerUserAnime.php](#7-getnoteperuseranimephp)
   - [GET](#get)

8. [getWatchlistPerUser.php](#8-getwatchlistperuserphp)
   - [GET](#get)

9. [nb_episode.php](#9-nb_episodephp)
   - [GET](#get)
   - [POST](#post)

10. [note.php](#10-notephp)
    - [GET](#get)
    - [POST](#post)

11. [settings.php](#11-settingsphp)
    - [GET](#get)
    - [POST](#post)

12. [signup.php](#12-signupphp)
    - [POST](#post)

13. [users.php](#13-usersphp)
    - [GET](#get)

14. [watchlist.php](#14-watchlistphp)
    - [GET](#get)
    - [POST](#post)


## 1. comments.php
### GET
Récupére tous les commentaires selon l'ID de l'anime, utiliser sur la page `Anime`.

### POST
Ajoute un commentaire dans la table `comments` dans la base de données.

## 2. db_connexion.php
Vérifie si la connexion de la base de données est bien établie, c'est un fichier test qui n'est pas utiliser dans le projet.

## 3. favorite.php
### GET
Récupère si un utilisateur a mis en favori un anime.
### POST
Ajoute l'ID et l'ID de l'anime dans la table `favorite`.
### DELETE
Supprime la ligne dans la BDD qui correspond à l'ID de l'utilisateur connecté et l'ID de l'anime dans la table `favorite`

## 4. getCommentPerUser.php.php
### GET
Récupère tous les commentaires selon l'ID de l'utilisateur, dans notre projet, utiliser sur la page `Profil` pour voir quel anime il a commenté et le contenu du commentaire.

## 5. getFavoriteperUser.php.php
### GET
Récupère tous les animes en favoris selon l'ID de l'utilisateur, dans notre projet, utiliser sur la page `Profil` pour voir quel anime il a mis en favoris.

## 6. getNotePerUser.php
### GET
Récupère tous les animes auquel l'utilisateur a mis une note selon l'ID de l'utilisateur, dans notre projet, utiliser sur la page `Profil` pour voir quel anime il a noté.

## 7. getNotePerUserAnime.php
### GET
Récupère la note selon l'ID de l'utilisateur et l'ID de l'anime, dans notre projet, utiliser sur la page `Anime` pour voir note il a mis à l'anime

## 8. getWatchlistPerUser.php
### GET
Récupère la watchlist selon l'ID de l'utilisateur, utiliser sur la page `Profil`

## 9. nb_episode.php
### GET
Récupère le numéro de l'épisode selon l'ID de l'anime et de l'utilisateur, utiliser sur la page `Anime`.
### POST
Modifie dans la table `watchlist` la valeur `nb_episode` selon l'ID de l'utilisateur et l'ID de l'anime, utiliser sur la page `Anime`.

## 10. note.php
### GET
Récupère les notes de tous les utilisateurs selon l'ID de l'anime et fait une moyenne de toutes les notes, arrondi au centième près, utiliser sur la page `Anime`.
### POST
Ajoute ou modifie la note selon l'ID de l'utilisateur et l'ID de l'anime, utiliser sur la page `Anime`.

## 11. settings.php
### GET
Récupère les informations de l'utilisateur selon son ID, utiliser sur la page `Profil`.
### POST
Modifie les informations de l'utilisateur selon son ID, utiliser sur la page `Profil`.

## 12. signup.php
### POST
Ajoute les informations de l'utilisateur selon l'ID Firebase que nous récupérons dans le JSON envoyé depuis le Frontend dans la table `user`, utiliser sur la page `Signup`.

## 13. users.php
### GET
Récupère les informations d'un utilisateur selon son ID, utiliser dans la page `Profil` pour l'utilisateur connecté et `Profil/:id` si on précise l'ID d'utilisateur

## 14. watchlist.php
### GET
Récupère le statut de l'anime dans la table `watchlist` selon l'ID de l'utilisateur et l'ID de l'anime, utiliser sur la page `Anime`.
### POST
Ajoute, modifie ou supprime la ligne selon l'ID de l'utilisateur et l'ID de l'anime, utiliser sur la page `Anime`. 
On supprime dans le cas où on récupère un statut vide, sinon on modifie si le couple de clé (`user_id`, `anime_id`) existe déjà sinon on ajoute une nouvelle ligne.