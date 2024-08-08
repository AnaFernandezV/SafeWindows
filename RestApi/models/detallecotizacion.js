const Sequelize = require('sequelize-oracle')

module.exports = (sequelize,DataTypes) => {
    return sequelize.define('detallecotizacion',{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        codigo:{
            type: Sequelize.STRING,
            required: true,
            allownull: false,
            len:[6,50]

        },
        ventanta: {
            type: Sequelize.STRING,
            require: true,
            allownull: false
        },
        largo: {
            type: Sequelize.INTEGER,
            require: true,
            allownull: false
        },
        ancho: {
            type: Sequelize.INTEGER,
            require: true,
            allownull: false
        },
        instalacion: {
            type: Sequelize.INTEGER,
            require: true,
            allownull: false
        },
        cantidad: {
            type: Sequelize.INTEGER,
            require: true,
            allownull: false
        },
        total: {
            type: Sequelize.INTEGER,
            require: true,
            allownull: false
        }
    }, {

        underscored: true,
        paranoid: true

    })
}