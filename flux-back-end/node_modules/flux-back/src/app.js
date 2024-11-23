const express = require('express');
const bodyParser = require('body-parser');
const conexao = require('./config/database');
const config = require('./config/config');
const cors = require('cors');


require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// ------- CONEXAO BANCO ---------
conexao.authenticate().then(() => {
    console.log("Banco Conectado")
}).catch((erroMsg) => {
    console.log(erroMsg)
})



/* ------ MODELS ------------------------------  
Caso as tebelas não estajam criadas descomente as linhas abaixo (linha 19-32)
   e elas serão criadas automaticamente  
   Você pode dar CTRL + D e repetir o mesmo atalho para selecionar todas as '//'  */

//   const Usuario = require('./models/index');
//   const Pix = require('./models/index')
//   const Banco = require('./models/index');
//   const Conta = require('./models/index')
//   const Transacao = require('./models/index');
//   const ContaBancos = require('./models/index');


//   (async () => {
//       try {
//          await conexao.sync({ force: true });
//         console.log('Todas as tabelas foram recriadas com sucesso!');
//       } catch (err) {
//         console.error('Erro ao recriar as tabelas:', err);
//       }
//   })();

// AVISO ! APOS A COMPILAÇÃO COMENTE ESSAS LINHAS NOVAMENTE, SENÃO VOCÊ PODE PERDER TODO O CONTEUDO


// ------ Carrega Rotas ------
const indexRoute = require('./routes/index-route');
const usuarioRoute = require('./routes/usuario-route');
const bancoRoute = require('./routes/banco-route');
const contaBancariaRoute = require('./routes/conta-bancaria-route');
const pixRoute = require('./routes/pix-route');
const homeRoute = require('./routes/home-route');
const carteiraRoute = require('./routes/carteira-route')
const contaBancosRoute = require('./routes/conta-bancos-route');
const ExtratoRoute = require('./routes/extrato-route');
const contasFlux =require('./routes/conta-bancos-route');


// rotas de acesso 
app.use('/', indexRoute);
app.use(homeRoute);
app.use(carteiraRoute);
app.use('/login', usuarioRoute);
app.use('/flux', usuarioRoute);
app.use('/banco', bancoRoute);
app.use('/conta', contaBancariaRoute,contaBancosRoute);
app.use(ExtratoRoute);
app.use(pixRoute)
app.use(contasFlux);

// ------ Habilita o CORS ------

  const corsOptions = {
    origin: [/http:\/\/localhost:\d{4}/, /http:\/\/192\.168\.\d{1,3}\.\d{1,3}:\d{4}/,'http://localhost:8100','*'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
  };

  app.use(cors(corsOptions));

module.exports = app;
