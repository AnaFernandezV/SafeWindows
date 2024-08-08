const { findByID, findAll } = require('../services/manodeobras/find');
const {create} = require ('../services/manodeobras/create');

async function _1createmanoobra(manodeobra){
    return await create(manodeobra);

}

async function _findByIDobra(id){
    return await findByID(id);
}

async function _findAll() {
    return await findAll()
}


module.exports = {
    _1createmanoobra,_findAll,_findByIDobra}