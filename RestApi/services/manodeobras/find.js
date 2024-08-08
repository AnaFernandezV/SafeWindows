const db = require('../../models');

async function findByID(id){
    if(!id) throw new Error('sin id de manodeobra...');
    return await db.manodeobra.findOne({

        where:{
            id
        }
    });
}

async function findAll(){
    return await db.manodeobra.findAll({
        attributes: ['id','nom_mano','ape_mano','rut','correo','telefono','especialidad']
    })
}
module.exports ={
    findByID, findAll
}