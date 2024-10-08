const express = require('express');
const controller = require('../controllers/carteira-controller')
const authService = require('../services/auth-service');
const router = express.Router();

router.get('/carteira',authService.authorize,controller.renderCarteira);

module.exports = router;