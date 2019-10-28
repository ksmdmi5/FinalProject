-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema tooldepotdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `tooldepotdb` ;

-- -----------------------------------------------------
-- Schema tooldepotdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tooldepotdb` DEFAULT CHARACTER SET utf8 ;
USE `tooldepotdb` ;

-- -----------------------------------------------------
-- Table `address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `address` ;

CREATE TABLE IF NOT EXISTS `address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(100) NULL,
  `city` VARCHAR(45) NULL,
  `state` CHAR(2) NULL,
  `zip` CHAR(5) NULL,
  `country` CHAR(2) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `address_id` INT NOT NULL,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `enabled` TINYINT(1) NOT NULL,
  `role` VARCHAR(10) NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `email` VARCHAR(100) NULL,
  `phone` VARCHAR(20) NULL,
  `photo` VARCHAR(1000) NULL,
  `create_date` DATETIME NULL,
  `update_date` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_address1_idx` (`address_id` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  CONSTRAINT `fk_user_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tool`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tool` ;

CREATE TABLE IF NOT EXISTS `tool` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `tool_name` VARCHAR(100) NULL,
  `description` TEXT(2000) NULL,
  `tool_type` VARCHAR(45) NULL,
  `cost_per_day` DOUBLE NULL,
  `available` TINYINT(1) NULL,
  `manufacture_year` VARCHAR(4) NULL,
  `tool_condition` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tool_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_tool_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tool_rental`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tool_rental` ;

CREATE TABLE IF NOT EXISTS `tool_rental` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tool_id` INT NULL,
  `renter_id` INT NOT NULL,
  `checkout` DATETIME NULL,
  `returned` DATETIME NULL,
  `total_cost` DOUBLE NULL,
  `created_date` DATETIME NULL,
  `updated_date` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_transaction_tool1_idx` (`tool_id` ASC),
  INDEX `fk_tool_rental_renter_id_idx` (`renter_id` ASC),
  CONSTRAINT `fk_transaction_tool1`
    FOREIGN KEY (`tool_id`)
    REFERENCES `tool` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tool_rental_renter_id`
    FOREIGN KEY (`renter_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tool_photo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tool_photo` ;

CREATE TABLE IF NOT EXISTS `tool_photo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tool_id` INT NULL,
  `photo_url` VARCHAR(500) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tool_photo_tool_idx` (`tool_id` ASC),
  CONSTRAINT `fk_tool_photo_tool`
    FOREIGN KEY (`tool_id`)
    REFERENCES `tool` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `review_of_renter`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `review_of_renter` ;

CREATE TABLE IF NOT EXISTS `review_of_renter` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tool_rental_id` INT NULL,
  `tool_review` TEXT(2000) NULL,
  `tool_rating` INT NULL,
  `lender_review` TEXT(2000) NULL,
  `lender_rating` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_review_of_renter_tool_rental1_idx` (`tool_rental_id` ASC),
  CONSTRAINT `fk_review_of_renter_tool_rental1`
    FOREIGN KEY (`tool_rental_id`)
    REFERENCES `tool_rental` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `review_of_lender`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `review_of_lender` ;

CREATE TABLE IF NOT EXISTS `review_of_lender` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tool_rental_id` INT NULL,
  `renter_review` TEXT(2000) NULL,
  `renter_rating` DOUBLE NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_review_of_lender_tool_rental1_idx` (`tool_rental_id` ASC),
  CONSTRAINT `fk_review_of_lender_tool_rental1`
    FOREIGN KEY (`tool_rental_id`)
    REFERENCES `tool_rental` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `skill`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `skill` ;

CREATE TABLE IF NOT EXISTS `skill` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(500) NULL,
  `cost_per_hour` DOUBLE NULL,
  `available` TINYINT(1) NULL,
  `description` TEXT(2000) NULL,
  `expertise` VARCHAR(500) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user_skill`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_skill` ;

CREATE TABLE IF NOT EXISTS `user_skill` (
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `skill_id` INT NOT NULL,
  `certified` TINYINT(1) NULL,
  `experience` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_has_skill_skill1_idx` (`skill_id` ASC),
  INDEX `fk_user_has_skill_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_skill_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_skill_skill1`
    FOREIGN KEY (`skill_id`)
    REFERENCES `skill` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `skill_rental`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `skill_rental` ;

CREATE TABLE IF NOT EXISTS `skill_rental` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `renter_id` INT NOT NULL,
  `user_skill_id` INT NOT NULL,
  `start_date` DATETIME NULL,
  `finish_date` DATETIME NULL,
  `hours` INT NULL,
  `created_date` DATETIME NULL,
  `update_date` DATETIME NULL,
  `estimated_finish_date` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_skill_rental_renter_idx` (`renter_id` ASC),
  INDEX `fk_skill_rental_user_skill1_idx` (`user_skill_id` ASC),
  CONSTRAINT `fk_skill_rental_renter`
    FOREIGN KEY (`renter_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_skill_rental_user_skill1`
    FOREIGN KEY (`user_skill_id`)
    REFERENCES `user_skill` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `review_of_worker`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `review_of_worker` ;

CREATE TABLE IF NOT EXISTS `review_of_worker` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `skill_rental_id` INT NOT NULL,
  `worker_review` TEXT NULL,
  `worker_rating` INT NULL,
  `title` VARCHAR(500) NULL,
  `recommend` TINYINT(1) NULL,
  `finished_on_time` TINYINT(1) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_review_of_worker_skill_rental1_idx` (`skill_rental_id` ASC),
  CONSTRAINT `fk_review_of_worker_skill_rental1`
    FOREIGN KEY (`skill_rental_id`)
    REFERENCES `skill_rental` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `review_of_customer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `review_of_customer` ;

CREATE TABLE IF NOT EXISTS `review_of_customer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `skill_rental_id` INT NOT NULL,
  `customer_review` TEXT NULL,
  `customer_rating` INT NULL,
  `title` VARCHAR(500) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_review_of_customer_skill_rental1_idx` (`skill_rental_id` ASC),
  CONSTRAINT `fk_review_of_customer_skill_rental1`
    FOREIGN KEY (`skill_rental_id`)
    REFERENCES `skill_rental` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS tool@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'tool'@'localhost' IDENTIFIED BY 'tool';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'tool'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `address`
-- -----------------------------------------------------
START TRANSACTION;
USE `tooldepotdb`;
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (1, '123 Tool St', 'Tool', 'TO', '99999', 'US');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (2, '555 Admin Way', 'Admin', 'CO', '88888', 'US');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (3, '6820 E 75th PL', 'Commerce City', 'CO', '80022', 'US');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (4, '7567 Broadway ST', 'Denver', 'CO', '80022', 'US');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (5, '6155 Logan Pl', 'Centennial', 'CO', '80121', 'US');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (6, '10391 Tennyson CT\n', 'Westminster', 'CO', '80036', 'US');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (7, '509 Emporia ST\n', 'Aurora', 'CO', '80019', 'US');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (8, '1901 Youngfield St Ste 105, Golden', 'Golden', 'CO', '80401', 'US');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (9, '7837 W Jewell Ave', 'Lakewood', 'CO', '80232', 'US');
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `country`) VALUES (10, '3418 S Broadway', 'Englewood', 'CO', '80113', 'US');
COMMIT;


-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `tooldepotdb`;
INSERT INTO `user` (`id`, `address_id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `phone`, `photo`, `create_date`, `update_date`) VALUES (1, 1, 'admin', '$2a$10$aNWARjmakD5DkADI851RbeGyuElJUMfAelfciTVP1/tUI5AiAunAe', 1, 'admin', 'admin', 'admin', 'admin@admin.com', '123-456-7890', 'http://bit.ly/33QGafY', NULL, NULL);
INSERT INTO `user` (`id`, `address_id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `phone`, `photo`, `create_date`, `update_date`) VALUES (3, 3, 'josh', '$2a$10$3VUQSFrQL8lyUloI1hUk.e4fBPPZrxP.7BrfDbB7i3Bo4Et0APMKa', 1, 'user', 'Josh', 'Howell', 'josh@tooldepot.com', '458-489-6253', 'https://bit.ly/2MpfRrz', '2019-10-14 21:19:52', '2019-10-14 21:19:53');
INSERT INTO `user` (`id`, `address_id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `phone`, `photo`, `create_date`, `update_date`) VALUES (4, 4, 'alicia', '$2a$10$o8HY6CAEHkP5936ncklGau2DOwryTXJJM/8Mpv6zbuLQUal/Yeu5G', 1, 'user', 'Alicia', 'Glassmeyer', 'alicia@tooldepot.com', '254-896-3521', 'https://bit.ly/2pvn5kp', '2019-10-14 21:19:53', '2019-10-14 21:19:54');
INSERT INTO `user` (`id`, `address_id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `phone`, `photo`, `create_date`, `update_date`) VALUES (5, 5, 'joe', '$2a$10$kTw3gwrI7NqIMqF2cI8JZu9mYc9nXDP8.tUF6u1BQEVjf31x2GV1i', 1, 'user', 'Joe', 'DeBroux', 'joe@tooldepot.com', '258-741-9632', 'https://bit.ly/2BuacKx', '2019-10-14 21:19:54', '2019-10-14 21:19:55');
INSERT INTO `user` (`id`, `address_id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `phone`, `photo`, `create_date`, `update_date`) VALUES (6, 6, 'justin', '$2a$10$p/LdfLwWHylswLT1fIFvDuFDC8k0SjuoxzbhkDAQn12/Kw5Is2KcC', 1, 'user', 'Justin', 'Choi', 'justin@tooldepot.com', '369-852-7451', 'https://bit.ly/2MKOmaE', '2019-10-14 21:19:55', '2019-10-14 21:19:56');
INSERT INTO `user` (`id`, `address_id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `phone`, `photo`, `create_date`, `update_date`) VALUES (7, 7, 'cody', '$2a$10$KGWJsc9dSYa00HAd218Jx.lCM5LKOebGrjxCHL6xC9CnGJ.OVHSuK', 1, 'user', 'Cody', 'Fulker', 'cody@tooldepot.com', '254-987-1246', 'https://bit.ly/2MkPW3U', '2019-10-14 21:19:56', '2019-10-14 21:19:57');
INSERT INTO `user` (`id`, `address_id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `phone`, `photo`, `create_date`, `update_date`) VALUES (8, 8, 'jdoe', '$2a$10$czjj2KM25F66EDv.WPcJZOKW4NYHYoTO3iFXEOivSshbfRCnMN91u', 1, 'user', 'John', 'Doe', 'jdoe@tooldepot.com', '839-203-3929', 'http://bit.ly/2NcR6hl', NULL, NULL);
INSERT INTO `user` (`id`, `address_id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `phone`, `photo`, `create_date`, `update_date`) VALUES (9, 9, 'builder', '$2a$10$QPCBgldtv2SbPgA/TFW5lea.TY.Q5P6QKIwIebFrlPWIbpCTSHCvi', 1, 'user', 'Bob', 'Builder', 'bob@tooldepot.com', '848-322-5543', 'http://bit.ly/2PjLQuT', NULL, NULL);
INSERT INTO `user` (`id`, `address_id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `email`, `phone`, `photo`, `create_date`, `update_date`) VALUES (10, 10, 'depot', '$2a$10$JGEdSB3R1K7YRWU7G8nV7OwRnDo9.snGRlO0JqKAvqisKm6255RAa', 1, 'user', 'Tim', 'Smith', 'depot@tooldepot.com', '425-521-6334', 'http://bit.ly/2pe7O83', NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `tool`
-- -----------------------------------------------------
START TRANSACTION;
USE `tooldepotdb`;
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (1, 4, 'Table Saw', 'This DEWALT offers the ultimate in table saw mobility by pairing a DEWALT 10 in. table saw with a rolling stand. This table saw is designed with a 15 Amp motor that quickly rips through hardwoods with ease. A rack and pinion fence system makes fence adjustments fast, smooth and accurate. The rolling stand is designed for easy set up and break down with excellent stability.', 'Saw', 25, 1, '2017', 'Excellent');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (2, 3, 'Cordless Electric Leaf Blower', 'The M18 FUEL Blower has the power to clear from 15 ft. gets to full throttle in under 1 second, and is up to 4 lbs. lighter than competitors. Designed to meet landscape maintenance professional needs.', 'Yard Equipment', 10, 1, '2015', 'Good');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (3, 4, 'Shop Vac', 'The RIDGID 14 Gal. NXT wet dry vac is more powerful than ever. Best for tackling large-volume messes or heavy-duty pro cleanups. ', 'Large Equipment', 10, 1, '2018', 'Excellent');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (4, 6, 'Cordless Electric Weed Trimmer', 'The RYOBI 40-Volt X Expand-it Trimmer delivers power like a gas trimmer, with none of the hassle of mixing oil and gas. Attachment capability means you can add on RYOBI Expand-It attachments, saving you time, money and space.', 'Yard Equipment', 10, 1, '2018', 'Excellent');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (5, 6, 'Pole Saw', 'ECHO PPF-225 pole saw is lightweight & easy to maneuver. Pole chainsaw\'s 94 in. shaft gives the user maximum reach', 'Saw', 10, 1, '2017', 'Excellent');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (6, 7, 'Gas Weed Trimmer', '30 cc 4-cycle engine is cleaner and produces less noise.  Eliminate the need to mix oil and gas Troy-Bilt\'s 4-cycle engines take regular gas. Quick change cutting head option makes it easy to refill without disassembling the cutting head, simply feed the line through the eyelets and then twist the head to wind the line in seconds\n ', 'Yard Equipment', 5, 1, '2010', 'Poor');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (7, 8, 'Gas Leaf Blower', 'This RYOBI 2 Cycle backpack blower is the most powerful residential backpack blower on the market. The motor delivers a best in class 760 CFM and 175 MPH.', 'Yard Equipment', 5, 1, '2009', 'Good');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (8, 4, 'Corded Electric Leaf Blower', 'Electric blower with 12 Amp Blower/Vac/Mulch with 2 bushel capacity Vac collection bag. Variable speeds of 140 MPH to 240 MPH. Strong enough to vac and mulch everyday lightweight yard waste. ', 'Yard Equipment', 5, 1, '2015', 'Good');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (9, 6, 'Chainsaw', 'The professional-grade ECHO chainsaw CS-310 comes equipped with a 14 in. bar and chain. The rear handle chainsaw is both lightweight and delivers powerful performance. This chainsaw is also packed with features including the side a access chain tensioner for quick chain adjustments and the reduced starting effort feature.', 'Saw', 15, 1, '2012', 'Fair');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (10, 3, 'Air Compressor', '6 Gal. tank allows users to drive a large quantity of nails on a single tank charge. ', 'Large Equipment', 15, 1, '2104', 'Excellent');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (11, 4, 'Pressure Washer', 'This Pressure Washer is engineered to handle even your toughest jobs. With a powerful Honda 187 cc gasoline engine, this RYOBI Pressure Washer delivers 3100 psi of force for quick cleaning of driveways, decks, windows and other areas around the house. Featuring a durable and compact roll-cage frame design this pressure washer is designed for easy transport.', 'Large Equipment', 15, 1, '2013', 'Excellent');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (12, 5, 'Gas Push Lawn Mower', 'This walk-behind lawn mower features a dependable, easy starting 140cc Briggs & Stratton 500e series OHV engine with primer and is equipped with the TriAction cutting system. The TriAction cutting system on this push mower features a rake bumper to lift grass upright, a specially designed blade for a finer mulch and a symmetrical deck for superior grass flow, eliminating clumping.', 'Yard Equipment', 10, 1, '2010', 'Poor');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (13, 9, 'Electric Lawn Mower', 'The EGO 21 Self-Propelled mower with PeakPower technology combines the power of 2 EGO batteries for longer run time and efficient power draw. The push start button provides a quick and easy start, while the self-propel speed control allows you to power through tough terrain at your personal preference. ', 'Yard Equipment', 10, 1, '2016', 'Excellent');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (14, 4, 'Snow Blower', 'Tackle small driveway/walkway jobs in no time with the Toro Power Clear Single-Stage 18 in. Gas Snow Blower with push-of-a-button electric start. Quickly and easily clear 18 in. wide by 12 in. deep snow, and blast compacted snow and ice where you want it up to 25 ft. Ideal for concrete and asphalt surfaces that can park up to 4+ cars and 2 - 9 in. of snow at a time. ', 'Large Equipment', 20, 1, '2015', 'Good');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (15, 5, '22 Foot Ladder', 'This  28 telescoping adjustable heights, this ladder can be used as an Extension Ladder, Double-Sided Twin Stepladder, 90-degree Wall Ladder and a Stairway Stepladder. Easily adjust the height from all sides with one hand with the user-friendly speed locks. The extra-large, heavy-duty MPX hinges give you improved strength with less flex and sway for safer climbing. ', 'Ladder', 10, 1, '2008', 'Good');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (16, 5, '16 Foot Ladder', 'This 16 ft. Aluminum Extension Ladder, offering a 225 lb. load capacity and lightweight aluminum construction. It features slip-resistant, TRACTION-TRED D-rungs and ALFLO rung joints for safe, twist-proof performance. ', 'Ladder', 5, 1, '2005', 'Fair');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (17, 3, 'Shovel', 'This long handle round point shovel is suitable for digging and gardening, particularly in hard, rocky soil. This is a heavy-use tool with a fiberglass handle and tempered steel blade ideal for frequent jobs and yard maintenance. ', 'Hand Tool', 5, 1, '2000', 'Fair');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (18, 5, 'Gas Generator', 'This Portable Generator is a dependable and easy-to-use power source to keep your home prepared for emergencies situations. It produces 9,500 peak watts and 7,500 running watts and features remote start with key fob, Push-Button Electric Start, and backup recoil start.', 'Large Equipment', 25, 1, '2016', 'Excellent');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (19, 5, 'Palm Sander', 'This sander delivers fast, smooth sanding performance with better grip and control. Ideal for woodworkers and finish carpenters, it features controlled pad speed upon startup with a powerful 3 Amp motor for continuous operation. ', 'Power Tool', 10, 1, '2014', 'Good');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (20, 6, 'Socket Wrench Set', 'Set includes (1) 3/8 in. drive 100-position low-profile, long handle ratchet, (1) 3 in. wobble extension bar, (18) Knurl Grip universal sockets: SAE - 1/4, 5/16, 3/8, 7/16, 1/2, 9/16, 5/8, 11/16, 3/4 in. and Metric - 10, 12, 13, 14, 15, 16, 17, 18, 19 mm', 'Hand Tool', 5, 1, '2011', 'Good');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (21, 6, 'Hammer', 'The 16 oz. Claw Hammer features Perm bond construction between its head and handle for strength. It has a comfort cushion Shock Reduction Grip ', 'Hand Tool', 5, 1, '2009', 'Fair');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (22, 3, 'Cordless Power Drill', 'Boasting 19 different clutch positions and an additional high torque setting, you’ll have the versatility and power needed to handle a multitude of projects. Drill wood, metal, plastic and more with torque that measures up to 310 in. lbs. The keyless chuck accepts bits up to 3/8 of an in. in size while the onboard LED light illuminates the work piece during operation. ', 'Power Tool', 10, 1, '2015', 'Good');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (23, 4, 'Corded Power Drill', 'Matrix quick connect system allows for tool-free change of a variety of tool attachments. Powerful 4.0 Amp motor provides enough power for a full range of applications and attachments', 'Power Tool', 10, 1, '2014', 'Good');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (24, 6, 'Reciprocating Saw', 'The DEWALT DWE305 features a powerful 12 Amp motor designed for heavy-duty applications. This reciprocating saw is ideal for cutting wood and nail embedded wood, light to heavy gauge metal, drywall or plaster and plastics, rubber, fiberglass and composites', 'Saw', 10, 1, '2017', 'Great');
INSERT INTO `tool` (`id`, `user_id`, `tool_name`, `description`, `tool_type`, `cost_per_day`, `available`, `manufacture_year`, `tool_condition`) VALUES (25, 5, 'Dehumidifier', '30 pints per day dehumidifier, Hose connection for continous drain option. Easy-roll hidden wheels - Out-of-sight wheels roll easily for bucket emptying\n', 'Large Equipment', 10, 1, '2013', 'Excellent');
COMMIT;


-- -----------------------------------------------------
-- Data for table `tool_rental`
-- -----------------------------------------------------
START TRANSACTION;
USE `tooldepotdb`;
INSERT INTO `tool_rental` (`id`, `tool_id`, `renter_id`, `checkout`, `returned`, `total_cost`, `created_date`, `updated_date`) VALUES (1, 1, 7, '2019-10-12 21:19:52', '2019-10-14 21:19:52', 50, '2019-10-10 21:19:52', '2019-10-15 21:19:52');
INSERT INTO `tool_rental` (`id`, `tool_id`, `renter_id`, `checkout`, `returned`, `total_cost`, `created_date`, `updated_date`) VALUES (2, 2, 5, '2019-10-13 21:19:52', '2019-10-14 21:19:52', 10, '2019-10-11 21:19:52', '2019-10-16 21:19:52');
INSERT INTO `tool_rental` (`id`, `tool_id`, `renter_id`, `checkout`, `returned`, `total_cost`, `created_date`, `updated_date`) VALUES (3, 3, 6, '2019-10-14 21:19:52', '2019-10-16 21:19:52', 20, '2019-10-12 21:19:52', '2019-10-17 21:19:52');
INSERT INTO `tool_rental` (`id`, `tool_id`, `renter_id`, `checkout`, `returned`, `total_cost`, `created_date`, `updated_date`) VALUES (4, 4, 7, '2019-10-15 21:19:52', '2019-10-16 21:19:52', 10, '2019-10-13 21:19:52', '2019-10-18 21:19:52');
INSERT INTO `tool_rental` (`id`, `tool_id`, `renter_id`, `checkout`, `returned`, `total_cost`, `created_date`, `updated_date`) VALUES (5, 5, 4, '2019-10-16 21:19:52', '2019-10-19 21:19:52', 30, '2019-10-14 21:19:52', '2019-10-19 21:19:52');

COMMIT;


-- -----------------------------------------------------
-- Data for table `tool_photo`
-- -----------------------------------------------------
START TRANSACTION;
USE `tooldepotdb`;
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (1, 1, 'http://bit.ly/31l9OIv');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (2, 2, 'http://bit.ly/32n1oBU');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (3, 3, 'http://bit.ly/2nPP3He');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (4, 4, 'http://bit.ly/33CNb3M');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (5, 5, 'http://bit.ly/31sp2f6');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (6, 6, 'http://bit.ly/31r6agx');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (7, 7, 'http://bit.ly/2prIBGS');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (8, 8, 'http://bit.ly/2oMIlSM');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (9, 9, 'http://bit.ly/2ptNhMk');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (10, 10, 'http://bit.ly/2MkpNCo');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (11, 11, 'http://bit.ly/32yXi9C');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (12, 12, 'http://bit.ly/35IC37i');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (13, 13, 'http://bit.ly/2Mn8fFZ');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (14, 14, 'http://bit.ly/2IXInye');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (15, 15, 'http://bit.ly/2MlSajB');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (16, 16, 'http://bit.ly/2OTHD0U');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (17, 17, 'http://bit.ly/2VXQwYV');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (18, 18, 'http://bit.ly/2BjNiVY');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (19, 19, 'http://bit.ly/2IYOceR');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (20, 20, 'http://bit.ly/2N0ef6H');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (21, 21, 'http://bit.ly/2BjKSqm');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (22, 22, 'http://bit.ly/31nI0Dr');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (23, 23, 'http://bit.ly/2VNZwQ0');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (24, 24, 'http://bit.ly/2ppUrS0');
INSERT INTO `tool_photo` (`id`, `tool_id`, `photo_url`) VALUES (25, 25, 'http://bit.ly/2IV5tpi');

COMMIT;


-- -----------------------------------------------------
-- Data for table `review_of_renter`
-- -----------------------------------------------------
START TRANSACTION;
USE `tooldepotdb`;
INSERT INTO `review_of_renter` (`id`, `tool_rental_id`, `tool_review`, `tool_rating`, `lender_review`, `lender_rating`) VALUES (1, 1, 'The table saw was in great condition as advertised.', 5, 'Alicia was on time for the arranged pickup, and she also showed how to operate it.', 5);
INSERT INTO `review_of_renter` (`id`, `tool_rental_id`, `tool_review`, `tool_rating`, `lender_review`, `lender_rating`) VALUES (2, 2, 'Leaf blower was in pretty bad shape.', 1, 'Justin was ready when I came to pick up the pole saw, he also provided safety glasses just in case.', 1);
INSERT INTO `review_of_renter` (`id`, `tool_rental_id`, `tool_review`, `tool_rating`, `lender_review`, `lender_rating`) VALUES (3, 3, 'The shop vac was ok. A little banged up.', 4, 'Alicia was on time for the arranged pickup, and was very nice', 4);
INSERT INTO `review_of_renter` (`id`, `tool_rental_id`, `tool_review`, `tool_rating`, `lender_review`, `lender_rating`) VALUES (4, 4, 'The weed trimmer was in good shape, and fully loaded with cord.', 4, 'Josh ready with the weed trimmer when I arrived, everything seemed to be ok.', 4);
INSERT INTO `review_of_renter` (`id`, `tool_rental_id`, `tool_review`, `tool_rating`, `lender_review`, `lender_rating`) VALUES (5, 5, 'The pole saw condition was like new.', 5, 'Justin was ready when I came to pick up the pole saw, condition was like new.', 5);

COMMIT;


-- -----------------------------------------------------
-- Data for table `review_of_lender`
-- -----------------------------------------------------
START TRANSACTION;
USE `tooldepotdb`;
INSERT INTO `review_of_lender` (`id`, `tool_rental_id`, `renter_review`, `renter_rating`) VALUES (1, 1, 'Alicia was on time for the arranged pickup, and the table saw was in great condition as advertised.', 5);
INSERT INTO `review_of_lender` (`id`, `tool_rental_id`, `renter_review`, `renter_rating`) VALUES (2, 2, 'Josh was late for the arranged pickup of the leaf blower. Also it was in pretty bad shape.', 1);
INSERT INTO `review_of_lender` (`id`, `tool_rental_id`, `renter_review`, `renter_rating`) VALUES (3, 3, 'Alicia was on time for the arranged pickup, and the shop vac was ok.', 4);
INSERT INTO `review_of_lender` (`id`, `tool_rental_id`, `renter_review`, `renter_rating`) VALUES (4, 4, 'Josh ready with the weed trimmer when I arrived, everything seemed to be ok.', 4);
INSERT INTO `review_of_lender` (`id`, `tool_rental_id`, `renter_review`, `renter_rating`) VALUES (5, 5, 'Justin was ready when I came to pick up the pole saw, condition was like new.', 5);

COMMIT;


-- -----------------------------------------------------
-- Data for table `skill`
-- -----------------------------------------------------
START TRANSACTION;
USE `tooldepotdb`;
INSERT INTO `skill` (`id`, `name`, `cost_per_hour`, `available`, `description`, `expertise`) VALUES (1, 'Painter', 25, 1, 'Howell Painting offers a full range of professional painting and sealing services for the interior and exterior of your home. With over 30 years of experience, we take care to work around your schedule and needs. You can always expect the highest level of service, attention to detail, and top-quality products. We are committed to your complete satisfaction on each house painting project in Colorado Springs, Castle Rock CO and the surrounding area. ', 'Expert');

COMMIT;


-- -----------------------------------------------------
-- Data for table `user_skill`
-- -----------------------------------------------------
START TRANSACTION;
USE `tooldepotdb`;
INSERT INTO `user_skill` (`id`, `user_id`, `skill_id`, `certified`, `experience`) VALUES (1, 3, 1, 1, 5);

COMMIT;


-- -----------------------------------------------------
-- Data for table `skill_rental`
-- -----------------------------------------------------
START TRANSACTION;
USE `tooldepotdb`;
INSERT INTO `skill_rental` (`id`, `renter_id`, `user_skill_id`, `start_date`, `finish_date`, `hours`, `created_date`, `update_date`, `estimated_finish_date`) VALUES (1, 5, 1, '2019-03-12', '2019-03-15', 24, '2019-03-10', '2019-03-16', '2019-03-15');

COMMIT;


-- -----------------------------------------------------
-- Data for table `review_of_worker`
-- -----------------------------------------------------
START TRANSACTION;
USE `tooldepotdb`;
INSERT INTO `review_of_worker` (`id`, `skill_rental_id`, `worker_review`, `worker_rating`, `title`, `recommend`, `finished_on_time`) VALUES (1, 1, 'Review', 5, 'Great Job', 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `review_of_customer`
-- -----------------------------------------------------
START TRANSACTION;
USE `tooldepotdb`;
INSERT INTO `review_of_customer` (`id`, `skill_rental_id`, `customer_review`, `customer_rating`, `title`) VALUES (1, 1, 'Review', 5, 'Some Title');

COMMIT;

