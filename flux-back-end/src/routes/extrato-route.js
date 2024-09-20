
const express = require('express');
const controller = require('../controllers/extrato-controller')
const router = express.Router();
const authService = require('../services/auth-service');

// apenas administradores acessar as rotas de banco tirando a listagem

router.get('/impressao-geral', authService.authorize, controller.imprimirExtratoGeral); //users, para ver os bancos disponiveis







module.exports = router;
