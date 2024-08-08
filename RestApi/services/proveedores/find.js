const db = require('../../models');

async function findByID(id){
    if(!id) throw new Error('sin id de proveedor...');
    return await db.proveedor.findOne({

        where:{
            id
        }
    });
}

async function findAll(){
    return await db.proveedor.findAll({
        attributes: ['id','nom_pro','correo','telefono','direccion']
    })
}
module.exports ={
    findByID, findAll
}