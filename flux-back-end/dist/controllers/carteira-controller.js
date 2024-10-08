
const transacaoService = require('../services/transacao-service');
const authService = require('../services/auth-service');
class CarteiraController {

    static renderCarteira = async (req, res) => {
        try {

           //Recupera o token
            const token = req.body.token || req.query.token || req.headers['x-access-token'];

            // Decodifica o token
            const data = await authService.decodeToken(token);
            const usuario_id_token = data.id;
         

            const response = await transacaoService.listarHistoricoTransacao(usuario_id_token)


            if (response.status === 200) {

                return res.status(response.status).json(response.data);

            } else {
                console.log(response.status);
                console.log(response.status);
                console.log(response.status);
                return res.status(response.status).json({ message: response.data })
            }
        } catch (error) {
            throw error
        }
    }
}

module.exports = CarteiraController;