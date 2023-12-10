# Cahier des Charges Techniques

- [Cahier des Charges Techniques](#cahier-des-charges-techniques)
  - [1. Introduction](#1-introduction)
    - [1.1 Objectif du Document](#11-objectif-du-document)
    - [1.2 Portée du Projet](#12-portée-du-projet)
  - [2. Spécifications Techniques](#2-spécifications-techniques)
    - [2.1 Architecture Système](#21-architecture-système)
      - [Exemple de diagramme d'architecture (mermaid)](#exemple-de-diagramme-darchitecture-mermaid)
      - [Exemple de diagramme de base de données (mermaid)](#exemple-de-diagramme-de-base-de-données-mermaid)
    - [2.2 Choix Technologiques](#22-choix-technologiques)
    - [2.3 Interfaces Système](#23-interfaces-système)
    - [2.4 Sécurité](#24-sécurité)
  - [3. Développement](#3-développement)
    - [3.1 Gestion de Version](#31-gestion-de-version)
    - [3.2 Normes de Codage](#32-normes-de-codage)
    - [3.3 Tests](#33-tests)
  - [4. Déploiement et Maintenance](#4-déploiement-et-maintenance)
    - [4.1 Environnements](#41-environnements)
    - [4.2 CI/CD](#42-cicd)
    - [4.3 Plan de Maintenance](#43-plan-de-maintenance)
  - [5. Documentation](#5-documentation)
    - [5.1 Documentation Technique](#51-documentation-technique)
    - [5.2 Documentation Utilisateur](#52-documentation-utilisateur)
    - [5.3. Features](#53-features)
      - [Exemple de plannification de taches](#exemple-de-plannification-de-taches)
        - [Liste des Fonctionnalités du Projet](#liste-des-fonctionnalités-du-projet)
        - [Temps Estimé par Tâches](#temps-estimé-par-tâches)
        - [Scope Défini](#scope-défini)
        - [Priorité Définie](#priorité-définie)
        - [Date de Fin](#date-de-fin)
  - [6. Glossaire](#6-glossaire)
  - [7. Annexes](#7-annexes)
  - [8. Conclusion](#8-conclusion)

## 1. Introduction

### 1.1 Objectif du Document

Ce document à pour but de vous définir les spécifications techniques du projet Eiga.

### 1.2 Portée du Projet

Objectifs du projet : créer un répertoire d'animes avec diverses fonctionnalitées tels que mettre en favoris, noter et commenter pour créer un espace de partage et d'échange

Ressources :

- Équipe de developpeurs (six personnes)

Livrables :

- README et cahier des charges pour le 10 décembre 2023
- Code du projet Eiga pour le 10 décembre 2023

Feuille de route et chronologie du projet :

- 6 novembre : début du projet
- 29 novembre : oral
- 10 décembre : rendu du projet et livrable

Éléments non prévus dans le projet :

## 2. Spécifications Techniques

### 2.1 Architecture Système

- Schéma d'Architecture Technique : [Architecture](architecture.png)
- Schéma de Gestion de Base de Données Relationnelle : [DBdiagram](https://dbdiagram.io/d/eiga-archi-654e2f517d8bbd6465ee852a)

### 2.2 Choix Technologiques

- Langages de Programmation : [PHP](https://www.php.net/docs.php), [JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript), [HTML](https://developer.mozilla.org/fr/docs/Web/HTML), [CSS](https://developer.mozilla.org/fr/docs/Web/CSS)
- Frameworks et Bibliothèques : [React.js](https://fr.legacy.reactjs.org/docs/getting-started.html), [Tailwind](https://tailwindcss.com/)
- Builder : [Vite](https://vitejs.dev/guide/)
- APIs : [API Rest](apiRest.md), [Jikan](https://jikan.moe/)
- Base de Données : [MySQL](https://dev.mysql.com/doc/)
- Outils de Développement : Visual Studio Code, Git Bash

Voici des tableaux récapitulatifs des raisons de nos choix de technologies:

| Technologie | Avantages                                             | Inconvénients                                  |
| ----------- | ----------------------------------------------------- | ---------------------------------------------- |
| React       | reactivité, connu de toute l'équipe                   |                                                |
| Tailwind    | organisation/lisibilité                               | pas connu de toute l'équipe                    |
| PHP         | connu de toute l'équipe, documentation JIKAN          |                                                |
| MySQL       | simple d'utilisation, connu de l'équipe               |                                                |
| api Rest    | forte communauté, documentation conséquente, sécurité | données en anglais, notre site est en francais |
| api Jikan   | bonne documentation, fonctionnalités intéressantes    |                                                |
| Vite        | vitesse                                               |                                                |

| Critère           | React | Tailwind | PHP   |
| ----------------- | ----- | -------- | ----- |
| **Documentation** | 4/5   | 5/5      | 4/5   |
| **Popularité**    | 5/5   | 4/5      | 4/5   |
| **Performance**   | 4/5   | 4/5      | 3/5   |
| **Connaissance**  | 3/5   | 3/5      | 4/5   |
| **Total**         | 16/20 | 16/20    | 15/20 |

Pourquoi n'avoir pas utilisé Vue, Node.js ou PostgreSQL ?
L'inconvénient était que ces technologies n'étaient pas connues des membres de l'équipe. Nous avons donc préféré prioriser des technologies déjà vues afin de pouvoir développer plus rapidement dans les délais qui nous étaient imposés.

### 2.3 Interfaces Système

- APIs Externes :
  - [Jikan](https://jikan.moe/) : de l'API Rest pour récupérer les données relatives aux animes pour notre projet
- Intégration de Systèmes : requête HTTP avec l'utilisation de fetch

### 2.4 Sécurité

- Authentification et Autorisation : [Firebase Auth](https://firebase.google.com/docs/auth?hl=fr)
- Chiffrement et Protection des Données : Standards et pratiques de cryptage.

## 3. Développement

### 3.1 Gestion de Version

- Outils de Gestion de Version : Git, Github

### 3.2 Normes de Codage

- Style de Codage : Airbnb pour JavaScript (utilisation lègère)
- Revue de Code : Github

### 3.3 Tests

- Stratégie de Test : Aucune
- Outils de Test : Aucune

## 4. Déploiement et Maintenance

### 4.1 Environnements

- Développement :
  - Outil de Développement : Visual Studio Code a été utilisé comme environnement de développement principal pour la création et la modification du code source.
  - Débogage : Le débogage a été effectué à l'aide de la console du navigateur pour identifier et corriger les erreurs de manière interactive.
- Absence de Tests : Jusqu'à présent, aucun test formel n'a été effectué. Le développement initial a été axé sur la mise en place de la logique de base et des fonctionnalités.

- Production : Pas encore en production

### 4.2 CI/CD

- Intégration Continue : Pas d'outils utilisés
- Déploiement Continu : Déploiement manuel

### 4.3 Plan de Maintenance

- Mises à Jour : Pas prévu pour le moment
- Support Technique : Pas prévu pour le moment

## 5. Documentation

### 5.1 Documentation Technique

- Code Source : Commentaires, documentation intégrée.
- Documentation Externe :
  - [Firebase Auth](https://firebase.google.com/docs/auth?hl=fr)
  - [Jikan](https://jikan.moe/)

### 5.2 Documentation Utilisateur

- Manuels Utilisateur : Pas disponible pour le moment
- Formation : Pas prévu

### 5.3 Features

- Liste des fonctionnalités du projet.
- Temps estimé par taches
- Scope défini
- Priorité définie
- Date de fin
- Lien des services utilisés (trello)

##### Liste des Fonctionnalités du Projet

1. **BDD** : Créer les utilisateurs en BDD, liste des notes, des commentaires, de la watchlist
2. **Auth** : Implémentation de Firebase Auth dans le Frontend
3. **Router** : Routage des différentes pages dans le Frontend
4. **Frontend** : Créer frontend des différentes pages du site et selon si l'utilisateur est connecté ou non (profil, page d'anime, page de recherche, page d'accueil...)
5. **API Rest** : Modifier et récupérer les informations de la base de données
   - Note : GET la note global, POST une note, GET la note de l'utilisateur
   - Utilisateur : POST pour modifier son profil
   - Commentaire : GET les commentaires, POST un commentaire
   - Watchlist : GET, POST, DELETE

##### Temps Estimé par Tâches

- **Tâche BDD** : 5 heures
- **Tâche Auth** : 4 heures
- **Tâche Router** : 5 heures
- **Tâche Frontend** : 18 heures
- **Tâche API Rest** : 28 heures

##### Scope Défini

- **Phase 1** : Implémentation des fonctionnalités BDD et Auth.
- **Phase 2** : Développement des fonctionnalités Router et Frontend.
- **Phase 3** : Finalisation et tests de la fonctionnalité API Rest.

##### Priorité Définie

1. **Haute** : BDD, API Rest, Auth
2. **Moyenne** : Router
3. **Basse** : Frontend

##### Date de Fin

- **Date Prévue** : 10/12/2023

## 6. Glossaire

- watchlist : liste d'anime de l'utilisateur qui pourra être triée selon son état
  - en cours, à voir, abandonné, terminé

## 7. Annexes

- [Architecture](architecture.png)
- [API Rest](apiRest.md)

## 8. Conclusion

- Récapitulatif : Créer un répertoire d'anime en utilisant une API Rest, en liant le backend et le frontend
- Objectifs : les objectifs principaux ont été atteints, cités dans les parties correspondantes du cahier des charges
- Ce projet nous a permis de mieux comprendre comment utiliser une API REST, que ce soit celle d'une API externe comme Jikan ou bien celle que nous avons créée, et de la lier à notre frontend. Nous avons ainsi approfondi notre compréhension de la communication entre les différentes parties. Ce fut un projet à la fois instructif et ludique, car nous avons codé un projet sur lequel nous avions tous un point commun.
- Les prochaines étapes pour notre projet sont principalements :
  - Décomposer/factoriser les composants pour apporter plus de lisibilité
  - Améliorer l'espace commentaire (balise spoiler, répondre ou taguer un utilisateur)
  - Améliorer l'UX/UI
