const { create }= require('../services/detallecotizacion/create');
const {findByID, findAll ,findBycodigo}= require('../services/detallecotizacion/find')

async function _1createdetallecotizacion(cotizacion){
    return await create(cotizacion);
}

async function _findByID(id){
    return await findByID(id);
}
async function _findByCodigo(codigo){
    return await findBycodigo(codigo);
}


async function _findAll() {
    return await findAll()
}

module.exports = {
    _1createdetallecotizacion,_findAll,_findByID,_findByCodigo
}