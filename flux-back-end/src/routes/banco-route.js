
const express = require('express');
const controller = require('../controllers/banco-controller')
const router = express.Router();
const authService = require('../services/auth-service');

// apenas administradores acessar as rotas de banco tirando a listagem
router.post('/cadastro-banco', authService.isAdmin, controller.cadastrarBanco); //admin
router.get('/listar-bancos', authService.authorize, controller.listarBancos); //users, para ver os bancos disponiveis
<<<<<<< HEAD
router.get('/buscar-banco/id/:id', authService.authorize, controller.listarBancosPorId); //admin
router.put('/atualizar-banco/:id', authService.authorize, controller.atualizarBanco); //admin
router.delete('/excluir-banco/:id', authService.authorize, controller.deletarBanco); //admin
=======
router.get('/buscar-banco/id/:id', authService.authorize, controller.listarBancosPorId); 
router.put('/atualizar-banco/:id',authService.authorize, controller.atualizarBanco); 
router.delete('/excluir-banco/:id',authService.authorize, controller.deletarBanco); 
>>>>>>> 66b3ce12898191929b0eea5ce3e1939e6551f522
router.get('/instituicoes', controller.consultarBancos);






module.exports = router;
