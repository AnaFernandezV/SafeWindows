const { findByID, findAll } = require('../services/transportes/find');
const {create} = require ('../services/transportes/create');

async function _1createtrans(transporte){
    return await create(transporte);

}

async function _findByIDtrans(id){
    return await findByID(id);
}

async function _findAll() {
    return await findAll()
}


module.exports = {
    _1createtrans,_findAll,_findByIDtrans
}