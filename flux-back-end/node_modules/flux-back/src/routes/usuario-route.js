const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario-controller');
const authService = require('../services/auth-service');

router.post('/cadastro-usuario', controller.cadastrarUsuario);
router.post('/login', controller.autenticar); 
router.post('/refresh-token', authService.authorize, controller.refreshToken); 
router.post('/forget-password',controller.recuperarSenha);
router.put('/validate-account',controller.validarConta)

router.get('/listar-usuarios', authService.authorize, controller.listarUsuarios);
router.get('/buscar-usuario/:id', authService.authorize, controller.buscarUsuarioPeloID);
router.get('/buscar-usuario/', authService.authorize, controller.buscarUsuarioPeloID); // metodo passando o id pelo token e ja vindo o usuário que esta registrado
router.patch('/atualizar-usuario/:id', authService.authorize, controller.atualizarUsuario); 
router.delete('/excluir-usuario/:id',authService.authorize, controller.deletarUsuario);

module.exports = router;
