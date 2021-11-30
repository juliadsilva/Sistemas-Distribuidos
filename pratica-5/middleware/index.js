var restify = require('restify');

var server = restify.createServer({
    name: "Prática 04"
});

const mysql = require('mysql');

const connectionUri = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sistema'
};

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

function debug(req) {
    console.log('body :\t' + JSON.stringify(req.body))
}

function inserir(req, res, next) {
    res.setHeader('content-type', 'application/json');
    res.charSet('UTF-8');
    let aluno = {
        nome: req.body.nome,
        curso: req.body.curso,
        dataN: req.body.dataN
    };
    let connection = mysql.createConnection(connectionUri);
    let strQuery = `INSERT INTO aluno (nome, curso, dataN) VALUES ` +
        `('${aluno.nome}', '${aluno.curso}', '${aluno.dataN}');`
    console.log(strQuery);
    connection.query(strQuery, function(err, rows, fields) {
        if (!err) {
            res.json(rows);
        } else {
            res.json(err);
        }
    });
    connection.end();
};

function listar(req, res, next) {
    debug(req);
    res.setHeader('content-type', 'application/json');
    res.charSet('UTF-8');
    let connection = mysql.createConnection(connectionUri);
    let strQuery = 'SELECT * FROM aluno;';
    console.log(strQuery);
    connection.query(strQuery, function(err, rows, fields) {
        if (!err) {
            res.json(rows);
        } else {
            res.json(err);
        }
    });
    connection.end();
};

function atualizar(req, res, next) {
    debug(req);
    res.setHeader('content-type', 'application/json');
    res.charSet('UTF-8');
    let aluno = {
        id: req.body.id,
        nome: req.body.nome,
        curso: req.body.curso,
        dataN: req.body.dataN
    };
    let connection = mysql.createConnection(connectionUri);
    let strQuery = `UPDATE aluno SET ` +
        `nome = '${aluno.nome}', ` +
        `curso = '${aluno.curso}', ` +
        `dataN = '${aluno.dataN}' ` +
        `WHERE id = '${aluno.id}';`
    console.log(strQuery);
    connection.query(strQuery, function(err, rows, fields) {
        if (!err) {
            res.json(rows);
        } else {
            res.json(err);
        }
    });
    connection.end();
};

function excluir(req, res, next) {
    debug(req);
    res.setHeader('content-type', 'application/json');
    res.charSet('UTF-8');
    let connection = mysql.createConnection(connectionUri);
    let strQuery = `DELETE FROM aluno WHERE id = '${req.body.id}';`
    console.log(strQuery);
    connection.query(strQuery, function(err, rows, fields) {
        if (!err) {
            res.json(rows);
        } else {
            res.json(err);
        }
    });
    connection.end();
};

const prefix = '/aluno'
server.post(prefix + '/inserir', inserir);
server.get(prefix + '/listar', listar);
server.post(prefix + '/atualizar', atualizar);
server.post(prefix + '/excluir', excluir);

var port = process.env.PORT || 5000;

server.listen(port, function() {
    console.log(`${server.name} rodando`)
});