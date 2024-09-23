const homeRepository = require("../repositories/home-repository");
const cateiraRepository = require("../repositories/carteira-repository");
const transacaoRepository = require("../repositories/transacao-repository");
const Transacao = require("../models/transacao");
const usuarioRepository = require("../repositories/usuario-repository");
class TransacaoService {
  static listarDadosHome = async (id_user, usuario_nome_token) => {
    const query = await homeRepository.getHomeData(id_user, 10);
    const username = usuario_nome_token;

    if (!query || query.data == null || query.data.length === 0) {
      return {
        status: 206,
        data: username,
        message: "Você ainda não possui transações feitas",
      };
    }
    return { status: 200, data: query.data, nome: username };
  };

  static listarHistoricoTransacao = async (id_user) => {
    var query = await cateiraRepository.get(id_user, 10);

    if (!query || query.data.length === 0) {
      return {
        status: 204,
        message: "Você ainda não realizou transações",
      };
    }
    const resultPorcentAndQuery = query.data
      .map((transacao) => {
        let total = parseFloat(transacao.saldoTotalGeral).toFixed(2);
        let valor = parseFloat(transacao.valor).toFixed(2);
        let tipo_operacao = transacao.tipo_operacao;

        if (tipo_operacao == "deposito") {
          let aumentoPorcent = (valor / total) * 100;
          console.log(`Aumento Percentual: ${aumentoPorcent.toFixed(2)}%`);
          return {
            ...transacao,
            porcentagem: `${aumentoPorcent.toFixed(2)}%`,
          };
        } else if (tipo_operacao == "transferencia") {
          console.log(tipo_operacao);
          let diminuicaoPorcent = (valor / total) * 100;
          console.log(diminuicaoPorcent);
          console.log(
            `Diminuição Percentual: ${diminuicaoPorcent.toFixed(2)}%`
          );

          return {
            ...transacao,
            porcentagem: `${diminuicaoPorcent.toFixed(2)}%`,
          };
        }
        return;
      })
      .filter((transacoes) => transacoes !== null);
    const campoSaltoTotalGeral = query.data.map(
      (transacao) => transacao.saldoTotalGeral
    );
    const totalGeral =
      campoSaltoTotalGeral.length > 0 ? campoSaltoTotalGeral[0] : null;

    return { status: 200, data: { totalGeral, resultPorcentAndQuery } };
  };


  
  static listarExtratoGeral = async (id_user) => {
    const query = await transacaoRepository.buscarExtratoGeral(id_user);

    if (!query || query.data.length === 0) {
      return {
        status: 204,
        message: "Você ainda não realizou transações",
      };
    }
    return { data: query.data, status: 200 };
  };

  static buscarExtratoContaBancaria = async (id_user, contaBancariaId) => {
    const query = await transacaoRepository.buscarExtratoBancario(
      id_user,
      contaBancariaId
    );
    if (!query || query.data.length === 0) {
      return {
        status: 204,
        message: "Você ainda não realizou transações",
      };
    }
    return { data: query.data, status: 200 };
  };
}

module.exports = TransacaoService;
