const { create }= require('../services/cotizacion/create');
const {findByID, findAll,findByFechas }= require('../services/cotizacion/find')

async function _1createCotizacion(cotizacion){
    return await create(cotizacion);
}

async function _findByID(id){
    return await findByID(id);
}

async function _findAll() {
    return await findAll()
}
async function _findByFechas(fechaInicio, fechaFin) {
    return await findByFechas(fechaInicio, fechaFin)
}

module.exports = {
    _1createCotizacion,_findAll,_findByID,_findByFechas
}