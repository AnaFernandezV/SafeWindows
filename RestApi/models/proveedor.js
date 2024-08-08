const Sequelize = require('sequelize-oracle')

module.exports = (sequelize,DataTypes) => {
    return sequelize.define('proveedor',{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nom_pro:{
            type: Sequelize.STRING,
            required: true,
            allownull: false,
            len:[6,50]

        },
        correo:{
            type: Sequelize.STRING,
            required: true,
            allownull: false,
            len: [6, 100]
        },
        telefono: {
            type: Sequelize.INTEGER,
            require: true,
            allownull: false
        },
        direccion: {
            type: Sequelize.STRING,
            required: true,
            allownull: false,
            len: [6, 50]
        }
    }, {

        underscored: true,
        paranoid: true

    })
}