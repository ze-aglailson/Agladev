-- MySQL Script generated by MySQL Workbench
-- qui 06 mai 2021 15:00:51
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema 
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema 
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `agladev` DEFAULT CHARACTER SET utf8 ;
USE `agladev` ;

-- -----------------------------------------------------
-- Table ``.`Pessoa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `agladev`.`CategoriaProjeto` (
  `categoriaprojetoCod` INT NOT NULL AUTO_INCREMENT,
  `categoriaprojetoNome` VARCHAR(100) NOT NULL,
  `categoriaprojetoLink` VARCHAR(512) NOT NULL,
  PRIMARY KEY (`categoriaprojetoCod`))
ENGINE = InnoDB;

INSERT INTO CategoriaProjeto VALUES
(NULL, 'E-commerce','#'),
(NULL, 'Institucional','#');

CREATE TABLE IF NOT EXISTS `agladev`.`Categoria` (
  `categoriaCod` INT NOT NULL AUTO_INCREMENT,
  `categoriaNome` VARCHAR(100) NOT NULL,
  `categoriaLink` VARCHAR(512) NOT NULL,
  PRIMARY KEY (`categoriaCod`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table ``.`Cliente`
-- -----------------------------------------------------
-- ---------------------------------------------------


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;









