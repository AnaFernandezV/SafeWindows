const db = require('../../models');




async function create (manodeobra) {
    if(!manodeobra.nom_mano) throw new Error ('Sin nombre de mano de obra')
    if(!manodeobra.ape_mano) throw new Error ('Sin apellido de mano de obra')
    if(!manodeobra.rut) throw new Error ('Sin rut')
    if(!manodeobra.correo) throw new Error ('Sin correo')
    if(!manodeobra.telefono) throw new Error ('Sin telefono')
    if(!manodeobra.especialidad) throw new Error ('Sin especialidad')




    return await db.manodeobra.create({
        ...manodeobra
        
    });

}


module.exports = {
    create
}