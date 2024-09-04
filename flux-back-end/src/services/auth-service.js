const jwt = require('jsonwebtoken');

class AuthService{
    
    static generateToken = async (data) => {
        const TokenExpirationTime = '1d';
        return jwt.sign(data, global.SALT_KEY, { expiresIn: TokenExpirationTime });
    }
    
    static decodeToken = async (token) => {
        var data = await jwt.verify(token, global.SALT_KEY);
        return data;
    }
    
    static authorize = function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
        if (!token) {
            res.status(401).json({
                message: 'Acesso Restrito'
            });
        } else {
            jwt.verify(token, global.SALT_KEY, function (error, decoded) {
                if (error) {
                    res.status(401).json({
                        message: 'Token Inválido'
                    });
                } else {
                    next();
                }
            });
        }
    };
    
    static isAdmin = function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
        if (!token) {
            res.status(401).json({
                message: 'Token Inválido'
            });
        } else {
            jwt.verify(token, global.SALT_KEY, function (error, decoded) {
                if (error) {
                    res.status(401).json({
                        message: 'Token Inválido'
                    });
                } else {
                    if (decoded.roles.includes('admin')) {
                        next();
                    } else {
                        res.status(403).json({
                            message: 'Esta funcionalidade é restrita para administradores'
                        });
                    }
                }
            });
        }
    };
}
module.exports = AuthService;