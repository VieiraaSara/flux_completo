const Banco = require('../models/banco');
class BancoRepository {

    //Listar bancos
    static get = async () => {
        const res = await Banco.findAll();

        if(!res){
            return {message: "Bancos não encontrados",status:404}
        }
        return  {data: res,status:200};
    };

    // Cadastrar banco
    static post = async (body) => {
      
console.log(body.id_banco);
console.log(body.code);
console.log(body.ispb);
console.log(body.name);
console.log(body.id);
console.log(body);
console.log(body);
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
    static findOneByName = async (name) => {
        const res = await Banco.findOne(name);
        return res;
    };
}


module.exports = BancoRepository;