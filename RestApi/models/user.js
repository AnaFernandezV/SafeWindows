const Sequelize = require('sequelize-oracle')

module.exports = (sequelize,DataTypes) => {
    return sequelize.define('user',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey:true
        },
        username: {
            type: Sequelize.STRING,
            required:true,
            allownull:false,
            len:[6,20]
        },
        password: {
            type: Sequelize.STRING,
            required:true,
            allownull:false,
            len:[6,20]
        }
        ,
        tipo: {
            type: Sequelize.STRING,
            required:true,
            allownull:false,
            len:[6,20]
        }
    },{
        underscored:true,
        paranoid:true
    })
}