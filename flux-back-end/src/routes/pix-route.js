const express = require('express');
const controller = require('../controllers/pix-controller')
const router = express.Router();
const authService = require('../services/auth-service');


router.post('/cadastrar-chave',authService.authorize,controller.criarChave); 
router.put('/pix/key/:id/verify',authService.authorize,controller.verificarChave); 
router.put('/pix/key/:id/resendVerificationCode',authService.authorize,controller.reenviarCodigo); 
router.get('/pix',authService.authorize,controller.listarChavesPix);
router.get('/pix/key/:id',authService.authorize,controller.buscarChavePixPorID);
router.delete('/pix/key/:id',authService.authorize,controller.deletarChave);


module.exports = router;
