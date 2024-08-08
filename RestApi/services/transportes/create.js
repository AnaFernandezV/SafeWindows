const db = require('../../models');




async function create (transporte) {
    if(!transporte.emp_tra) throw new Error ('Sin nombre de empresa transporte')
    if(!transporte.correo) throw new Error ('Sin correo ')
    if(!transporte.telefono) throw new Error ('Sin telefono')
    if(!transporte.sector) throw new Error ('Sin sector')
    if(!transporte.cargo_ser) throw new Error ('Sin cargo de servicio')



    return await db.transporte.create({
        ...transporte
        
    });

}


module.exports = {
    create
}