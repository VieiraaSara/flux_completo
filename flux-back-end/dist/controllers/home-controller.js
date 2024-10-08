"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
const transacaoService = require('../services/transacao-service');
const authService = require('../services/auth-service');
class HomeController {
}
_a = HomeController;
HomeController.renderHome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        // Decodifica o token
        const data = yield authService.decodeToken(token);
        const usuario_id_token = data.id;
        const usuario_nome_token = data.nome;
        const response = yield transacaoService.listarDadosHome(usuario_id_token, usuario_nome_token);
        if (response.status === 200) {
            return res.status(response.status).json(response.data);
        }
        else {
            return res.status(response.status).json({ data: response.data, message: response.message });
        }
    }
    catch (error) {
        throw error;
    }
});
module.exports = HomeController;
