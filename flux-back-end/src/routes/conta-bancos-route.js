
const express = require('express');
const controller = require('../controllers/conta-bancos-controller')
const authService = require('../services/auth-service');
const router = express.Router();
router.get('/listar-contas-flux',authService.authorize,controller.listarContasFlux)
router.post('/realizar-transferencia',authService.authorize,controller.criarTransferencia);


module.exports = router;