-- procedures
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cliente_cadastro`(
	ppessoaNome VARCHAR(100),
    ppessoaSobrenome VARCHAR(100),
    ppessoaEmail VARCHAR(255),
    ppessoaSenha VARCHAR(255),
    ppessoaImg VARCHAR(255),
    pnomeFantasia VARCHAR(100)
)
BEGIN
	DECLARE vpessoaCod INT; -- v = variavel
    
    START TRANSACTION;
    -- Cadastra primairamente na tabela de pessoas
    IF NOT EXISTS(SELECT pessoaCod FROM Pessoa WHERE pessoaEmail = ppessoaEmail) THEN
		
        INSERT INTO Pessoa VALUES(NULL,ppessoaNome,ppessoaSobrenome,ppessoaEmail,ppessoaSenha,DEFAULT,ppessoaImg);
        
        SET vpessoaCod = LAST_INSERT_ID();
	
    ELSE
		
        SELECT "Já existe uma pessoa cadastrada com esse e-mail!" AS resultado;
        ROLLBACK;
    
    END IF;
    
    -- Cadastro na tabela de funcionarios
    
    IF NOT EXISTS(SELECT pessoaCod FROM Funcionario WHERE pessoaCod = vpessoaCod) THEN
    
		INSERT INTO Cliente VALUES (vpessoaCod,pnomeFantasia);
        
	ELSE
		
        SELECT "Essa pessoa já esta cadastrada como cliente!" AS resultado;
        
        ROLLBACK;
	END IF;
    
    COMMIT;
    
    SELECT "Dados cadastrado com sucesso!" AS resultado;
    
    
END


-- funcionario

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_funcionario_cadastro`(
	ppessoaNome VARCHAR(100),
    ppessoaSobrenome VARCHAR(100),
    ppessoaEmail VARCHAR(255),
    ppessoaSenha VARCHAR(255),
    ppessoaImg VARCHAR(255),
    pcargoCod INT,
    psetorCod INT
)
BEGIN
	DECLARE vpessoaCod INT; -- v = variavel
    
    START TRANSACTION;
    -- Cadastra primairamente na tabela de pessoas
    IF NOT EXISTS(SELECT pessoaCod FROM Pessoa WHERE pessoaEmail = ppessoaEmail) THEN
		
        INSERT INTO Pessoa VALUES(NULL,ppessoaNome,ppessoaSobrenome,ppessoaEmail,ppessoaSenha,DEFAULT,ppessoaImg);
        
        SET vpessoaCod = LAST_INSERT_ID();
	
    ELSE
		
        SELECT "Já existe uma pessoa cadastrada com esse e-mail!" AS resultado;
        ROLLBACK;
    
    END IF;
    
    -- Cadastro na tabela de funcionarios
    
    IF NOT EXISTS(SELECT pessoaCod FROM Funcionario WHERE pessoaCod = vpessoaCod) THEN
    
		INSERT INTO Funcionario VALUES (vpessoaCod,pcargoCod,psetorCod);
        
	ELSE
		
        SELECT "Esse pessoa já esta cadastrada como funcionário!" AS resultado;
        
        ROLLBACK;
	END IF;
    
    COMMIT;
    
    SELECT "Dados cadastrado com sucesso!" AS resultado;
    
    
END

-- hash

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_hash`(
	pemail VARCHAR(255)
)
BEGIN

	START TRANSACTION;
    
    IF NOT EXISTS(SELECT pessoaEmail FROM Pessoa WHERE pessoaEmail = pemail) THEN
    
		SELECT false AS resultado;
        ROLLBACK;
	
    ELSE
		
        SELECT pessoaSenha AS resultado FROM Pessoa WHERE pessoaEmail = pemail;
        COMMIT;
        
	END IF;
    
END

-- pessoa 

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_pessoa_login`(
	pemail VARCHAR(255),
    psenha VARCHAR(255)
)
BEGIN
    
    
    IF EXISTS(-- VERIFICA SE A PESSOA LOGADA É FUNCIONARIO
		SELECT F.pessoaCod FROM Funcionario F
		INNER JOIN Pessoa P
		ON P.pessoaEmail = pemail AND F.pessoaCod = P.pessoaCod 

    ) 	
    THEN
    
		SELECT P.pessoaCod,P.pessoaNome,P.pessoaSobrenome,P.pessoaEmail,P.pessoaSenha,P.pessoaDataCadastro,P.pessoaImg,S.setorNome, C.cargoNome FROM Pessoa P
		INNER JOIN Funcionario F
		ON P.pessoaCod = F.pessoaCod AND P.pessoaEmail = pemail
		INNER JOIN Setor S
		ON F.setorCod = S.setorCod
		INNER JOIN Cargo C
		ON F.cargoCod = C.cargoCod AND C.setorCod = S.setorCod;
        
	ELSEIF EXISTS( -- VERIFICA SE A PESSOA LOGADA É CLIENTE
		SELECT C.pessoaCod FROM Cliente C
		INNER JOIN Pessoa P
		ON P.pessoaEmail = pemail AND C.pessoaCod = P.pessoaCod 
    )
	THEN
		
		SELECT P.pessoaCod,P.pessoaNome,P.pessoaSobrenome,P.pessoaEmail,P.pessoaSenha,P.pessoaDataCadastro,P.pessoaImg,C.clientenomeFantasia FROM Pessoa P
		INNER JOIN Cliente C
		ON P.pessoaCod = C.pessoaCod AND P.pessoaEmail = pemail;
        
	ELSE
    
		SELECT * FROM Pessoa WHERE pessoaEmail = pemail AND pessoaSenha = psenha;
        
	END IF;

	
    

END



