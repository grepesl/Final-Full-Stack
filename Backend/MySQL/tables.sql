CREATE TABLE `anime_forum`.`users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `uuid` VARCHAR(45) NOT NULL,
   `username` VARCHAR(45) NOT NULL,
   `email` VARCHAR(45) NOT NULL,
   `password` VARCHAR(100) NOT NULL,
   `created_at` DATETIME NOT NULL DEFAULT  CURRENT_TIMESTAMP,
   `updated_at` DATETIME NOT NULL DEFAULT  CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`),
   UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
   UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
   UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

CREATE TABLE `anime_forum`.`questions` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `uuid` VARCHAR(45) NOT NULL,
   `user_uuid` VARCHAR(45) NOT NULL,
   `title` VARCHAR(255) NOT NULL,
   `content` VARCHAR(255) NOT NULL,
   `tags` VARCHAR(255) NOT NULL,
   `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`),
   UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE);

CREATE TABLE `anime_forum`.`answers` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(45) NOT NULL,
    `question_uuid` VARCHAR(45) NOT NULL,
    `user_uuid` VARCHAR(45) NOT NULL,
    `content` VARCHAR(45) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE);

CREATE TABLE `anime_forum`.`likes` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `answer_uuid` VARCHAR(45) NOT NULL,
   `user_uuid` VARCHAR(45) NOT NULL,
   `value` INT NOT NULL,
   PRIMARY KEY (`id`),
   UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
   UNIQUE INDEX `answer_uuid_UNIQUE` (`answer_uuid` ASC) VISIBLE,
   UNIQUE INDEX `user_uuid_UNIQUE` (`user_uuid` ASC) VISIBLE);