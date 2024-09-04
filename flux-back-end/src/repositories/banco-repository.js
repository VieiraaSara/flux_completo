const Banco = require('../models/banco');
class BancoRepository {

    //Listar bancos
    static get = async () => {
        const res = await Banco.findAll({
            // attributes: ['nome_banco', 'descricao']
        });
        return res;
    };

    // Cadastrar banco
    static post = async (body) => {
        let nomeBanco = body.nome_banco;
        const bancoExistente = await Banco.findOne({
            where: { nome_banco: nomeBanco },
        });

        if (bancoExistente) {
            console.log("Banco já cadastrado");
            return {
                message: "Banco já cadastrado",
                status: 400
            };
        }

        const res = await Banco.create(body);

        return { data: res, status: 201 };


    }

    // Atualizar banco pelo ID
    static put = async (id, body) => {
      
      const res = await Banco.findByPk(id)
            .then(bancoEncontrado => {
                if(!bancoEncontrado || bancoEncontrado === null){
                    return console.log('Banco não encontrado');
                }
                return bancoEncontrado.update(body);
            });
            
        return res;
    };

    // Deletar banco pelo ID
    static delete = async (id) => {
      const  res = await Banco.findByPk(id)
            .then(BancoEncontrado => {
                if (!BancoEncontrado || BancoEncontrado === null) {
                    console.log('Banco não encontrado');
                }
                return BancoEncontrado.destroy({
                    where: {
                        id
                    }
                });
            });

        return res;
    };

    // Buscar banco pelo ID
    static getById = async (id) => {
        const res = await Banco.findByPk(id);
        return res;
    };

}


module.exports = BancoRepository;