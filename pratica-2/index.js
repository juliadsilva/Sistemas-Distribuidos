var restify = require('restify');

var server = restify.createServer({
    name: "Prática 02"
});

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

function debug(req){
    console.log('path :\t' + JSON.stringify(req.params))
    console.log('query :\t' + JSON.stringify(req.query))
    console.log('body :\t' + JSON.stringify(req.body))
}

/*function helloWorld(req, res, next){
    debug(req)
    //let nome = req.params.nome;
    let nome = req.query.nome;
    let sobrenome = req.query.sobrenome;
    res.setHeader('content-type', 'application/json');
    res.charSet('UTF-8');
    var now = new Date();
    res.send(`Hello ${nome} ${sobrenome} !!! ${now}`);
    next();
};
*/

function helloWorld(req, res, next){
    debug(req)
    let nome = req.body.nome;
    let sobrenome = req.body.sobrenome;
    let idade = req.body.idade;
    res.setHeader('content-type', 'application/json');
    res.charSet('UTF-8');
    var now = new Date();
    res.send(`Hello ${nome} ${sobrenome}. Sua idade é ${idade} !!! ${now}`);
    next();
};

//Path
//server.get('/hello/:nome', helloWorld);
//Query
//server.get('/hello', helloWorld);
//Body
server.post('/hello', helloWorld);

var port = process.env.PORT || 5000;

server.listen(port, function(){
    console.log(`${server.name} rodando`)
});




