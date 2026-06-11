-- MySQL dump 10.13  Distrib 8.0.46, for macos15 (arm64)
--
-- Host: localhost    Database: mis_portal
-- ------------------------------------------------------
-- Server version	9.6.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'a0e4f5f2-54ef-11f1-b091-eed873b42fce:1-55';

--
-- Dumping data for table `tbl_Achievement`
--

LOCK TABLES `tbl_Achievement` WRITE;
/*!40000 ALTER TABLE `tbl_Achievement` DISABLE KEYS */;
INSERT INTO `tbl_Achievement` VALUES (1,1,1,'2026-05-26',200.00,12000.00,'ABC Store','Good sales','2026-05-27 06:42:20',0),(3,1,1,'2026-05-27',100.00,5000.00,'Test Store','New entry','2026-05-27 07:00:14',1),(4,3,1,'2026-06-01',500.00,25000.00,'ABC Retail','Excellent sales','2026-06-04 07:26:25',1),(5,3,15,'2026-06-01',450.00,22500.00,'XYZ Traders','Top performer','2026-06-04 07:26:25',1),(6,4,18,'2026-06-02',400.00,20000.00,'Sharma Store','Good demand','2026-06-04 07:26:25',1),(7,4,20,'2026-06-02',380.00,19000.00,'Gupta Mart','Consistent sales','2026-06-04 07:26:25',1),(8,2,24,'2026-06-03',250.00,12500.00,'Verma General Store','Average sales','2026-06-04 07:26:25',1),(9,5,3,'2026-06-03',200.00,10000.00,'Sai Enterprises','Regular customer','2026-06-04 07:26:25',1);
/*!40000 ALTER TABLE `tbl_Achievement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbl_AuditLog`
--

LOCK TABLES `tbl_AuditLog` WRITE;
/*!40000 ALTER TABLE `tbl_AuditLog` DISABLE KEYS */;
INSERT INTO `tbl_AuditLog` VALUES (1,13,'INSERT','tbl_Users',NULL,'User auditfinal created','2026-05-29 16:42:32');
/*!40000 ALTER TABLE `tbl_AuditLog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbl_Product`
--

LOCK TABLES `tbl_Product` WRITE;
/*!40000 ALTER TABLE `tbl_Product` DISABLE KEYS */;
INSERT INTO `tbl_Product` VALUES (1,'P001','Coca Cola 500ml','Soft Drink','Bottle',0,'2026-05-23 16:47:00'),(2,'P002','Sprite 1L','Soft Drink','Bottle',1,'2026-05-23 16:47:00'),(3,'P003','Fanta 2L','Soft Drink','Bottle',1,'2026-05-23 16:47:00'),(4,'P101','Pepsi','Cold Drink','Bottle',1,'2026-05-26 08:02:54'),(15,'P102','Mountain Dew 500ml','Soft Drink','Bottle',1,'2026-06-04 07:19:12'),(16,'P103','7UP 1L','Soft Drink','Bottle',1,'2026-06-04 07:19:12'),(17,'P104','Maaza 600ml','Juice','Bottle',1,'2026-06-04 07:19:12'),(18,'P105','Slice 1L','Juice','Bottle',1,'2026-06-04 07:19:12'),(19,'P106','Red Bull 250ml','Energy Drink','Case',1,'2026-06-04 07:19:12'),(20,'P107','Monster Energy 500ml','Energy Drink','Crate',1,'2026-06-04 07:19:12'),(21,'P108','Appy Fizz 250ml','Fruit Drink','Bottle',1,'2026-06-04 07:19:12'),(22,'P109','Tropicana Orange 1L','Juice','Crate',1,'2026-06-04 07:19:12'),(23,'P110','Bisleri Water 1L','Water','Bottle',1,'2026-06-04 07:19:12'),(24,'P111','Kinley Water 500ml','Water','Case',1,'2026-06-04 07:19:12');
/*!40000 ALTER TABLE `tbl_Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbl_Region`
--

LOCK TABLES `tbl_Region` WRITE;
/*!40000 ALTER TABLE `tbl_Region` DISABLE KEYS */;
INSERT INTO `tbl_Region` VALUES (1,'NORTH','A','UP','BARABANKI',0,'2026-05-23 16:46:53'),(2,'West Region','West Zone','Maharashtra','Mumbai',1,'2026-05-23 16:46:53'),(3,'North','A','Uttar Pradesh','Lucknow',1,'2026-05-26 07:24:22');
/*!40000 ALTER TABLE `tbl_Region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbl_SalesPerson`
--

LOCK TABLES `tbl_SalesPerson` WRITE;
/*!40000 ALTER TABLE `tbl_SalesPerson` DISABLE KEYS */;
INSERT INTO `tbl_SalesPerson` VALUES (1,'SP001','Rahul Sharma','rahul@gmail.com',1,NULL,0,'2026-05-23 16:47:10'),(2,'SP002','Priya Singh','priya@example.com',2,2,1,'2026-05-23 16:47:10'),(3,'SP003','Rahul Sharma','rahul@test.com',1,12,1,'2026-06-04 07:14:39'),(4,'SP004','Priya Singh','priya@test.com',2,13,1,'2026-06-04 07:14:39'),(5,'SP005','Amit Kumar','amit@test.com',1,14,1,'2026-06-04 07:14:39');
/*!40000 ALTER TABLE `tbl_SalesPerson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbl_Target`
--

LOCK TABLES `tbl_Target` WRITE;
/*!40000 ALTER TABLE `tbl_Target` DISABLE KEYS */;
INSERT INTO `tbl_Target` VALUES (1,1,1,'2026-05-01',1000.00,50000.00,0,'2026-05-26 08:45:22'),(2,1,1,'2026-06-01',1200.00,60000.00,1,'2026-05-28 16:27:06'),(3,1,1,'2026-07-01',1200.00,100000.00,1,'2026-05-31 19:50:00');
/*!40000 ALTER TABLE `tbl_Target` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbl_Users`
--

LOCK TABLES `tbl_Users` WRITE;
/*!40000 ALTER TABLE `tbl_Users` DISABLE KEYS */;
INSERT INTO `tbl_Users` VALUES (2,'manager1','$2b$10$RX78El/dxj.Jtwjv4RxR1u0kwvlhc0l8wguYJryXNM0L57F4Buvb.','Manager','manager@misportal.com',0,'2026-05-23 16:47:05'),(12,'Aashi','$2b$10$//wtG2EXVjbZl.Wvc235lOfZQXk7/rOMFJ0cp8f7xEFJi8frwJh6y','Admin','ashi90@gmail.com',1,'2026-05-23 16:55:19'),(13,'adminUpdated','$2b$10$mWEnOOtRfq6MEKAGqmk2DOy0QtZfL.DsccmC/t2fy2bB0SRlGjXcG','Admin','adminUpdated@test.com',0,'2026-05-28 16:22:17'),(14,'sales1','$2b$10$Xb0nI6ZxkYicy9WGtPl.ru4reJAUvnnJqoGc/AlJh.4KJEPOYahsu','Sales Executive','sales1@test.com',1,'2026-05-28 16:33:02'),(17,'sales02','$2b$10$t7D//44kWVYdDQCkoLS3HeM7G72n1Ceyr7Jrrzdo1nAkNi1MGy6DK','Sales Executive','sales02@test.com',1,'2026-05-28 16:39:08'),(18,'manager2','$2b$10$qbNxfGTe.CKAnrjEpcFWV.zp29axVN4w0xYGPUswCFxFoVD.Xxub.','Manager','manager2@test.com',1,'2026-05-29 11:11:39'),(19,'auditfinal','$2b$10$ctqwcaex0mTSzv05y9xPIe0a5B8.9k.W6oUvLloUebbQQ5XFMVsCu','Viewer','auditfinal@test.com',1,'2026-05-29 16:42:32');
/*!40000 ALTER TABLE `tbl_Users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-11 13:04:34
