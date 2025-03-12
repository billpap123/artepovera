-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Εξυπηρετητής: localhost
-- Χρόνος δημιουργίας: 13 Φεβ 2025 στις 23:05:38
-- Έκδοση διακομιστή: 10.4.28-MariaDB
-- Έκδοση PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `artepovera`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `artists`
--
-- Σφάλμα ανάγνωσης για τον πίνακα artepovera.artists: #1932 - Table &#039;artepovera.artists&#039; doesn&#039;t exist in engine
-- Σφάλμα ανάγνωσης δεδομένων για τον πίνακα artepovera.artists: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `artepovera`.`artists`&#039; at line 1

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `artist_portfolios`
--
-- Σφάλμα ανάγνωσης για τον πίνακα artepovera.artist_portfolios: #1932 - Table &#039;artepovera.artist_portfolios&#039; doesn&#039;t exist in engine
-- Σφάλμα ανάγνωσης δεδομένων για τον πίνακα artepovera.artist_portfolios: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `artepovera`.`artist_portfolios`&#039; at line 1

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `chats`
--
-- Σφάλμα ανάγνωσης για τον πίνακα artepovera.chats: #1932 - Table &#039;artepovera.chats&#039; doesn&#039;t exist in engine
-- Σφάλμα ανάγνωσης δεδομένων για τον πίνακα artepovera.chats: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `artepovera`.`chats`&#039; at line 1

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `employers`
--
-- Σφάλμα ανάγνωσης για τον πίνακα artepovera.employers: #1932 - Table &#039;artepovera.employers&#039; doesn&#039;t exist in engine
-- Σφάλμα ανάγνωσης δεδομένων για τον πίνακα artepovera.employers: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `artepovera`.`employers`&#039; at line 1

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `job_postings`
--
-- Σφάλμα ανάγνωσης για τον πίνακα artepovera.job_postings: #1932 - Table &#039;artepovera.job_postings&#039; doesn&#039;t exist in engine
-- Σφάλμα ανάγνωσης δεδομένων για τον πίνακα artepovera.job_postings: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `artepovera`.`job_postings`&#039; at line 1

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `likes`
--
-- Σφάλμα ανάγνωσης για τον πίνακα artepovera.likes: #1932 - Table &#039;artepovera.likes&#039; doesn&#039;t exist in engine
-- Σφάλμα ανάγνωσης δεδομένων για τον πίνακα artepovera.likes: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `artepovera`.`likes`&#039; at line 1

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `messages`
--
-- Σφάλμα ανάγνωσης για τον πίνακα artepovera.messages: #1932 - Table &#039;artepovera.messages&#039; doesn&#039;t exist in engine
-- Σφάλμα ανάγνωσης δεδομένων για τον πίνακα artepovera.messages: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `artepovera`.`messages`&#039; at line 1

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `notifications`
--
-- Σφάλμα ανάγνωσης για τον πίνακα artepovera.notifications: #1932 - Table &#039;artepovera.notifications&#039; doesn&#039;t exist in engine
-- Σφάλμα ανάγνωσης δεδομένων για τον πίνακα artepovera.notifications: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `artepovera`.`notifications`&#039; at line 1

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `reviews`
--
-- Σφάλμα ανάγνωσης για τον πίνακα artepovera.reviews: #1932 - Table &#039;artepovera.reviews&#039; doesn&#039;t exist in engine
-- Σφάλμα ανάγνωσης δεδομένων για τον πίνακα artepovera.reviews: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `artepovera`.`reviews`&#039; at line 1

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `users`
--
-- Σφάλμα ανάγνωσης για τον πίνακα artepovera.users: #1932 - Table &#039;artepovera.users&#039; doesn&#039;t exist in engine
-- Σφάλμα ανάγνωσης δεδομένων για τον πίνακα artepovera.users: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `artepovera`.`users`&#039; at line 1
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
