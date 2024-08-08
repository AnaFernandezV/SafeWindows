const db = require('../../models');




async function create(detallecotizacion){
    if(!detallecotizacion.codigo) throw new Error ('Sin Codigo')
    
    return await db.detallecotizacion.create({
        ...detallecotizacion,

    });
}

module.exports = { 
    create
}