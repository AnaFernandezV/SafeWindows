const db = require('../../models');
const bcrypt = require('bcrypt')



async function create(catalogo){
    if(!catalogo.nom_cata) throw new Error ('Sin nombre de catalogo')
    if(!catalogo.descripcion) throw new Error ('Sin rut')
    if(!catalogo.imagen) throw new Error ('Sin imagen!')
    if(!catalogo.extra) throw new Error ('Sin extra!')


    return await db.catalogo.create({
        ...catalogo
        
    });
}

module.exports = { 
    create
}