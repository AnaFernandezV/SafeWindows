const db = require('../../models');
const bcrypt = require('bcrypt')



async function create(empresa){
    if(!empresa.nom_empresa) throw new Error ('Sin nombre de empresa')
    if(!empresa.rut) throw new Error ('Sin rut')
    if(!empresa.telefono) throw new Error ('Sin fono')
    if(!empresa.correo) throw new Error ('Sin mail')
    if(!empresa.direccion) throw new Error ('Sin direccion')
    if(!empresa.contrasena) throw new Error ('Sin pass')

    return await db.empresa.create({
        ...empresa,
        contrasena:bcrypt.hashSync(empresa.contrasena, 10)
    });
}

module.exports = { 
    create
}