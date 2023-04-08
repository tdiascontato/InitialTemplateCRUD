exports.PaginaInicial = (req, res) =>{
    res.render('index',{
        titulo: 'Título do Tiago, qual é o seu nome?',
    });
};
exports.Post = (req, res,next) =>{
   // req.session.user = { cliente: req.body.pessoa}
    res.send(`Bem vindo ao sistema, ${req.body.pessoa}`);
    next();
};