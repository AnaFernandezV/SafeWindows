const Sequelize = require('sequelize-oracle')

module.exports = (sequelize,DataTypes) => {
    return sequelize.define('cotizacion',{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        emp_coti:{
            type: Sequelize.STRING,
            required: true,
            allownull: false,
            len:[6,50]

        },
        codigo: {
            type: Sequelize.INTEGER,
            require: true,
            allownull: false
        },
        total: {
            type: Sequelize.INTEGER,
            require: true,
            allownull: false
        },
         estado:{
            type: Sequelize.STRING,
            required: true,
            allownull: false,
            len:[6,50]

        }
    }, {

        underscored: true,
        paranoid: true

    })
}