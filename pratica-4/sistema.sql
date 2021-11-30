SELECT * FROM ALUNO;

CREATE TABLE IF NOT EXISTS aluno (
	id int(11) NOT NULL AUTO_INCREMENT,
	nome VARCHAR(20),
	curso VARCHAR(30),
    dataN VARCHAR(30),
    PRIMARY KEY(id)
);

INSERT INTO aluno (nome, curso, dataN) VALUES ('Julia', 'Engenharia', '22/04/1996');


