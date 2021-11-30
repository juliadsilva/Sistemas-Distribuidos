var restify = require('restify');

var server = restify.createServer({
    name: "Prática 03"
});

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

function debug(req) {
    console.log('body :\t' + JSON.stringify(req.body))
}

var contador = 0
const alunos = [] //banco de dados "dummy"

function inserir(req, res, next) {
    res.setHeader('content-type', 'application/json');
    res.charSet('UTF-8');
    //implementação do metodo
    debug(req);
    let aluno = {
        "id": ++contador,
        "nome": req.body.nome,
        "curso": req.body.curso,
        "dataN": req.body.dataN
    }
    alunos.push(aluno);
    res.send(aluno);
    next();
};

function listar(req, res, next) {
    debug(req);
    res.setHeader('content-type', 'application/json');
    res.charSet('UTF-8');
    //implementação do metodo
    res.send(alunos);
    next();
};

function atualizar(req, res, next) {
    debug(req);
    res.setHeader('content-type', 'application/json');
    res.charSet('UTF-8');
    //implementação do metodo
    var foundId;
    for (var i in alunos) {
        if (alunos[i].id == req.body.id) {
            alunos[i].nome = req.body.nome;
            alunos[i].curso = req.body.curso;
            alunos[i].dataN = req.body.dataN;
            foundId = i
            break;
        }
    }
    res.send(alunos[foundId]);
    next();
};

function excluir(req, res, next) {
    debug(req);
    res.setHeader('content-type', 'application/json');
    res.charSet('UTF-8');
    //implementação do metodo
    var excluidos = 0;
    for (var i in alunos) {
        if (alunos[i].id == req.body.id) {
            alunos.splice(i, 1)
            excluidos++;
        }
    }
    res.send(excluidos + ' registro(s) excluido(s)');
    next();
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