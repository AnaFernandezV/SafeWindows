const { create }= require('../services/manodeobra/create');


async function _1create(manodeobra){
    return await create(manodeobra);
}


module.exports = {
    _1create
}