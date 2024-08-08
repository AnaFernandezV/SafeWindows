const Sequelize = require('sequelize-oracle')

module.exports = (sequelize,DataTypes) => {
    return sequelize.define('material' , {

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nom_material: {
            type: Sequelize.STRING,
            require: true,
            allownull: false,
            len: [6, 50]
        },
        descripcion: {
            type: Sequelize.STRING,
            require: true,
            allownull: false,
            len: [10, 80]
        },

        tipo: {
            type: Sequelize.STRING,
            require: true,
            allownull: false,
            len: [10, 30]
        },
        precio: {
            type:Sequelize.INTEGER,
            require: true,
            allownull: false

        }
    },{
        underscored: true,
        paranoid: true

    })

}