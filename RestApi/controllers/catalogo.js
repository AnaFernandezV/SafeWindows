const {create} = require ('../services/catalogo/create');
const {findByID, findAll }= require('../services/catalogo/find')

async function _1createcatalogo(catalogo){
    return await create(catalogo);
}
async function _findByIDcatalogo(id){
    return await findByID(id);
}
async function _findAll() {
    return await findAll()
}


module.exports = {
    _1createcatalogo,_findAll,_findByIDcatalogo
}