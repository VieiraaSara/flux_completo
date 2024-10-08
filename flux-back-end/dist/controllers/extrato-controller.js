const transacaoService = require("../services/transacao-service");
const authService = require("../services/auth-service");
class ExtratoController {
  static imprimirExtratoGeral = async (req, res) => {
    try {
      const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

      // Decodifica o token
      const data = await authService.decodeToken(token);
      const usuario_id_token = data.id;

      const response = await transacaoService.listarExtratoGeral(
        usuario_id_token
      );
      if (response.status === 200) {
      
        return res.status(response.status).json(response.data);
      } else {
     
        return res
          .status(response.status)
          .json({ data: response.data, message: response.message });
      }
    } catch (error) {
      throw error;
    }
  };

  static imprimirExtratoContaBancariaPeloID = async (req, res) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];

    // Decodifica o token
    const data = await authService.decodeToken(token);
    const usuario_id_token = data.id;
    const id_conta_bancaria = req.params.id;

    const response = await transacaoService.buscarExtratoContaBancaria(
      usuario_id_token,
      id_conta_bancaria
    );

    if (response.status === 200) {
      console.log(response);
      return res.status(response.status).json(response.data);
    } else {
      console.log(response);
      return res
        .status(response.status)
        .json({ data: response.data, message: response.message });
    }
  };
}

module.exports = ExtratoController;
