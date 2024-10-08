
const { DataTypes, Model, Sequelize } = require('sequelize');
const Usuario = require('./usuario');
const ContaBancaria = require('./conta-bancaria');
const Banco = require('./banco');


class ContaBancos extends Model {
    static init(sequelize) {
        return super.init({
            id_contaBancos: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            pix_id: {
                type: Sequelize.UUID,
                allowNull: true, references: {
                    model: 'pix',
                    key: 'id_pix',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }

            },
            // usuario_id: {
            //     type: DataTypes.INTEGER,
            //     allowNull: false,
            //     references: {
            //         model: Usuario,
            //         key: 'id_usuario',
            //         onDelete: 'CASCADE',
            //         onUpdate: 'CASCADE'
            //     }
            // },
            contaBancaria_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: ContaBancaria,
                    key: 'id_conta',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            },
          
            status:{
                type: DataTypes.ENUM('ATIVO','INATIVO'),
                allowNull: false,
                defaultValue: 'ATIVO'
            },
        },
         {
            sequelize,
            tableName: 'conta_bancos',
            timestamps: true,
        });
    }
}


module.exports = ContaBancos;
