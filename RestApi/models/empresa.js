const Sequelize = require('sequelize-oracle')

module.exports = (sequelize,DataTypes) => {
    return sequelize.define('empresa',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey:true
        },
        nom_empresa: {
            type: Sequelize.STRING,
            required:true,
            allownull:false,
            len:[6,50]
        },
        rut: {
            type: Sequelize.STRING,
            required:true,
            allownull:false,
            len:[12,14]
        },
        telefono: {
            type: Sequelize.INTEGER,
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
        direccion: {
            type: Sequelize.STRING,
            required:true,
            allownull:false,
            len:[12,50]
        },
        contrasena: {
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