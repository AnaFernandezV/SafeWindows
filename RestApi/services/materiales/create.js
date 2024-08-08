const db = require('../../models');




async function create (material) {
    if(!material.nom_material) throw new Error ('Sin nombre de Material')
    if(!material.descripcion) throw new Error ('Sin descripcion')
    if(!material.tipo) throw new Error ('Sin tipo')
    if(!material.precio) throw new Error ('Sin precio')


    return await db.material.create({
        ...material
        
    });

}


module.exports = {
    create
}
