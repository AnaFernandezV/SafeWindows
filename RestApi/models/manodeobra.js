const Sequelize = require('sequelize-oracle')

module.exports = (sequelize,DataTypes) => {
    return sequelize.define('manodeobra',{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        nom_mano: {
            type: Sequelize.STRING,
            required:true,
            allownull:false,
            len:[6,50]
        },
        ape_mano: {
            type: Sequelize.STRING,
            required:true,
            allownull:false,
            len:[12,14]
        },
        rut: {
            type: Sequelize.STRING,
            required:true,
            allownull:false,
            len:[12,14]
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
        especialidad: {
            type: Sequelize.STRING,
            required:true,
            allownull:false,
            len:[8,20]
        }
    },{
        underscored:true,
        paranoid:true
    })
}