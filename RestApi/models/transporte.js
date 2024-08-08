const Sequelize = require('sequelize-oracle')

module.exports = (sequelize,DataTypes) => {
    return sequelize.define('transporte',{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        emp_tra: {
            type: Sequelize.STRING,
            required:true,
            allownull:false,
            len:[6,50]
        },
        correo: {
            type: Sequelize.STRING,
            required:true,
            allownull:false,
            len:[12,50]
        },
        telefono: {
            type: Sequelize.STRING,
            required:true,
            allownull:false,
            len:[12,50]
        },
        sector: {
            type: Sequelize.STRING,
            required:true,
            allownull:false,
            len:[8,20]
        },
        cargo_ser: {
            type: Sequelize.INTEGER,
            required: true,
            allownull: false,
        }
    },{
        underscored:true,
        paranoid:true
    })
}