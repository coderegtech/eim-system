-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 16, 2025 at 02:31 PM
-- Server version: 10.6.18-MariaDB-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.20
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;
--
-- Database: `eim-db`
--

-- --------------------------------------------------------
--
-- Table structure for table `Categories`
--

CREATE TABLE `Categories` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `createdAt` datetime(3) DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (
    `id`,
    `name`,
    `description`,
    `createdAt`,
    `updatedAt`
  )
VALUES (
    7,
    'Electronics',
    'Devices and gadgets including smartphones, laptops, and other consumer electronics.',
    '2024-08-27 01:52:23.992',
    '2024-08-27 01:52:23.992'
  ),
  (
    8,
    'Home Appliances',
    'Appliances for home use such as refrigerators, washing machines, and microwaves.',
    '2024-08-27 01:52:33.626',
    '2024-08-27 01:52:33.626'
  ),
  (
    9,
    'Gaming',
    'Gaming consoles, accessories, and gaming PCs.',
    '2024-08-27 01:52:42.105',
    '2024-08-27 01:52:42.105'
  ),
  (
    10,
    'Fashion',
    'Clothing, accessories, and footwear for men, women, and children.',
    '2024-08-27 01:52:58.941',
    '2024-08-27 01:52:58.941'
  );
-- --------------------------------------------------------
--
-- Table structure for table `Customers`
--

CREATE TABLE `Customers` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `address` text NOT NULL,
  `phoneNumber` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) DEFAULT NULL,
  `customerProfile` varchar(191) DEFAULT NULL,
  `city` varchar(191) DEFAULT NULL,
  `postalCode` varchar(191) DEFAULT NULL,
  `country` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- --------------------------------------------------------
--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `id` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `orderDate` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `totalAmount` double NOT NULL,
  `status` varchar(191) NOT NULL,
  `createdAt` datetime(3) DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- --------------------------------------------------------
--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `id` int(11) NOT NULL,
  `productImg` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `price` double NOT NULL,
  `description` longtext DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `supplierId` int(11) NOT NULL,
  `createdAt` datetime(3) DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (
    `id`,
    `productImg`,
    `name`,
    `categoryId`,
    `price`,
    `description`,
    `quantity`,
    `supplierId`,
    `createdAt`,
    `updatedAt`
  )
VALUES (
    2,
    '1726558821342-12.jpg',
    'iPhone 16 and iPhone 16 Plus - Apple',
    7,
    100000,
    'iPhone 16 is the first iPhone designed for Apple Intelligence, a personal and powerful system that helps you write, express yourself, and get things done effortlessly. It features a new camera system, a chip that boosts battery life, and a clickable Camera Control.',
    100,
    2,
    '2024-09-17 07:40:21.356',
    '2024-09-17 07:40:21.356'
  );
-- --------------------------------------------------------
--
-- Table structure for table `Reviews`
--

CREATE TABLE `Reviews` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `reviewText` text DEFAULT NULL,
  `reviewDate` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `createdAt` datetime(3) DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- --------------------------------------------------------
--
-- Table structure for table `Suppliers`
--

CREATE TABLE `Suppliers` (
  `id` int(11) NOT NULL,
  `contactName` varchar(191) NOT NULL,
  `phoneNumber` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(191) DEFAULT NULL,
  `postalCode` varchar(191) DEFAULT NULL,
  `country` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) DEFAULT NULL,
  `supplierName` varchar(191) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
-- Dumping data for table `Suppliers`
--

INSERT INTO `Suppliers` (
    `id`,
    `contactName`,
    `phoneNumber`,
    `email`,
    `address`,
    `city`,
    `postalCode`,
    `country`,
    `createdAt`,
    `updatedAt`,
    `supplierName`
  )
VALUES (
    1,
    'John Doe',
    '+1-800-555-1234',
    'john.doe@techsupply.com',
    '123 Tech Avenue',
    'San Francisco',
    '94107',
    'USA',
    '2024-08-27 01:49:09.902',
    '2024-08-27 01:49:09.902',
    'TechSupply Co.'
  ),
  (
    2,
    'Jane Smith',
    '+44-20-7946-0958',
    'jane.smith@gadgetworld.co.uk',
    '45 Gadget Street',
    'London',
    'EC1A 1BB',
    'UK',
    '2024-08-27 01:49:21.832',
    '2024-08-27 01:49:21.832',
    'Gadget World'
  ),
  (
    3,
    'Carlos Mendes',
    '+55-11-91234-5678',
    'carlos.mendes@digitalgoods.com.br',
    '789 Digital Plaza',
    'São Paulo',
    '01310-200',
    'Brazil',
    '2024-08-27 01:51:56.172',
    '2024-08-27 01:51:56.172',
    'Digital Goods Ltd.'
  ),
  (
    4,
    'Emily Chen',
    '+86-21-1234-5678',
    'emily.chen@componentwarehouse.cn',
    '101 Supply Lane',
    'Shanghai',
    '200120',
    'China',
    '2024-08-27 01:52:06.770',
    '2024-08-27 01:52:06.770',
    'Component Warehouse'
  ),
  (
    5,
    'Mohammed Al-Farsi',
    '+971-4-888-0000',
    'mohammed.alfarsi@electrohub.ae',
    '202 Tech Boulevard',
    'Dubai',
    '00000',
    'UAE',
    '2024-08-27 07:12:10.814',
    '2024-08-27 07:12:10.814',
    'ElectroHub'
  );
-- --------------------------------------------------------
--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` int(11) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `username` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `createdAt` datetime(3) DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- --------------------------------------------------------
--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (
    `id`,
    `checksum`,
    `finished_at`,
    `migration_name`,
    `logs`,
    `rolled_back_at`,
    `started_at`,
    `applied_steps_count`
  )
VALUES (
    '4b972d0f-7649-4f70-9656-9abc940c1c9b',
    '00a73ae83fac4aea0cabf33cf5ff24402e65a7db7b660b446e8e72c93c183621',
    '2023-07-09 04:25:55.876',
    '20230602035155_init',
    NULL,
    NULL,
    '2023-07-09 04:25:55.598',
    1
  ),
  (
    '564b19f4-42f2-40d9-8dcb-076bb73ad833',
    '4bf8b4aaa63e7dcda6c99dcd51a16568b48f27d8be51578daa3c7c69ec30cc0b',
    '2024-08-20 05:18:53.193',
    '20240806180830_init',
    NULL,
    NULL,
    '2024-08-20 05:18:53.142',
    1
  ),
  (
    '8f12b91f-ff6d-4a71-8971-d4fddfdd9ef1',
    'afb72443970c820057c51d570798ad6d79750ccf493622152e08d4ebaf1192b8',
    '2023-07-09 04:26:00.375',
    '20230709042600_init',
    NULL,
    NULL,
    '2023-07-09 04:26:00.339',
    1
  ),
  (
    '9735b7bb-46d3-459c-95f7-96a95fd4484a',
    '5f4506cf3e1c47a9f137f3724c7394a268c02e36bdc90e3ff7ad6a25540cd014',
    '2024-08-20 05:18:53.784',
    '20240820051853_init',
    NULL,
    NULL,
    '2024-08-20 05:18:53.712',
    1
  );
--
-- Indexes for dumped tables
--

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Categories_id_key` (`id`),
  ADD UNIQUE KEY `Categories_name_key` (`name`);
--
-- Indexes for table `Customers`
--
ALTER TABLE `Customers`
ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Customers_id_key` (`id`),
  ADD UNIQUE KEY `Customers_phoneNumber_key` (`phoneNumber`),
  ADD UNIQUE KEY `Customers_email_key` (`email`);
--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Orders_id_key` (`id`),
  ADD KEY `Orders_customerId_fkey` (`customerId`),
  ADD KEY `Orders_productId_fkey` (`productId`);
--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Products_id_key` (`id`),
  ADD KEY `Products_categoryId_fkey` (`categoryId`),
  ADD KEY `Products_supplierId_fkey` (`supplierId`);
--
-- Indexes for table `Reviews`
--
ALTER TABLE `Reviews`
ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Reviews_id_key` (`id`),
  ADD KEY `Reviews_productId_fkey` (`productId`),
  ADD KEY `Reviews_customerId_fkey` (`customerId`);
--
-- Indexes for table `Suppliers`
--
ALTER TABLE `Suppliers`
ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Suppliers_id_key` (`id`),
  ADD UNIQUE KEY `Suppliers_phoneNumber_key` (`phoneNumber`),
  ADD UNIQUE KEY `Suppliers_email_key` (`email`);
--
-- Indexes for table `User`
--
ALTER TABLE `User`
ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_id_key` (`id`),
  ADD UNIQUE KEY `User_userId_key` (`userId`),
  ADD UNIQUE KEY `User_username_key` (`username`);
--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
ADD PRIMARY KEY (`id`);
--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Categories`
--
ALTER TABLE `Categories`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 11;
--
-- AUTO_INCREMENT for table `Customers`
--
ALTER TABLE `Customers`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 3;
--
-- AUTO_INCREMENT for table `Reviews`
--
ALTER TABLE `Reviews`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Suppliers`
--
ALTER TABLE `Suppliers`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 6;
--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `Orders`
--
ALTER TABLE `Orders`
ADD CONSTRAINT `Orders_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Orders_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Constraints for table `Products`
--
ALTER TABLE `Products`
ADD CONSTRAINT `Products_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Products_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Suppliers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Constraints for table `Reviews`
--
ALTER TABLE `Reviews`
ADD CONSTRAINT `Reviews_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Reviews_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`) ON UPDATE CASCADE;
COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;