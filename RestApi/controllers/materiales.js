const {create} = require ('../services/materiales/create');
const {findByID, findAll }= require('../services/materiales/find')

async function _1createmat(material){
    return await create(material);
}

async function _findByIDmat(id){
    return await findByID(id);
}

async function _findAll() {
    return await findAll()
}

module.exports = {
    _1createmat,_findAll,_findByIDmat
}


