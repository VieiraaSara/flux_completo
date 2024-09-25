const ContaBancaria = require("../models/conta-bancaria");
const Transacao = require("../models/transacao");
const Usuario = require("../models/usuario");
const contaBancariaRepository = require("../repositories/conta-bancaria-repository");
const contaBancosrepository = require("../repositories/conta-bancos-repository");
const pixRepository = require("../repositories/pix-repository");
const sequelize = require("../config/database");
const { ContaBancos } = require("../models");
const { where } = require("sequelize");
const contaBancariaService = require("../services/conta-bancaria-service");
const { verify } = require("jsonwebtoken");
const ContaBancosRepository = require("../repositories/conta-bancos-repository");

class ContaBancosService {


  static realizarTransferencia = async (
    conta_bancaria_origem_id,
    valor_transferencia,
    fkUsuarioId,
    descricao_transacao,
    id_conta_bancaria_destino
  ) => {
    const t = await sequelize.transaction();
    try {

      const usuario = await Usuario.findByPk(fkUsuarioId);
      if (!usuario) {
        await t.rollback();
        return {
          message: `Você ainda não possui uma conta bancária para realizar a transferência`,
          status: 404,
        };
      }

      const contaBancaria = await ContaBancosService.buscarContaBancaria(
        conta_bancaria_origem_id,
        fkUsuarioId
      );

      if (!contaBancaria || !contaBancaria.data) {
        await t.rollback();
        return { message: contaBancaria.message, status: contaBancaria.status };
      }

      const contaDestino = await ContaBancosService.buscarContaBancaria(
        id_conta_bancaria_destino,
        fkUsuarioId
      );

      if (!contaDestino) {
        await t.rollback();
        return { message: "Conta de destino não encontrada", status: 404 };
      }
   
      const saldoAtual = parseFloat(contaBancaria.data.Contum.saldo);

      if (valor_transferencia > saldoAtual) {
        await t.rollback();
        return {
          message: "Você não possui saldo o suficiente em sua conta!",
          status: 400,
        };
      }

      const novoSaldoOrigem = saldoAtual - parseFloat(valor_transferencia);
      const saldoDestino = parseFloat(contaDestino.data.Contum.saldo);
      const novoSaldoDestino = saldoDestino + parseFloat(valor_transferencia);

      if (contaDestino.data.Pix.status === "VALIDANDO") {
        console.log(
          "Não é possivel realizar transferências se sua chave pix não está registrada"
        );
        return {
          message:
            "Não é possivel realizar transferências se sua chave pix não está registrada",
          status: 400,
        };
      }

      if (
        contaDestino.data.id_contaBancos === contaBancaria.data.id_contaBancos
      ) {
        console.log(
          "Você não pode realizar uma transferência para uma mesma conta bancária"
        );
        return {
          message:
            "Você não pode realizar uma transferência para uma mesma conta bancária",
          status: 400,
        };
      }



      await Promise.all([
        contaBancariaRepository.put(
          contaBancaria.data.Contum.id_conta,
          novoSaldoOrigem,
          contaBancaria.data.usuario_id,
          { transaction: t }
        ),
        contaBancariaRepository.put(
          contaDestino.data.Contum.id_conta,
          novoSaldoDestino,
          contaDestino.data.usuario_id,
          { transaction: t }
        ),
      ]);
  


      await ContaBancosService.registrarTransacao({
        valor: -valor_transferencia,
        data_transacao: new Date(),
        tipo_operacao: "transferência",
        descricao: descricao_transacao,
        usuario_id: fkUsuarioId,
        conta_flux_origem_id: conta_bancaria_origem_id,
        conta_bancos_destino_id: id_conta_bancaria_destino,
    }, { transaction: t });
    
    await ContaBancosService.registrarTransacao({
        valor: valor_transferencia,
        data_transacao: new Date(),
        tipo_operacao: "depósito",
        descricao: descricao_transacao,
        usuario_id: fkUsuarioId,
        conta_flux_origem_id: conta_bancaria_origem_id,
        conta_bancos_destino_id: id_conta_bancaria_destino,
    }, { transaction: t });

     
      // console.log('transacaoOrigem: ', transacaoOrigem);
      console.log('-----------------------------------------------------------------');
      // console.log('transacaoDestino: ', transacaoDestino);
      await t.commit();

      const contaBancariaUpdate = await contaBancosrepository.findOne({
        contaBancaria_id: conta_bancaria_origem_id,
        usuario_id: fkUsuarioId,
      });

      return {
        message: "Transferência realizada com sucesso", 
        data: contaBancariaUpdate.data,
        status: 201,
      };
    } catch (error) {
      await t.rollback();
      return {
        message: "Falha na requisição: " + error.message,
        status: 500,
      };
    }
  };

  static buscarContasDoFlux = async (fkUsuarioId) => {
    console.log("SERVICE", fkUsuarioId);

    const res = await contaBancosrepository.get(fkUsuarioId);

    if (!res) {
      return { message: res.message, status: res.status };
    }
    return { data: res.data, status: res.status };
  };

  static async buscarContaBancaria(contaBancaria_id, usuario_id) {
    const conta = await contaBancosrepository.findOne({
      contaBancaria_id,
      usuario_id,
    });
    if (!conta) {
      return { message: "Conta não encontrada", status: 404 };
    }

    return { data: conta.data, status: conta.status };
  }

  static async verificarSaldoSuficiente(contaBancaria_id, usuario_id, valor) {
    const conta_id = contaBancaria_id;
    const conta = await ContaBancosRepository.findOne({ conta_id, usuario_id });

    const saldoDisponivelNaConta = await conta.data.Contum.saldo;

    if (saldoDisponivelNaConta < valor) {
      return {
        message: "Você não possui saldo o suficiente em sua conta!",
        status: 400,
      };
    }

    return { data: conta.data, status: conta.status };
  }

  static async atualizarSaldoConta(idConta, novoSaldo) {
    await contaBancariaRepository.update(
      { saldo: novoSaldo },
      { where: { id: idConta } }
    );
  }
  static async registrarTransacao(dadosTransacao) {
    console.log('--------------------------------------------');
   console.log(dadosTransacao);
   console.log('--------------------------------------------');
    const res = await Transacao.create(dadosTransacao);

    return { data: res };
  }
}

module.exports = ContaBancosService;
