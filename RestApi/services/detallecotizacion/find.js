const db = require('../../models');

async function findByID(id){
    if(!id) throw new Error('sin id de cotizacion...');
    return await db.detallecotizacion.findOne({

        where:{
            id
        }
    });
}


async function findBycodigo(codigo){
    if(!codigo) throw new Error('sin codigo de cotizacion...');
    return await db.detallecotizacion.findAll({
        where:{
            codigo
        }
    });
}

async function findAll(){
    return await db.detallecotizacion.findAll({
        attributes: ['id','emp_coti','codigo']
    })
}
module.exports ={
    findByID, findAll,findBycodigo
}