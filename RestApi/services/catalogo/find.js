const db = require('../../models');

async function findByID(id){
    if(!id) throw new Error('sin id de catalogo...');
    return await db.catalogo.findOne({

        where:{
            id
        }
    });
}

async function findAll(){
    return await db.catalogo.findAll({
        attributes: ['id','nom_cata','descripcion','imagen','extra']
    })
}
module.exports ={
    findByID, findAll
}