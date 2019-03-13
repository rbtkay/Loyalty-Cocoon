-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2019 at 05:34 PM
-- Server version: 5.6.37
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `MySQLFirst`
--

-- --------------------------------------------------------

--
-- Table structure for table `product_t`
--

CREATE TABLE IF NOT EXISTS `product_t` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(200) NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_tag` varchar(200) DEFAULT NULL,
  `vendor_username` varchar(200) NOT NULL,
  `product_offered` bit(1) DEFAULT b'0'
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product_t`
--

INSERT INTO `product_t` (`product_id`, `product_name`, `product_price`, `product_tag`, `vendor_username`, `product_offered`) VALUES
(1, 'Wine - Riesling Dr. Pauly', 25, NULL, 'Eayo', b'0'),
(2, 'Apricots - Dried', 9, NULL, 'Eayo', b'1'),
(3, 'Cheese - Cottage Cheese', 46, NULL, 'Eayo', b'1'),
(4, 'Veal - Chops, Split, Frenched', 79, NULL, 'Eayo', b'1'),
(5, 'Beer - Sleemans Honey Brown', 59, NULL, 'Eayo', b'0'),
(6, 'Wine - Penfolds Koonuga Hill', 2, NULL, 'Eayo', b'1'),
(7, 'Beer - Original Organic Lager', 91, NULL, 'Eayo', b'0'),
(8, 'Nescafe - Frothy French Vanilla', 76, NULL, 'Eayo', b'0'),
(9, 'Table Cloth 90x90 Colour', 24, NULL, 'Eayo', b'1'),
(10, 'Soda Water - Club Soda, 355 Ml', 20, NULL, 'Flipopia', b'0'),
(11, 'Grapes - Green', 37, NULL, 'Flipopia', b'0'),
(12, 'Soup - Campbells Broccoli', 77, NULL, 'Flipopia', b'0'),
(13, 'Foam Tray S2', 85, NULL, 'Flipopia', b'1'),
(14, 'Meldea Green Tea Liquor', 96, NULL, 'Flipopia', b'0'),
(15, 'Rum - Cream, Amarula', 92, NULL, 'Flipopia', b'0'),
(16, 'Ham - Procutinni', 9, NULL, 'Flipopia', b'0'),
(17, 'Soup - French Onion', 90, NULL, 'Flipopia', b'0'),
(18, 'Wine - Prosecco Valdobienne', 24, NULL, 'Flipopia', b'1'),
(19, 'Dooleys Toffee', 79, NULL, 'Flipopia', b'0'),
(20, 'Juice - Mango', 61, NULL, 'Flipopia', b'0'),
(21, 'Trout - Rainbow, Frozen', 6, NULL, 'Flipopia', b'1'),
(22, 'Gelatine Leaves - Envelopes', 58, NULL, 'Flipopia', b'0'),
(23, 'Soup - Campbells, Beef Barley', 21, NULL, 'Flipopia', b'1'),
(24, 'Beer - Mcauslan Apricot', 93, NULL, 'Flipopia', b'0'),
(25, 'Wine - Chardonnay Mondavi', 7, NULL, 'Flipopia', b'1'),
(26, 'Appetizer - Assorted Box', 16, NULL, 'Flipopia', b'1'),
(27, 'Gatorade - Cool Blue Raspberry', 37, NULL, 'Flipopia', b'1'),
(28, 'Dill Weed - Dry', 83, NULL, 'Mynte', b'1'),
(29, 'Carrots - Mini, Stem On', 99, NULL, 'Mynte', b'0'),
(30, 'Bacardi Limon', 31, NULL, 'Mynte', b'1'),
(31, 'V8 - Vegetable Cocktail', 10, NULL, 'Mynte', b'0'),
(32, 'Squid - Tubes / Tenticles 10/20', 26, NULL, 'Mynte', b'0'),
(33, 'Lamb - Whole, Fresh', 24, NULL, 'Mynte', b'1'),
(34, 'Sambuca - Opal Nera', 51, NULL, 'Mynte', b'0'),
(35, 'Turkey - Oven Roast Breast', 5, NULL, 'Mynte', b'1'),
(36, 'Wine - Vineland Estate Semi - Dry', 35, NULL, 'Thoughtbridge', b'0'),
(37, 'Pepper - Black, Ground', 34, NULL, 'Thoughtbridge', b'1'),
(38, 'Cake - Pancake', 69, NULL, 'Thoughtbridge', b'0'),
(39, 'Syrup - Monin - Granny Smith', 34, NULL, 'Thoughtbridge', b'1'),
(40, 'Tahini Paste', 90, NULL, 'Thoughtbridge', b'1'),
(41, 'Pastry - Banana Tea Loaf', 57, NULL, 'Thoughtbridge', b'0');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_t`
--

CREATE TABLE IF NOT EXISTS `purchase_t` (
  `purchase_id` int(11) NOT NULL,
  `user_email` varchar(200) NOT NULL,
  `product_id` int(11) NOT NULL,
  `purchase_time` datetime NOT NULL,
  `purchase_finalized` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_t`
--

CREATE TABLE IF NOT EXISTS `user_t` (
  `user_username` varchar(200) NOT NULL,
  `user_email` varchar(200) NOT NULL,
  `user_password` varchar(200) NOT NULL,
  `user_name` varchar(200) NOT NULL,
  `user_dob` date NOT NULL,
  `user_gender` char(1) NOT NULL,
  `user_phone` varchar(45) NOT NULL,
  `user_prefs` varchar(10000) DEFAULT NULL,
  `user_address` varchar(100) DEFAULT NULL,
  `user_country` varchar(45) NOT NULL,
  `user_profession` varchar(45) DEFAULT NULL,
  `user_organization` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_t`
--

INSERT INTO `user_t` (`user_username`, `user_email`, `user_password`, `user_name`, `user_dob`, `user_gender`, `user_phone`, `user_prefs`, `user_address`, `user_country`, `user_profession`, `user_organization`) VALUES
('rbtkay', 'robert@gmail.com', 'hahaha', 'robert', '2019-03-02', 'M', '70657300', 'nescafe', '0xaerbserbsb', 'Lebanon', 'Doctor', 'Hotel Dieu');

-- --------------------------------------------------------

--
-- Table structure for table `vendor_t`
--

CREATE TABLE IF NOT EXISTS `vendor_t` (
  `vendor_username` varchar(200) NOT NULL,
  `vendor_email` varchar(200) NOT NULL,
  `vendor_password` varchar(200) NOT NULL,
  `vendor_name` varchar(200) DEFAULT NULL,
  `vendor_phone` varchar(45) DEFAULT NULL,
  `vendor_location` varchar(200) DEFAULT NULL,
  `vendor_tag` varchar(200) DEFAULT NULL,
  `vendor_address` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vendor_t`
--

INSERT INTO `vendor_t` (`vendor_username`, `vendor_email`, `vendor_password`, `vendor_name`, `vendor_phone`, `vendor_location`, `vendor_tag`, `vendor_address`) VALUES
('Eayo', '', 'hG9R0q5vVIbF', 'Douglas, Hilll and Bednar', '342-189-4025', '011 Prairie Rose Road', NULL, '1EbXaNmVCt2bwcKfmDZSQZ4YaByBihumfh'),
('Flipopia', '', 'dyXa0Tv852', 'Terry Inc', '456-866-0485', '8625 Hazelcrest Lane', NULL, '1AkWgcLFVLHLZZWNT99v1oZprPb85itrax'),
('Innojam', '', 'ldUqNcNSSJ', 'Mayert Inc', '585-136-0279', '08 Orin Road', NULL, '1Bq1F5tiicpKkAhX5uuW6bGNstYrdanAUW'),
('Kazio', '', 'VZLSzY', 'Quitzon-Veum', '873-719-0011', '92 Marcy Parkway', NULL, '16YzHrmcKmyRmJcU54i5EhbXT47TYBaFC'),
('Mynte', '', 'TGuWOooIbRrA', 'Denesik-Weber', '384-575-0527', '968 Holy Cross Plaza', NULL, '133YwkYQtWvsMS5ndyrhSLxQUEiPkNpwmq'),
('Talane', '', 'izUdKBlPlTB', 'Tillman and Sons', '167-474-5699', '36003 American Junction', NULL, '1Jhswxntkf64WcCMQZUsXWFrcRRr6V26TC'),
('Thoughtbridge', '', 'eQt0ZEYf6Nct', 'Crooks, Tremblay and DuBuque', '174-350-4257', '146 Farmco Point', NULL, '1LevtRCC7UuGfK5wWdgrysxvqLcaff4WCE'),
('Voonder', '', 'RuNzSAal5', 'Pagac Inc', '563-120-3941', '2047 Granby Lane', NULL, '1DAJFzCXQEoN2nfMSUi8E8gMPp7Spk83u1'),
('Yodoo', '', 'eFaukUTTG', 'Kemmer-Reichel', '873-952-9824', '7534 Scott Point', NULL, '1GgVkEah7kUxAgwMPDFVqhpbSBJXr6YUVR');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product_t`
--
ALTER TABLE `product_t`
  ADD PRIMARY KEY (`product_id`),
  ADD UNIQUE KEY `product_id_UNIQUE` (`product_id`),
  ADD UNIQUE KEY `product_name_UNIQUE` (`product_name`),
  ADD KEY `fk_Product_T_Vendor_T_idx` (`vendor_username`);

--
-- Indexes for table `purchase_t`
--
ALTER TABLE `purchase_t`
  ADD PRIMARY KEY (`purchase_id`),
  ADD UNIQUE KEY `purchase_id_UNIQUE` (`purchase_id`),
  ADD KEY `fk_Purchase_T_User_T1_idx` (`user_email`),
  ADD KEY `fk_Purchase_T_Product_T1_idx` (`product_id`);

--
-- Indexes for table `user_t`
--
ALTER TABLE `user_t`
  ADD PRIMARY KEY (`user_username`),
  ADD UNIQUE KEY `user_email_UNIQUE` (`user_email`);

--
-- Indexes for table `vendor_t`
--
ALTER TABLE `vendor_t`
  ADD PRIMARY KEY (`vendor_username`),
  ADD UNIQUE KEY `vendor_email_UNIQUE` (`vendor_username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product_t`
--
ALTER TABLE `product_t`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=42;
--
-- AUTO_INCREMENT for table `purchase_t`
--
ALTER TABLE `purchase_t`
  MODIFY `purchase_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `product_t`
--
ALTER TABLE `product_t`
  ADD CONSTRAINT `fk_Product_T_Vendor_T` FOREIGN KEY (`vendor_username`) REFERENCES `vendor_t` (`vendor_username`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `purchase_t`
--
ALTER TABLE `purchase_t`
  ADD CONSTRAINT `fk_Purchase_T_Product_T1` FOREIGN KEY (`product_id`) REFERENCES `product_t` (`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Purchase_T_User_T1` FOREIGN KEY (`user_email`) REFERENCES `user_t` (`user_email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
