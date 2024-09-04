const express = require('express');
const router = express.Router();
const controller = require('../controllers/conta-bancaria-controller');
const authService = require('../services/auth-service');

router.post('/criar-conta-bancaria', authService.authorize, controller.criarContaBancaria);
router.get('/listar-contas', authService.authorize, controller.listarContasBancarias);
router.put('/atualizar-conta/:id', authService.authorize, controller.atualizarContaBancaria);
router.delete('/deletar-conta/:id', authService.authorize, controller.deletarContaBancaria);
router.get('/bucar-conta/:id', authService.authorize, controller.buscarContasBancariasPorId);


module.exports = router;