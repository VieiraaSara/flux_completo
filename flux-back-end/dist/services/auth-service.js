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
const jwt = require('jsonwebtoken');
class AuthService {
}
_a = AuthService;
AuthService.generateToken = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const TokenExpirationTime = '1d';
    return jwt.sign(data, global.SALT_KEY, { expiresIn: TokenExpirationTime });
});
AuthService.decodeToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield jwt.verify(token, global.SALT_KEY);
    }
    catch (error) {
        throw new Error('Token inválido ou expirado.');
    }
});
AuthService.authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (!token) {
            return res.status(401).json({ message: 'Acesso restrito: token não fornecido.' });
        }
        yield _a.decodeToken(token); // Verifica a validade do token
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
});
AuthService.isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (!token) {
            return res.status(401).json({ message: 'Acesso restrito: token não fornecido.' });
        }
        const decoded = yield _a.decodeToken(token); // Verifica a validade do token
        if (decoded.roles && decoded.roles.includes('admin')) {
            next();
        }
        else {
            res.status(403).json({ message: 'Acesso restrito: administrador necessário.' });
        }
    }
    catch (error) {
        res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
});
module.exports = AuthService;
