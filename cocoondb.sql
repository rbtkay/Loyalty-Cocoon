-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2019 at 08:16 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cocoondb`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_t`
--

CREATE TABLE `user_t` (
  `user_id` int(11) NOT NULL,
  `user_username` varchar(200) NOT NULL,
  `user_email` varchar(200) NOT NULL,
  `user_name` varchar(200) NOT NULL,
  `user_password` varchar(200) NOT NULL,
  `user_ethAddress` varchar(200) DEFAULT NULL,
  `user_isVerified` bit(1) NOT NULL DEFAULT b'0',
  `user_isVendor` bit(1) NOT NULL DEFAULT b'0',
  `user_isDeleted` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_t`
--

INSERT INTO `user_t` (`user_id`, `user_username`, `user_email`, `user_name`, `user_password`, `user_ethAddress`, `user_isVerified`, `user_isVendor`, `user_isDeleted`) VALUES
(1, 'AUST', 'aust@gmail.com', 'American University of Science and Technology', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '0xea921F03887d1ADDd0f4e19056A70ABC5BfFC900', b'1', b'1', b'0'),
(2, 'Booster', 'booster@gmail.com', 'Booster Fuels', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '0xea921F03887d1ADDd0f4e19056A70ABC5BfFC900', b'1', b'1', b'0'),
(3, 'Hibou', 'kevin.boghs@gmail.com', 'Hibou', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '0xea921F03887d1ADDd0f4e19056A70ABC5BfFC900', b'1', b'1', b'0'),
(4, 'Spinneys', 'kevin@boghz.com', 'Spinneys', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '0xea921F03887d1ADDd0f4e19056A70ABC5BfFC900', b'1', b'1', b'0'),
(5, 'Starbucks', 'kevin@lol.com', 'Starbucks', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '0xea921F03887d1ADDd0f4e19056A70ABC5BfFC900', b'1', b'1', b'0'),
(6, 'kvnbog', 'kevin.boghossian@gmail.com', 'Kevin Boghossian', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '0x4fC91B1d7901E2981dC7E624867dc85815EFF7b3', b'1', b'0', b'0'),
(7, 'rbtkay', 'robert.g.khayat@gmail.com', 'Robert Khayat', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '0x3b06F9c9968A2f4CAAA87012D923748d3324BEd8', b'1', b'0', b'1'),
(16, 'Cookie', 'caroline.bergqvist11@gmail.com', 'Caroline Bergqvist', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '0x80E8Ec804aBa714ca6A469Af66882561Cc13ecc6', b'0', b'0', b'0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_t`
--
ALTER TABLE `user_t`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_username` (`user_username`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_t`
--
ALTER TABLE `user_t`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
