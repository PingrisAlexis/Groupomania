-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3307
-- Généré le : mer. 18 août 2021 à 07:34
-- Version du serveur :  10.4.13-MariaDB
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) NOT NULL,
  `postId` int(10) UNSIGNED NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL,
  `createdAt` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comments_postId` (`postId`),
  KEY `fk_comments_userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `userId` int(10) UNSIGNED NOT NULL,
  `title` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `media` varchar(255) NOT NULL,
  `createdAt` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_posts_userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=170 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `userId`, `title`, `message`, `media`, `createdAt`) VALUES
(163, 161, 'Lorem ipsum', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultricies porttitor suscipit. Aliquam non odio vitae turpis facilisis porta. Nulla vitae turpis orci. Maecenas sed congue mi. Aliquam congue a augue eu luctus. Nunc et eros nunc. Proin urna est, tempus et sodales sit amet, fermentum quis quam. Sed et ante quis quam molestie vulputate.</p><p class=\"ql-align-justify\">Aliquam imperdiet sodales elit non elementum. Mauris aliquam sapien in mauris pellentesque, vel auctor metus bibendum. Proin volutpat imperdiet turpis ac laoreet. Sed volutpat risus lorem, a aliquam nulla ultricies non. Quisque quis lectus egestas, mollis lectus at, viverra neque. Morbi aliquet pharetra nulla. Maecenas facilisis semper mauris, vel ornare lectus dignissim sit amet. Integer vulputate ligula ante, vitae porttitor nulla elementum vel. Donec vitae nulla vestibulum, facilisis velit at, tristique nisl. Vivamus bibendum lacus in eros luctus sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur laoreet iaculis ligula sit amet accumsan. Vivamus consectetur arcu consectetur diam tincidunt, sit amet condimentum elit suscipit.</p><p class=\"ql-align-justify\">Suspendisse potenti. Nunc viverra faucibus tincidunt. Nam quam odio, rutrum et quam non, efficitur aliquam tellus. Etiam tempus, mi id laoreet vestibulum, justo enim scelerisque lectus, id lobortis nunc nisi non risus. Fusce felis orci, tincidunt et gravida hendrerit, imperdiet quis lectus. Donec at nunc rutrum, fringilla lacus eu, dictum lacus. Aenean sollicitudin nibh non libero dignissim fermentum et non felis. Vestibulum in velit a eros pharetra ultricies. Aliquam sodales ut nulla quis lobortis. Duis suscipit fringilla nunc quis vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><p class=\"ql-align-right\"><br></p>', 'http://localhost:3000/images/d09c24867c_50170596_erosion-soulevement-alpes1629102828480.jpg', '16 August 2021, 10:33'),
(164, 161, 'Lorem Ipsilum', '<p class=\"ql-align-center\"><strong style=\"background-color: rgb(255, 255, 255);\"><em><u>Nam maximus lacus quam, maximus faucibus nibh convallis id.</u></em></strong><span style=\"background-color: rgb(255, 255, 255);\"> Sed leo leo, auctor et tincidunt sed, sollicitudin ac ex. Nunc libero nisi, posuere eget quam et, ornare venenatis libero. Nulla dictum scelerisque dui a dictum. Donec placerat risus nibh, nec scelerisque tellus sodales a. Vivamus vitae justo elementum, bibendum massa sodales, gravida augue. Suspendisse quis lacinia quam, vel sodales nunc. Maecenas erat justo, feugiat at iaculis id, interdum ac quam.</span><span style=\"background-color: rgb(255, 255, 255); color: rgb(230, 0, 0);\"> Nam et ante non elit vulputate iaculis eget quis nisl. Aliquam varius nisi quis mauris eleifend bibendum.</span></p>', 'http://localhost:3000/images/Capture_d’écran_2021-08-12_1655301629103397909.png', '16 August 2021, 10:43'),
(165, 161, 'coucou', '<p>looooool</p>', 'http://localhost:3000/images/Capture_d’écran_2021-08-13_1134341629123966386.png', '16 August 2021, 16:26'),
(166, 161, 'azeazeazeazeaze', '<p class=\"ql-align-center\">azeazeazeazeazeaze</p>', 'http://localhost:3000/images/d09c24867c_50170596_erosion-soulevement-alpes1629194715767.jpg', '17 August 2021, 12:05'),
(167, 161, 'zeze', '<p>zezeze</p>', 'http://localhost:3000/images/Capture_d’écran_2021-08-13_1627041629215144505.png', '17 August 2021, 17:45'),
(168, 161, 'azeaze', '<p>azeaze</p>', 'http://localhost:3000/images/d09c24867c_50170596_erosion-soulevement-alpes1629220927810.jpg', '17 August 2021, 19:22'),
(169, 161, 'erer', '<p>erer</p>', 'http://localhost:3000/images/femme1629223379195.jpg', '17 August 2021, 20:02');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `email` varchar(70) NOT NULL,
  `password` varchar(70) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=168 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `avatar`, `admin`) VALUES
(161, 'jean', 'jean', '9ed5c657d30b4a7602f38ab285c22fb00fb08f7332c83b0ce587b1197314dcd9', '$2b$10$GS5Np5a6U3B/VtbFO0x.puSHMZpD3IjprFTgkTEXyb5ujamBzjlJG', 'http://localhost:3000/images/homme16282452436571629224213172.jpg', 0),
(167, 'aze', 'aze', '8db6037910f141f07ccdf5a3e4c9050815e1806c1185a44a23adadd28ae4e5aa', '$2b$10$NrFQJoLB3ksLFL4oSDmN9.Fdn9a16W1ayXZFUDvjl87EKZ9.t8d8S', 'http://localhost:3000/images/femme1629041417703.jpg', 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comments_postId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_comments_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_posts_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
