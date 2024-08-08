const {create} = require ('../services/proveedores/create');
const { findByID, findAll } = require('../services/proveedores/find');


async function _1createprove(proveedor){
    return await create(proveedor);
}

async function _findByIDprove(id){
    return await findByID(id);
}

async function _findAll() {
    return await findAll()
}

module.exports = {
    _1createprove,_findAll,_findByIDprove
}