const db = require('../../models');

async function findByID(id){
    if(!id) throw new Error('sin id de transporte...');
    return await db.transporte.findOne({

        where:{
            id
        }
    });
}

async function findAll(){
    return await db.transporte.findAll({
        attributes: ['id','emp_tra','correo','telefono','sector', 'cargo_ser']
    })
}
module.exports ={
    findByID, findAll
}