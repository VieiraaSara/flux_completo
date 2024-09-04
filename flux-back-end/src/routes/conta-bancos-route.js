
const express = require('express');
const controller = require('../controllers/conta-bancos-controller')
const authService = require('../services/auth-service');
const router = express.Router();
router.post('/realizar-transferencia/conta-bancaria/:id',authService.authorize,controller.criarTransferencia);


module.exports = router;