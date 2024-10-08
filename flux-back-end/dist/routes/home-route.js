
const express = require('express');
const controller = require('../controllers/home-controller')
const authService = require('../services/auth-service');
const router = express.Router();
router.get('/home',authService.authorize,controller.renderHome);

module.exports = router;