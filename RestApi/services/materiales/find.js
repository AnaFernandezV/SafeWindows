const db = require('../../models');

async function findByID(id){
    if(!id) throw new Error('sin id de material...');
    return await db.material.findOne({

        where:{
            id
        }
    });
}

async function findAll(){
    return await db.material.findAll({
        attributes: ['id','nom_material','descripcion','tipo','precio']
    })
}
module.exports ={
    findByID, findAll
}