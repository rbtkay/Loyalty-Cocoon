-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 08, 2019 at 01:53 PM
-- Server version: 5.7.24
-- PHP Version: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mysqlfirst`
--

-- --------------------------------------------------------

--
-- Table structure for table `product_t`
--

DROP TABLE IF EXISTS `product_t`;
CREATE TABLE IF NOT EXISTS `product_t` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(200) NOT NULL,
  `product_category` varchar(100) NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_loco` int(255) NOT NULL,
  `product_tag` varchar(200) DEFAULT NULL,
  `product_description` varchar(1000) DEFAULT NULL,
  `vendor_username` varchar(200) NOT NULL,
  `product_offered` bit(1) DEFAULT b'0',
  `product_image` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_id_UNIQUE` (`product_id`),
  UNIQUE KEY `product_name_UNIQUE` (`product_name`),
  KEY `fk_Product_T_Vendor_T_idx` (`vendor_username`)
) ENGINE=InnoDB AUTO_INCREMENT=313 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product_t`
--

INSERT INTO `product_t` (`product_id`, `product_name`, `product_category`, `product_price`, `product_loco`, `product_tag`, `product_description`, `vendor_username`, `product_offered`, `product_image`) VALUES
(254, 'Soup - Knorr, Country Bean', 'Toys', 79, 795, 'Engineering', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\r\n\r\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\r\n\r\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 'Hibou', b'0', NULL),
(255, 'Sloe Gin - Mcguinness', 'Groceries', 912, 492, 'Research and Development', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\r\n\r\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\r\n\r\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 'Starbucks', b'1', NULL),
(256, 'Pan Grease', 'Food', 926, 675, 'Human Resources', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\r\n\r\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\r\n\r\nPhasellus in felis. Donec semper sapien a libero. Nam dui.', 'Hibou', b'1', NULL),
(257, 'Table Cloth 90x90 Colour', 'Toys', 714, 119, 'Business Development', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 'Spinneys', b'1', NULL),
(258, 'Pineapple - Golden', 'Groceries', 507, 658, 'Business Development', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\r\n\r\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'Grab & Go', b'1', NULL),
(259, 'Bread Roll Foccacia', 'Toys', 648, 463, 'Services', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\r\n\r\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\r\n\r\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 'Spinneys', b'0', NULL),
(260, 'Chestnuts - Whole,canned', 'Food', 627, 8, 'Sales', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\r\n\r\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 'AUST', b'0', NULL),
(261, 'Bag Clear 10 Lb', 'Groceries', 675, 62, 'Business Development', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\r\n\r\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\r\n\r\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 'Grab & Go', b'1', NULL),
(262, 'Food Colouring - Blue', 'Groceries', 221, 902, 'Training', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 'Hibou', b'1', NULL),
(263, 'Cheese - Swiss Sliced', 'Electronics', 384, 488, 'Business Development', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\r\n\r\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\r\n\r\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 'Hibou', b'0', NULL),
(264, 'Ice Cream - Chocolate', 'Groceries', 650, 551, 'Marketing', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\r\n\r\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\r\n\r\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', 'AUST', b'1', NULL),
(265, 'Yeast Dry - Fleischman', 'Food', 975, 675, 'Engineering', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\r\n\r\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 'Hibou', b'1', NULL),
(266, 'Longos - Lasagna Veg', 'Toys', 963, 598, 'Business Development', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\r\n\r\nFusce consequat. Nulla nisl. Nunc nisl.\r\n\r\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 'Grab & Go', b'1', NULL),
(267, 'Vanilla Beans', 'Electronics', 152, 97, 'Legal', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\r\n\r\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\r\n\r\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 'Starbucks', b'1', NULL),
(268, 'Gin - Gilbeys London, Dry', 'Clothing', 81, 60, 'Support', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\r\n\r\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\r\n\r\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 'AUST', b'1', NULL),
(269, 'Pheasants - Whole', 'Electronics', 30, 540, 'Product Management', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 'AUST', b'1', NULL),
(270, 'Filo Dough', 'Electronics', 523, 493, 'Sales', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\r\n\r\nSed ante. Vivamus tortor. Duis mattis egestas metus.', 'AUST', b'0', NULL),
(271, 'Beef - Prime Rib Aaa', 'Toys', 705, 161, 'Engineering', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\r\n\r\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\r\n\r\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', 'Spinneys', b'1', NULL),
(272, 'Fond - Neutral', 'Food', 4, 518, 'Accounting', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', 'AUST', b'0', NULL),
(273, 'Wine - Penfolds Koonuga Hill', 'Clothing', 571, 427, 'Human Resources', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\r\n\r\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 'Spinneys', b'0', NULL),
(274, 'Beef - Top Sirloin', 'Groceries', 975, 854, 'Accounting', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 'AUST', b'1', NULL),
(275, 'Salsify, Organic', 'Food', 140, 239, 'Marketing', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\r\n\r\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 'Spinneys', b'0', NULL),
(276, 'Vodka - Hot, Lnferno', 'Food', 854, 241, 'Engineering', 'Fusce consequat. Nulla nisl. Nunc nisl.\r\n\r\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 'Grab & Go', b'0', NULL),
(277, 'Dragon Fruit', 'Clothing', 510, 207, 'Support', 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', 'AUST', b'1', NULL),
(278, 'Pepper - White, Whole', 'Groceries', 490, 749, 'Product Management', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\r\n\r\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 'Grab & Go', b'1', NULL),
(279, 'Duck - Legs', 'Electronics', 573, 602, 'Human Resources', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\r\n\r\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\r\n\r\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 'AUST', b'1', NULL),
(280, 'Lettuce - Mini Greens, Whole', 'Clothing', 192, 642, 'Accounting', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\r\n\r\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 'Grab & Go', b'1', NULL),
(281, 'Swordfish Loin Portions', 'Clothing', 332, 470, 'Training', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 'Booster', b'0', NULL),
(282, 'Soup - Campbells - Tomato', 'Clothing', 650, 229, 'Engineering', 'In congue. Etiam justo. Etiam pretium iaculis justo.\r\n\r\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 'Grab & Go', b'0', NULL),
(283, 'Truffle Paste', 'Food', 723, 393, 'Business Development', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\r\n\r\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\r\n\r\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', 'AUST', b'1', NULL),
(284, 'Sauce - Vodka Blush', 'Clothing', 367, 393, 'Product Management', 'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 'Hibou', b'1', NULL),
(285, 'Wasabi Powder', 'Electronics', 515, 643, 'Engineering', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\r\n\r\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 'Grab & Go', b'0', NULL),
(286, 'Turkey - Breast, Double', 'Food', 767, 549, 'Marketing', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', 'Hibou', b'0', NULL),
(287, 'Beer - Tetleys', 'Food', 479, 740, 'Training', 'In congue. Etiam justo. Etiam pretium iaculis justo.\r\n\r\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\r\n\r\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 'AUST', b'1', NULL),
(288, 'Squash - Sunburst', 'Groceries', 413, 634, 'Product Management', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 'Hibou', b'1', NULL),
(289, 'Truffle Cups - White Paper', 'Clothing', 825, 752, 'Research and Development', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\r\n\r\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\r\n\r\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 'Booster', b'0', NULL),
(290, 'Evaporated Milk - Skim', 'Clothing', 596, 469, 'Marketing', 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 'Hibou', b'1', NULL),
(291, 'Capers - Pickled', 'Toys', 701, 647, 'Support', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 'Starbucks', b'0', NULL),
(292, 'Beans - Fine', 'Electronics', 245, 894, 'Marketing', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 'Starbucks', b'1', NULL),
(293, 'Lady Fingers', 'Clothing', 622, 214, 'Research and Development', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', 'Hibou', b'1', NULL),
(294, 'Sprite - 355 Ml', 'Groceries', 764, 665, 'Training', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\r\n\r\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\r\n\r\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 'Spinneys', b'0', NULL),
(295, 'Cakes Assorted', 'Food', 35, 605, 'Research and Development', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\r\n\r\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\r\n\r\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 'Starbucks', b'1', NULL),
(296, 'Foil Wrap', 'Groceries', 200, 937, 'Human Resources', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\r\n\r\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 'Grab & Go', b'0', NULL),
(297, 'Cherries - Fresh', 'Clothing', 485, 834, 'Product Management', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\r\n\r\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'AUST', b'1', NULL),
(298, 'Beef - Short Loin', 'Groceries', 260, 408, 'Marketing', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\r\n\r\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\r\n\r\nFusce consequat. Nulla nisl. Nunc nisl.', 'Hibou', b'0', NULL),
(299, 'Pike - Frozen Fillet', 'Clothing', 420, 135, 'Training', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', 'AUST', b'0', NULL),
(300, 'Turkey - Ground. Lean', 'Groceries', 877, 188, 'Research and Development', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\r\n\r\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\r\n\r\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 'Booster', b'1', NULL),
(301, 'Versatainer Nc - 888', 'Electronics', 897, 109, 'Support', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 'Starbucks', b'0', NULL),
(302, 'Cheese - Colby', 'Electronics', 481, 603, 'Business Development', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\r\n\r\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 'Hibou', b'0', NULL),
(303, 'Kolrabi', 'Electronics', 822, 196, 'Sales', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\r\n\r\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\r\n\r\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 'Grab & Go', b'0', NULL),
(304, 'Pie Shell - 9', 'Food', 132, 977, 'Training', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\r\n\r\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\r\n\r\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 'Hibou', b'0', NULL),
(305, 'Mix - Cappucino Cocktail', 'Groceries', 897, 357, 'Legal', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\r\n\r\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\r\n\r\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 'Booster', b'0', NULL),
(306, 'Bread - Calabrese Baguette', 'Groceries', 419, 15, 'Services', 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', 'Hibou', b'0', NULL),
(307, 'Steel Wool S.o.s', 'Food', 459, 730, 'Human Resources', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\r\n\r\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 'Booster', b'1', NULL),
(308, 'Butter Balls Salted', 'Electronics', 472, 586, 'Accounting', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 'Starbucks', b'0', NULL),
(309, 'Bagelers - Cinn / Brown', 'Clothing', 501, 449, 'Product Management', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 'Spinneys', b'0', NULL),
(310, 'Wine - Pinot Noir Pond Haddock', 'Food', 94, 198, 'Marketing', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\r\n\r\nPhasellus in felis. Donec semper sapien a libero. Nam dui.', 'Grab & Go', b'1', NULL),
(312, 'Fennel', 'Food', 907, 496, 'Marketing', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 'Starbucks', b'1', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `purchase_t`
--

DROP TABLE IF EXISTS `purchase_t`;
CREATE TABLE IF NOT EXISTS `purchase_t` (
  `purchase_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_username` varchar(200) NOT NULL,
  `product_id` int(11) NOT NULL,
  `vendor_username` varchar(200) NOT NULL,
  `purchase_date` datetime NOT NULL,
  `purchase_finalized` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`purchase_id`),
  UNIQUE KEY `purchase_id_UNIQUE` (`purchase_id`),
  KEY `fk_Purchase_T_User_T1_idx` (`user_username`),
  KEY `fk_Purchase_T_Product_T1_idx` (`product_id`),
  KEY `vendor_username` (`vendor_username`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `purchase_t`
--

INSERT INTO `purchase_t` (`purchase_id`, `user_username`, `product_id`, `vendor_username`, `purchase_date`, `purchase_finalized`) VALUES
(5, 'rbtkay', 254, 'Hibou', '2019-03-07 00:00:00', b'1'),
(9, 'lola', 256, 'Hibou', '2019-03-06 00:00:00', b'1'),
(10, 'rbtkay', 260, 'AUST', '2019-03-07 00:00:00', b'0'),
(11, 'rbtkay', 260, 'AUST', '2019-03-07 00:00:00', b'0'),
(12, 'rbtkay', 260, 'AUST', '2019-03-07 00:00:00', b'0'),
(13, 'rbtkay', 260, 'AUST', '2019-03-07 00:00:00', b'0'),
(14, 'rbtkay', 267, 'Starbucks', '2019-03-31 22:46:13', b'1'),
(15, 'rbtkay', 260, 'AUST', '2019-03-31 23:47:12', b'0'),
(16, 'rbtkay', 301, 'Starbucks', '2019-03-31 23:36:18', b'0'),
(17, 'rbtkay', 272, 'AUST', '2019-03-31 23:04:20', b'0'),
(18, 'rbtkay', 272, 'AUST', '2019-03-31 23:42:21', b'0'),
(19, 'rbtkay', 256, 'Hibou', '2019-03-31 23:12:24', b'0'),
(20, 'rbtkay', 304, 'Hibou', '2019-03-31 23:35:26', b'0'),
(21, 'rbtkay', 260, 'AUST', '2019-04-01 00:26:14', b'0'),
(22, 'rbtkay', 283, 'AUST', '2019-04-01 00:59:16', b'0'),
(23, 'rbtkay', 307, 'Booster', '2019-04-01 00:44:18', b'0'),
(24, 'rbtkay', 255, 'Starbucks', '2019-04-01 01:17:13', b'0'),
(25, 'rbtkay', 255, 'Starbucks', '2019-04-01 01:23:14', b'0'),
(26, 'rbtkay', 255, 'Starbucks', '2019-04-01 01:45:16', b'0'),
(27, 'rbtkay', 255, 'Starbucks', '2019-04-01 01:00:20', b'0'),
(28, 'rbtkay', 267, 'Starbucks', '2019-04-04 18:45:47', b'0'),
(29, 'kvnbog', 268, 'AUST', '2019-04-07 19:22:05', b'0'),
(30, 'kvnbog', 268, 'AUST', '2019-04-07 19:13:09', b'0'),
(31, 'bob', 264, 'AUST', '2019-04-07 19:11:11', b'0'),
(32, 'bob', 264, 'AUST', '2019-04-07 19:57:11', b'0');

-- --------------------------------------------------------

--
-- Table structure for table `user_t`
--

DROP TABLE IF EXISTS `user_t`;
CREATE TABLE IF NOT EXISTS `user_t` (
  `user_username` varchar(200) NOT NULL,
  `user_email` varchar(200) NOT NULL,
  `user_password` varchar(200) NOT NULL,
  `user_name` varchar(200) NOT NULL,
  `user_dob` date NOT NULL,
  `user_gender` char(1) NOT NULL,
  `user_phone` varchar(45) NOT NULL,
  `user_prefs` varchar(10000) DEFAULT NULL,
  `user_address` varchar(100) NOT NULL,
  `user_country` varchar(45) NOT NULL,
  `user_profession` varchar(45) DEFAULT NULL,
  `user_organization` varchar(200) DEFAULT NULL,
  `user_verified` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`user_username`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_t`
--

INSERT INTO `user_t` (`user_username`, `user_email`, `user_password`, `user_name`, `user_dob`, `user_gender`, `user_phone`, `user_prefs`, `user_address`, `user_country`, `user_profession`, `user_organization`, `user_verified`) VALUES
('bob', 'robert.g.khayat@gmail.com', 'be178c0543eb17f5f3043021c9e5fcf30285e557a4fc309cce97ff9ca6182912', 'robert', '2019-04-20', 'M', '03060933', '', '0x6925e5359D79ad3c7FC2B6D1758D2EC9ecdc7C50', 'Algeria', 'student', 'Mr. Green', b'1'),
('caro', 'caroline.bergqvist11@gmail.com', 'be178c0543eb17f5f3043021c9e5fcf30285e557a4fc309cce97ff9ca6182912', 'caroline', '2019-04-16', 'F', '03060933', '', '0x716De529C052fc9E0730c77929325665a2fecdC1', 'Algeria', 'designer', 'My Easy Prints', b'0'),
('kvnbog', 'kevin.boghossian@gmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'Kevin Boghossian', '1993-09-29', 'M', '70-140296', '', '0x4fC91B1d7901E2981dC7E624867dc85815EFF7b3', 'United States of America', 'Student', 'LOCO', b'1'),
('lola', 'lola@gmail.com', 'lalala', 'lolita', '2019-03-01', 'F', '030303033', 'Groceries', '0v0sz0dvrserv0aerbaerb', 'France', 'doctor', 'AUB', b'0'),
('rbtkay', 'robert@gmail.com', 'be178c0543eb17f5f3043021c9e5fcf30285e557a4fc309cce97ff9ca6182912', 'robert', '2019-03-02', 'M', '70657300', 'electronics, food', '0x3b06F9c9968A2f4CAAA87012D923748d3324BEd8', 'Lebanon', 'Doctor', 'Hotel Dieu', b'1');

-- --------------------------------------------------------

--
-- Table structure for table `vendor_t`
--

DROP TABLE IF EXISTS `vendor_t`;
CREATE TABLE IF NOT EXISTS `vendor_t` (
  `vendor_username` varchar(200) NOT NULL,
  `vendor_email` varchar(200) NOT NULL,
  `vendor_password` varchar(200) NOT NULL,
  `vendor_name` varchar(200) DEFAULT NULL,
  `vendor_phone` varchar(45) DEFAULT NULL,
  `vendor_location` varchar(200) DEFAULT NULL,
  `vendor_tag` varchar(200) DEFAULT NULL,
  `vendor_address` varchar(45) DEFAULT NULL,
  `vendor_verified` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`vendor_username`),
  UNIQUE KEY `vendor_email_UNIQUE` (`vendor_username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vendor_t`
--

INSERT INTO `vendor_t` (`vendor_username`, `vendor_email`, `vendor_password`, `vendor_name`, `vendor_phone`, `vendor_location`, `vendor_tag`, `vendor_address`, `vendor_verified`) VALUES
('AUST', 'Aust@gmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'AUST', '0306030', NULL, NULL, '0xea921F03887d1ADDd0f4e19056A70ABC5BfFC900', b'1'),
('Booster', 'Booster@gmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', NULL, NULL, NULL, NULL, '0xea921F03887d1ADDd0f4e19056A70ABC5BfFC900', b'1'),
('Grab & Go', 'Gng@gmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'Grab and Go', '352342234', NULL, NULL, '0xea921F03887d1ADDd0f4e19056A70ABC5BfFC900', b'1'),
('Hibou', 'hibou@gmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'Hibou', '03060908', 'Achrafieh', 'Groceries', '0xea921F03887d1ADDd0f4e19056A70ABC5BfFC900', b'1'),
('hndth', 'dntrh', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'tnhdfthd', 'dhnt', 'dnyj', NULL, '0xea921F03887d1ADDd0f4e19056A70ABC5BfFC900', b'1'),
('kvn', 'kevin@gmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'kevin', '03060933', 'beyrouth', NULL, '0xea921F03887d1ADDd0f4e19056A70ABC5BfFC900', b'1'),
('Spinneys', 'Spinneys@gmail', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'Spinneys Supermarket', '265452', NULL, NULL, '0xea921F03887d1ADDd0f4e19056A70ABC5BfFC900', b'1'),
('Starbucks', 'Starbucks@gmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', NULL, NULL, NULL, NULL, '0xea921F03887d1ADDd0f4e19056A70ABC5BfFC900', b'1');

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
  ADD CONSTRAINT `fk_Purchase_T_User_T` FOREIGN KEY (`user_username`) REFERENCES `user_t` (`user_username`),
  ADD CONSTRAINT `fk_Purchase_T_Vendor_T` FOREIGN KEY (`vendor_username`) REFERENCES `vendor_t` (`vendor_username`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
