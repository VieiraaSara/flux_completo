const jwt = require('jsonwebtoken');

class AuthService {
    static generateToken = async (data) => {
        const TokenExpirationTime = '1d';
        return jwt.sign(data, global.SALT_KEY, { expiresIn: TokenExpirationTime });
    }

    static decodeToken = async (token) => {
        try {
            return await jwt.verify(token, global.SALT_KEY);
        } catch (error) {
            throw new Error('Token inválido ou expirado.');
        }
    }

    static authorize = async (req, res, next) => {
        try {
            const token = req.body.token || req.query.token || req.headers['x-access-token'];

            if (!token) {
                return res.status(401).json({ message: 'Acesso restrito: token não fornecido.' });
            }

            await AuthService.decodeToken(token); // Verifica a validade do token
            next();
        } catch (error) {
            res.status(401).json({ message: 'Token inválido ou expirado.' });
        }
    }

    static isAdmin = async (req, res, next) => {
        try {
            const token = req.body.token || req.query.token || req.headers['x-access-token'];

            if (!token) {
                return res.status(401).json({ message: 'Acesso restrito: token não fornecido.' });
            }

            const decoded = await AuthService.decodeToken(token); // Verifica a validade do token

            if (decoded.roles && decoded.roles.includes('admin')) {
                next();
            } else {
                res.status(403).json({ message: 'Acesso restrito: administrador necessário.' });
            }
        } catch (error) {
            res.status(401).json({ message: 'Token inválido ou expirado.' });
        }
    }
}

module.exports = AuthService;
