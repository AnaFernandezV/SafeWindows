const Sequelize = require('sequelize-oracle')

module.exports = (sequelize,DataTypes) => {
    return sequelize.define('catalogo',{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nom_cata:{
            type: Sequelize.STRING,
            required: true,
            allownull: false,
            len:[6,50]

        },
        descripcion:{
            type: Sequelize.STRING,
            required: true,
            allownull: false,
            len: [6, 100]
        },
        extra:{
            type: Sequelize.INTEGER,
            required: true,
            allownull: false
        },

        imagen:{
            type: Sequelize.STRING,
            required: true,
            allownull: false,
            len: [6, 100]
        }
    
    }, {

        underscored: true,
        paranoid: true

    })
}