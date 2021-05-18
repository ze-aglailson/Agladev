-- MySQL Script generated by MySQL Workbench
-- sex 14 mai 2021 12:31:29
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema agladev
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema agladev
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `agladev` DEFAULT CHARACTER SET utf8 ;
USE `agladev` ;

-- -----------------------------------------------------
-- Table `agladev`.`Pessoa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `agladev`.`Pessoa` (
  `pessoaCod` INT NOT NULL AUTO_INCREMENT,
  `pessoaNome` VARCHAR(100) NOT NULL,
  `pessoaSobrenome` VARCHAR(100) NOT NULL,
  `pessoaEmail` VARCHAR(255) NOT NULL,
  `pessoaSenha` VARCHAR(255) NOT NULL,
  `pessoaDataCadastro` TIMESTAMP NOT NULL DEFAULT  CURRENT_TIMESTAMP,
  `pessoaImg` VARCHAR(255) NULL,
  PRIMARY KEY (`pessoaCod`))
ENGINE = InnoDB;

# INSERTS
INSERT INTO Pessoa VALUES
-- Funcionarios
(NULL,'userDois','02','user02@gmail.com','user02',DEFAULT,'img/user02.png'),
(NULL,'userTres','03','user03@gmail.com','user03',DEFAULT,'img/user03.png'),
-- Clientes
(NULL,'userQuatro','04','user04@gmail.com','user04',DEFAULT,'img/user04.png'),
(NULL,'userCinco','05','user05@gmail.com','user05',DEFAULT,'img/user05.png');

-- TESTES
SELECT * FROM Pessoa;


-- -----------------------------------------------------
-- Table `agladev`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `agladev`.`Cliente` (
  `pessoaCod` INT NOT NULL,
  `clientenomeFantasia` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`pessoaCod`),
  CONSTRAINT `fk_Cliente_Pessoa1`
    FOREIGN KEY (`pessoaCod`)
    REFERENCES `agladev`.`Pessoa` (`pessoaCod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

# INSERT
INSERT INTO Cliente VALUES
(4,'Padaria'),
(5,'ABC auto-peças');
-- Teste
SELECT CONCAT(P.pessoaNome,' ',P.pessoaSobrenome) AS Nome, C.clienteNomeFantasia AS 'Nome Empresa', P.pessoaEmail, P.pessoadataCadastro AS 'Cadastro em'   FROM Pessoa P
INNER JOIN Cliente C
ON C.pessoaCod = P.pessoaCod;

-- -----------------------------------------------------
-- Table `agladev`.`Setor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `agladev`.`Setor` (
  `setorCod` INT NOT NULL AUTO_INCREMENT,
  `setorNome` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`setorCod`))
ENGINE = InnoDB;

# INSERT
INSERT INTO Setor VALUES
(NULL,'Técnologia da Informação'),
(NULL,'Recursos Humanos'),
(NULL,'Comercial');
-- TESTE
SELECT * FROM Setor;

-- -----------------------------------------------------
-- Table `agladev`.`Cargo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `agladev`.`Cargo` (
  `cargoCod` INT NOT NULL AUTO_INCREMENT,
  `cargoNome` VARCHAR(100) NOT NULL,
  `setorCod` INT NOT NULL,
  `cargoSalario` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`cargoCod`, `setorCod`),
  INDEX `fk_Cargo_Setor1_idx` (`setorCod` ASC) VISIBLE,
  CONSTRAINT `fk_Cargo_Setor1`
    FOREIGN KEY (`setorCod`)
    REFERENCES `agladev`.`Setor` (`setorCod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

#INSERT 
INSERT INTO Cargo VALUES
(NULL,'Dev. Backend SR',1,'10000'),
(NULL,'Coodernado(a) de RH',2,'5000'),
(NULL,'Vendedor',3,'4300');
-- TESTE
SELECT CONCAT(P.pessoaNome,' ',P.pessoaSobrenome) AS Nome, P.pessoaEmail AS Email, C.cargoNome AS Cargo, S.setorNome AS Setor FROM Funcionario F
INNER JOIN Pessoa P
ON F.pessoaCod = P.pessoaCod
INNER JOIN Cargo C
ON F.cargoCod = C.cargoCod
INNER JOIN Setor S
ON F.setorCod = S.setorCod AND F.setorCod = S.setorCod;


-- -----------------------------------------------------
-- Table `agladev`.`Funcionario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `agladev`.`Funcionario` (
  `pessoaCod` INT NOT NULL,
  `cargoCod` INT NOT NULL,
  `setorCod` INT NOT NULL,
  PRIMARY KEY (`pessoaCod`),
  INDEX `fk_Funcionario_Cargo1_idx` (`cargoCod` ASC, `setorCod` ASC) VISIBLE,
  CONSTRAINT `fk_Funcionario_Pessoa1`
    FOREIGN KEY (`pessoaCod`)
    REFERENCES `agladev`.`Pessoa` (`pessoaCod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Funcionario_Cargo1`
    FOREIGN KEY (`cargoCod` , `setorCod`)
    REFERENCES `agladev`.`Cargo` (`cargoCod` , `setorCod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

#INSERT
INSERT INTO Funcionario VALUES
(1,1,1),
(2,2,2),
(3,3,3);


-- -----------------------------------------------------
-- Table `agladev`.`CategoriaProjeto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `agladev`.`CategoriaProjeto` (
  `categoriaprojetoCod` INT NOT NULL AUTO_INCREMENT,
  `categoriaprojetoNome` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`categoriaprojetoCod`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `agladev`.`Projeto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `agladev`.`Projeto` (
  `projetoCod` INT NOT NULL AUTO_INCREMENT,
  `projetoTitulo` VARCHAR(100) NOT NULL,
  `projetoDescricao` VARCHAR(512) NULL,
  `projetodataInicio` DATE NOT NULL,
  `projetodataConclusao` DATE NOT NULL,
  `clienteCod` INT NOT NULL,
  `funcionarioCod` INT NOT NULL,
  `categoriaprojetoCod` INT NOT NULL,
  PRIMARY KEY (`projetoCod`),
  INDEX `fk_Projeto_Cliente1_idx` (`clienteCod` ASC) VISIBLE,
  INDEX `fk_Projeto_Funcionario1_idx` (`funcionarioCod` ASC) VISIBLE,
  INDEX `fk_Projeto_CategoriaProjeto1_idx` (`categoriaprojetoCod` ASC) VISIBLE,
  CONSTRAINT `fk_Projeto_Cliente1`
    FOREIGN KEY (`clienteCod`)
    REFERENCES `agladev`.`Cliente` (`pessoaCod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Projeto_Funcionario1`
    FOREIGN KEY (`funcionarioCod`)
    REFERENCES `agladev`.`Funcionario` (`pessoaCod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Projeto_CategoriaProjeto1`
    FOREIGN KEY (`categoriaprojetoCod`)
    REFERENCES `agladev`.`CategoriaProjeto` (`categoriaprojetoCod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `agladev`.`EtapaProjeto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `agladev`.`EtapaProjeto` (
  `etapaProjetoCod` INT NOT NULL AUTO_INCREMENT,
  `projetoCod` INT NOT NULL,
  `etapaprojetoTitle` VARCHAR(100) NOT NULL,
  `etapaprojetoInicio` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `etapaprojetoFim` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`etapaProjetoCod`, `projetoCod`),
  INDEX `fk_EtapaProjeto_Projeto1_idx` (`projetoCod` ASC) VISIBLE,
  CONSTRAINT `fk_EtapaProjeto_Projeto1`
    FOREIGN KEY (`projetoCod`)
    REFERENCES `agladev`.`Projeto` (`projetoCod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `agladev`.`CategoriaTecnologia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `agladev`.`CategoriaTecnologia` (
  `categoriatecnologiaCod` INT NOT NULL AUTO_INCREMENT,
  `categoriaTecnologiaNome` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`categoriatecnologiaCod`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `agladev`.`Tecnologia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `agladev`.`Tecnologia` (
  `tecnologiaCod` INT NOT NULL AUTO_INCREMENT,
  `tecnologiaNome` VARCHAR(100) NOT NULL,
  `categoriatecnologiaCod` INT NOT NULL,
  PRIMARY KEY (`tecnologiaCod`, `categoriatecnologiaCod`),
  INDEX `fk_Tecnologia_CategoriaTecnologia1_idx` (`categoriatecnologiaCod` ASC) VISIBLE,
  CONSTRAINT `fk_Tecnologia_CategoriaTecnologia1`
    FOREIGN KEY (`categoriatecnologiaCod`)
    REFERENCES `agladev`.`CategoriaTecnologia` (`categoriatecnologiaCod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `agladev`.`Projeto_Tecnologia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `agladev`.`Projeto_Tecnologia` (
  `projetoCod` INT NOT NULL,
  `tecnologiaCod` INT NOT NULL,
  PRIMARY KEY (`projetoCod`, `tecnologiaCod`),
  INDEX `fk_Tecnologia_has_Projeto_Projeto1_idx` (`projetoCod` ASC) VISIBLE,
  INDEX `fk_Tecnologia_has_Projeto_Tecnologia1_idx` (`tecnologiaCod` ASC) VISIBLE,
  CONSTRAINT `fk_Tecnologia_has_Projeto_Tecnologia1`
    FOREIGN KEY (`tecnologiaCod`)
    REFERENCES `agladev`.`Tecnologia` (`tecnologiaCod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Tecnologia_has_Projeto_Projeto1`
    FOREIGN KEY (`projetoCod`)
    REFERENCES `agladev`.`Projeto` (`projetoCod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `agladev`.`Servico` (
  `servicoCod` INT NOT NULL AUTO_INCREMENT,
  `servicoTitle` VARCHAR(100) NOT NULL,
  `servicoDescricao` VARCHAR(255) NOT NULL,
  `servicoImagem` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`servicoCod`))
ENGINE = InnoDB;

INSERT INTO Servico VALUES
(NULL,'','',''),
(NULL,'','',''),
(NULL,'','','');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
