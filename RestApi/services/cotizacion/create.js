const db = require('../../models');




async function create(cotizacion){
    if(!cotizacion.emp_coti) throw new Error ('Sin empresa')
    if(!cotizacion.codigo) throw new Error ('Sin Codigo')
    
    return await db.cotizacion.create({
        ...cotizacion,

    });
}

module.exports = { 
    create
}