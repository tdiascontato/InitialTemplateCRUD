require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.conectionString).then(()=>{
    console.log('Base de dados rodando! ;)');
    app.emit('CodOne')
}).catch(e=>console.log(e));
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const middewareGlobal = require('./src/middlewares/middleware');
const checkCsrfError = require('./src/middlewares/middlewareErro');

app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'Mensagem Flash',
    store: MongoStore.create({mongoUrl: process.env.conectionString}),
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000*60*60*24*7,
        httpOnly: true
    }
});
app.use(sessionOptions);

app.use(flash());
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(csrf());

app.use(middewareGlobal);
app.use(checkCsrfError);
app.use(routes);

app.on('CodOne', ()=>{
    app.listen(4000, ()=>{
        console.log('Estou rodando no: http://localhost:4000')
    })
})


