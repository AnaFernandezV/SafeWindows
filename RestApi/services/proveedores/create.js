const db = require('../../models');




async function create (proveedor) {
    if(!proveedor.nom_pro) throw new Error ('Sin nombre de proveedor')
    if(!proveedor.correo) throw new Error ('Sin correo')
    if(!proveedor.telefono) throw new Error ('Sin telefono')
    if(!proveedor.direccion) throw new Error ('Sin direccion')




    return await db.proveedor.create({
        ...proveedor
        
    });

}


module.exports = {
    create
}