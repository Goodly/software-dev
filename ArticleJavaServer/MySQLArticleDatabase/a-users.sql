-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: publiceditor
-- ------------------------------------------------------
-- Server version 8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `publiceditor`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `publiceditor` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `publiceditor`;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(50) DEFAULT NULL,
  `author` char(50) DEFAULT NULL,
  `url` mediumtext,
  `publish_date` timestamp NULL DEFAULT NULL,
  `article_text` mediumtext,
  `author_name` char(50) DEFAULT NULL,
  `article_title` char(200) DEFAULT NULL,
  `article_amplifiers` varchar(500) DEFAULT NULL,
  `domain_name` char(100) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  `buzzsumo_article_id` int(11) DEFAULT NULL,
  `published_date` int(11) DEFAULT NULL,
  `total_shares` int(11) DEFAULT NULL,
  `thumbnail_url` char(200) DEFAULT NULL,
  `num_words` int(11) DEFAULT NULL,
  `alexa_rank` int(11) DEFAULT NULL,
  `twitter_shares` int(11) DEFAULT NULL,
  `love_count` int(11) DEFAULT NULL,
  `evergreen_score` double DEFAULT NULL,
  `total_reddit_engagements` int(11) DEFAULT NULL,
  `wow_count` int(11) DEFAULT NULL,
  `facebook_likes` int(11) DEFAULT NULL,
  `facebook_comments` int(11) DEFAULT NULL,
  `sad_count` int(11) DEFAULT NULL,
  `total_facebook_shares` int(11) DEFAULT NULL,
  `angry_count` int(11) DEFAULT NULL,
  `facebook_shares` int(11) DEFAULT NULL,
  `num_linking_domains` int(11) DEFAULT NULL,
  `haha_count` int(11) DEFAULT NULL,
  `vis_data` mediumtext,
  `tagworks_id` int(11) DEFAULT NULL,
  `article_hash` char(64) DEFAULT NULL,
  `filename` text NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES 
(1
,'the meaning of life'
,'anonymous'
,'www.life.com/meaning.htm'
,'2012-01-01 15:00:00'
,'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.'
,'ggggg'
,'the meaning of life'
,NULL
,NULL
,234234234
,234234234
,234234234
,3333
,''
,444
,33
,3333
,44
,0.55
,444
,55
,666
,777
,44
,44
,44
,44
,44
,44
,NULL
,NULL
,NULL
,NULL)
,(2
,'the meaning of happiness'
,'buddha'
,'www.happinesstimes.com/happiness-meanng.html'
,'2012-02-02 15:00:00'
,'Scelerisque varius morbi enim nunc faucibus a. Laoreet id donec ultrices tincidunt arcu non sodales neque. Mi quis hendrerit dolor magna. Sapien eget mi proin sed libero enim. Nibh tortor id aliquet lectus. Nulla facilisi morbi tempus iaculis urna id volutpat lacus. Ipsum a arcu cursus vitae congue mauris rhoncus. Nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit. Faucibus ornare suspendisse sed nisi lacus. Mattis enim ut tellus elementum sagittis vitae et.'
,NULL
,'the meaning of happiness'
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL)
,(3
,''
,''
,'https://www.google.com'
,'2019-10-27 16:51:32'
,'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non nisi. Eu mi bibendum neque egestas congue quisque. Tortor at risus viverra adipiscing at in tellus integer feugiat. Vel turpis nunc eget lorem dolor. Massa massa ultricies mi quis hendrerit dolor magna eget est. Faucibus et molestie ac feugiat sed lectus vestibulum. Massa tincidunt dui ut ornare lectus sit amet. Vel eros donec ac odio tempor. Nec feugiat nisl pretium fusce id velit. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque.'
,NULL
,'hijklmnop hijklmnop'
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL
,NULL)
,(4
,''
,''
,'www.washingtonpost.com/politics/as-warren-and-buttigieg-rise-the-democratic-presidential-race-is-competitive-and-fluid-a-washington-post-abc-news-poll-finds/2019/11/02/4b7aca3c-fccd-11e9-8906-ab6b60de9124_story.html'
,'2019-11-11 04:28:28'
,'With peak winds of 185 mph Hurricane Dorian became the strongest storm on record to strike the Bahamas Sunday and among the top few most intense ever observed in the Atlantic Ocean. The Category 5 storm next threatens to bring hurricane force winds coastal flooding and heavy rain to the east coast of Florida and Southeast U.S.\r\n\r\nDorian’s winds had only eased modestly down to 180 mph at 11 p.m. Sunday still generating “catastrophic conditions” in the northern Bahamas. The National Hurricane Center stated the storm made landfall on Grand Bahama Island at 11 p.m. after slamming into Great Abaco earlier in the day.\r\n\r\n“Dorian remains an incredibly powerful hurricane” the Hurricane Center wrote.\r\n\r\nAs the storm closes in on Florida’s east coast the National Hurricane Center has posted hurricane and storm surge warnings for some areas. The storm surge is the storm-driven rise in water above normally dry land at the coast:\r\n\r\nThe hurricane warning stretches from Jupiter Inlet (just north of West Palm Beach) to the Volusia/Brevard county line (just north of Titusville).\r\n\r\nThe storm surge warning spans from near West Palm Beach to Titusville. In some areas the surge could reach 4 to 7 feet the Hurricane Center projects.\r\n\r\nThese warnings are focused on the period from Monday night through early Wednesday. Tropical storm-force winds could begin in south Florida as soon as Monday afternoon and continue into Tuesday and Wednesday perhaps reaching hurricane-force Tuesday depending how close to the coast Dorian tracks.\r\n\r\nIn addition to the wind and surge about to three to six inches of rain is projected along Florida’s east coast.\r\n\r\nAlthough the center of Dorian containing its extreme Category 5 winds may remain offshore Florida'
,NULL
,''
,''
,''
,0
,0
,0
,0
,NULL
,NULL
,0
,0
,0
,0
,0
,0
,0
,0
,0
,0
,0
,0
,0
,0
,NULL
,NULL
,NULL
,NULL)
,(27
,''
,'Karoun Demirjian'
,'https://www.washingtonpost.com/politics/senate-gop-defends-trump-despite-oath-to-be-impartial-impeachment-jurors/2019/12/15/1dd9ed8a-1f49-11ea-86f3-3b5019d451db_story.html'
,'2019-12-15 18:48:43'
,'“That’s in violation of the oath that they’re about to take and it’s a complete subversion of the constitutional scheme” Nadler said.\r\n\r\nAD\r\n\r\nSenators take an oath to “do impartial justice” at the start of any impeachment trial — but several Republican senators argued that impartiality doesn’t cover politics.\r\n\r\nAD\r\n\r\n“I am clearly made up my mind. I’m not trying to hide the fact that I have disdain for the accusations in the process” Sen. Lindsey O. Graham (R-S.C.) said Sunday on CBS’s “Face the Nation.”\r\n\r\nGraham called “this whole thing” a “crock” and warned that Democrats were “weaponizing impeachment.”\r\n\r\n“I want to end it. I don’t want to legitimize it” he said.\r\n\r\n“Senators are not required like jurors in a criminal trial to be sequestered not to talk to anyone not to coordinate. There’s no prohibition” Sen. Ted Cruz (R-Tex.) said on “This Week” calling impeachment “inherently a political exercise” and Trump’s impeachment a “partisan show trial.”\r\n\r\nAD\r\n\r\nSen. Rand Paul (R-Ky.) speaking Sunday on CNN’s “State of the Union” also argued that there was nothing wrong with senators having already made up their minds. Calling impeachment an effort to “criminalize politics” he noted that “we’re going to hear the evidence repeated but we’re not going to hear any new evidence.”\r\n\r\nAD\r\n\r\nSenate GOP leaders have been telling allies that they want to limit the trial to a short proceeding omitting any witnesses from testifying. That isn’t sitting well with House Democratic leaders who contend that senators should use their trial to secure evidence and testimony that the White House prevented House investigators from accessing.\r\n\r\n“They don’t want the American people to see the facts” House Intelligence Committee Chairman Adam B. Schiff (D-Calif.) said Sunday on ABC appearing alongside Nadler.\r\n\r\nAD\r\n\r\n“They realize that what’s been presented in the House is already overwhelming but that there’s more damning evidence to be had” Schiff continued. “I hope that the senators will insist on getting the documents on hearing from other witnesses on making up their own mind even if there are some senators who have decided out of their blind allegiance to this president that he can do nothing wrong.”\r\n\r\nAD\r\n\r\nNadler added that senators should “demand the testimony” of people like Secretary of State Mike Pompeo acting White House chief of staff Mick Mulvaney and former national security adviser John Bolton “who at the president’s instruction have refused to testify.”\r\n\r\nThere are some Senate Republicans who want to hear from witnesses at the trial. But they aren’t thinking about Pompeo Mulvaney and Bolton; they’re thinking about the whistleblower and Hunter Biden.\r\n\r\nAD\r\n\r\n“You can be sure we’re going to allow the president to defend himself” Cruz said adding: “That means I believe if the president wants to call witnesses if the president wants to call Hunter Biden or wants to call the whistleblower the senate should allow the president to do so.”\r\n\r\nHunter Biden son of former vice president Joe Biden sat on the board of Ukrainian energy company Burisma for five years and was paid as much as $50000 a month despite having no expertise on the subject matter. As Democrats have made the case that Trump tried to use his office to pressure a foreign leader into announcing investigations against a political rival several Republicans have rallied around the countercharge that Trump was right to be concerned about “corruption” involving the Bidens — though it does not appear that Joe Biden who was closely involved in Ukraine policy made any decisions to advantage the company.\r\n\r\nAD\r\n\r\n“I love Joe Biden but none of us are above scrutiny” Graham said Sunday noting there were “legitimate concerns” about Hunter Biden’s activity. But he added that the Senate could look at all of those issues — as well as whatever new information Trump’s lawyer Rudolph W. Giuliani unearthed in his latest trip to Ukraine — “after impeachment” and should move ahead without witnesses.\r\n\r\nAD\r\n\r\nIt is not clear whether the senate will be forced to hold separate votes on witnesses — or if most of the GOP would hold rank in that situation. It takes 51 senators to approve a motion. There are 53 Republicans in the Senate meaning the GOP can afford to lose no more than two senators on any motion for McConnell to fully control the course of the trial.\r\n\r\nPaul guessed that ultimately two Democratic senators would end up joining all Republicans in voting to acquit Trump just as a handful of Democrats are expected to join the GOP in the House to vote against impeachment.\r\n\r\nAD\r\n\r\nPaul did not say who those two Democrats might be. At this point some Democratic senators are taking pains to avoid committing to vote to convict the president even if they are otherwise echoing House Democrats’ frustrations with the president’s actions.\r\n\r\nSen. Sherrod Brown (D-Ohio) said on “State of the Union” that Trump “did things Richard Nixon never did.” But he hedged when asked whether Trump’s transgressions rose to the need for removal noting that senators should make that decision “based on the evidence.”\r\n\r\nAD\r\n'
,NULL
,'Senate GOP defends Trump despite oath to be impartial impeachment jurors'
,''
,'washingtonpost.com'
,0
,1711363848
,0
,582
,NULL
,NULL
,156
,182
,0
,0.86
,72
,0
,160
,101
,0
,0
,0
,328
,3
,0
,NULL
,NULL
,NULL
,NULL)
,(60
,''
,'Rosalind S. Helderman'
,'https://www.washingtonpost.com/politics/once-this-is-over-well-be-kings-how-lev-parnas-worked-his-way-into-trumps-world--and-now-is-rattling-it/2020/01/18/68542ff4-3940-11ea-9541-9107303481a4_story.html'
,'2020-01-20 18:27:33'
,'ffffffffffffff'
,NULL
,'‘Once this is over we’ll be kings’: How Lev Parnas worked his way into Trump’s world'
,''
,'washingtonpost.com'
,0
,1814934879
,0
,16224
,NULL
,NULL
,166
,4914
,23
,0.97
,1553
,244
,5687
,1506
,37
,0
,374
,9737
,21
,207
,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
,NULL
,NULL
,NULL)
;
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `article_current_status`
--

DROP TABLE IF EXISTS `article_current_status`;
/*!50001 DROP VIEW IF EXISTS `article_current_status`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `article_current_status` AS SELECT 
 1 AS `id`,
 1 AS `title`,
 1 AS `author`,
 1 AS `url`,
 1 AS `publish_date`,
 1 AS `article_text`,
 1 AS `status_code`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `article_has_status`
--

DROP TABLE IF EXISTS `article_has_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_has_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(11) DEFAULT NULL,
  `article_status_id` int(11) DEFAULT NULL,
  `date_changed` timestamp NULL DEFAULT NULL,
  `comment` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_has_status`
--

LOCK TABLES `article_has_status` WRITE;
/*!40000 ALTER TABLE `article_has_status` DISABLE KEYS */;
INSERT INTO `article_has_status` VALUES (1,1,1,'2019-09-19 03:29:00','aaaaa'),(2,2,1,'2019-09-19 03:29:00','bbbbb'),(3,2,2,'2019-09-19 04:29:00','ccc'),(4,3,1,'2019-10-27 16:51:32',''),(5,4,2,'2019-11-11 04:28:28',''),(6,5,2,'2019-12-08 16:44:42',''),(7,6,2,'2019-12-08 16:48:06',''),(8,7,2,'2019-12-08 16:54:51',''),(9,8,2,'2019-12-08 16:56:29',''),(10,9,2,'2019-12-08 17:03:06',''),(11,10,2,'2019-12-08 17:04:50',''),(12,11,2,'2019-12-08 17:08:58',''),(13,12,2,'2019-12-08 17:31:14',''),(14,13,2,'2019-12-08 17:33:13',''),(15,14,2,'2019-12-08 17:42:57',''),(16,15,2,'2019-12-08 17:47:33',''),(17,16,2,'2019-12-08 17:48:38',''),(18,17,2,'2019-12-08 17:53:12',''),(19,18,2,'2019-12-08 17:54:27',''),(20,19,2,'2019-12-08 20:27:47',''),(21,20,2,'2019-12-08 20:29:28',''),(22,21,2,'2019-12-08 20:34:08',''),(23,22,2,'2019-12-08 20:36:53',''),(24,23,2,'2019-12-08 20:39:45',''),(25,24,2,'2019-12-08 20:42:18',''),(26,25,2,'2019-12-08 20:45:45',''),(27,26,2,'2019-12-15 18:43:43',''),(28,27,2,'2019-12-15 18:48:43',''),(29,28,2,'2019-12-22 17:30:34',''),(30,29,2,'2019-12-22 17:32:44',''),(31,30,2,'2019-12-22 17:35:39',''),(32,31,2,'2019-12-22 17:39:45',''),(33,32,2,'2019-12-22 17:42:14',''),(34,33,2,'2020-01-05 16:25:39',''),(35,34,2,'2020-01-05 16:53:18',''),(36,35,2,'2020-01-05 16:57:10',''),(37,36,2,'2020-01-05 16:58:41',''),(38,37,2,'2020-01-05 16:59:49',''),(39,38,2,'2020-01-05 17:19:38',''),(40,39,2,'2020-01-05 17:30:32',''),(41,40,2,'2020-01-05 17:32:27',''),(42,41,2,'2020-01-05 17:39:54',''),(43,42,2,'2020-01-11 17:55:39',''),(44,43,2,'2020-01-11 19:13:57',''),(45,44,2,'2020-01-11 19:52:29',''),(46,45,2,'2020-01-11 19:53:44',''),(47,46,2,'2020-01-11 19:56:04',''),(48,47,2,'2020-01-11 20:09:20',''),(49,48,2,'2020-01-11 20:12:19',''),(50,49,2,'2020-01-11 20:18:10',''),(51,50,2,'2020-01-11 20:21:16',''),(52,51,2,'2020-01-11 20:24:27',''),(53,52,2,'2020-01-11 20:29:25',''),(54,53,2,'2020-01-11 20:31:25',''),(55,54,2,'2020-01-11 20:31:37',''),(56,55,2,'2020-01-11 20:47:32',''),(57,56,2,'2020-01-11 20:49:01',''),(58,57,2,'2020-01-11 21:45:14',''),(59,58,2,'2020-01-12 18:16:09',''),(60,59,2,'2020-01-20 18:26:15',''),(61,60,2,'2020-01-20 18:27:33','');
/*!40000 ALTER TABLE `article_has_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article_status`
--

DROP TABLE IF EXISTS `article_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status_code` char(10) DEFAULT NULL,
  `status_text` char(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_status`
--

LOCK TABLES `article_status` WRITE;
/*!40000 ALTER TABLE `article_status` DISABLE KEYS */;
INSERT INTO `article_status` VALUES 
(1,'BUZZ','Url From BuzzFeed'),
(2,'USER','Url from User'),
(3,'APPROVED','NICK Approved for tag works'),
(4,'ERROR','Error'),
(5,'SENT','Sent to Tagworks');
/*!40000 ALTER TABLE `article_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `article_status_view`
--

DROP TABLE IF EXISTS `article_status_view`;
/*!50001 DROP VIEW IF EXISTS `article_status_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `article_status_view` AS SELECT 
 1 AS `id`,
 1 AS `article_id`,
 1 AS `date_changed`,
 1 AS `comment`,
 1 AS `status_code`,
 1 AS `status_text`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `article_sub_status_view`
--

DROP TABLE IF EXISTS `article_sub_status_view`;
/*!50001 DROP VIEW IF EXISTS `article_sub_status_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `article_sub_status_view` AS SELECT 
 1 AS `article_id`,
 1 AS `MaxDateTime`*/;
SET character_set_client = @saved_cs_client;

--
-- Current Database: `publiceditor`
--

USE `publiceditor`;

--
-- Final view structure for view `article_current_status`
--

/*!50001 DROP VIEW IF EXISTS `article_current_status`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `article_current_status` AS select `a`.`id` AS `id`,`a`.`title` AS `title`,`a`.`author` AS `author`,`a`.`url` AS `url`,`a`.`publish_date` AS `publish_date`,`a`.`article_text` AS `article_text`,`st`.`status_code` AS `status_code` from (((`article` `a` join `article_has_status` `ahs`) join `article_status` `st`) join `article_sub_status_view` `assv`) where ((`ahs`.`article_id` = `assv`.`article_id`) and (`ahs`.`date_changed` = `assv`.`MaxDateTime`) and (`a`.`id` = `assv`.`article_id`) and (`st`.`id` = `ahs`.`article_status_id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `article_status_view`
--

/*!50001 DROP VIEW IF EXISTS `article_status_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `article_status_view` AS select `ahs`.`id` AS `id`,`ahs`.`article_id` AS `article_id`,`ahs`.`date_changed` AS `date_changed`,`ahs`.`comment` AS `comment`,`ast`.`status_code` AS `status_code`,`ast`.`status_text` AS `status_text` from (`article_has_status` `ahs` join `article_status` `ast`) where (`ahs`.`article_status_id` = `ast`.`id`) order by `ahs`.`id` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `article_sub_status_view`
--

/*!50001 DROP VIEW IF EXISTS `article_sub_status_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `article_sub_status_view` AS select `article_has_status`.`article_id` AS `article_id`,max(`article_has_status`.`date_changed`) AS `MaxDateTime` from `article_has_status` group by `article_has_status`.`article_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-15 17:54:45
