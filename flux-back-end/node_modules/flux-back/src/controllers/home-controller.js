const transacaoService = require('../services/transacao-service');
const authService = require('../services/auth-service');
class HomeController {

    static renderHome = async (req, res) => {
        try {

            //Recupera o token
            const token = req.body.token || req.query.token || req.headers['x-access-token'];

            // Decodifica o token
            const data = await authService.decodeToken(token);
            const usuario_id_token = data.id;
            const usuario_nome_token = data.nome

            const response = await transacaoService.listarDadosHome(usuario_id_token, usuario_nome_token)
            if (response.status === 200) {
                return res.status(response.status).json(response.data);
            } else {

                return res.status(response.status).json({data:response.data,message: response.message});
            }

        } catch (error) {
            throw error
        }
    }
}

module.exports = HomeController;