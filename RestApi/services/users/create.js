const db = require('../../models');
const bcrypt = require('bcrypt')



async function create(user){
    if(!user.username) throw new Error ('Sin nombre de usuario')
    if(!user.password) throw new Error ('Sin password')

    return await db.user.create({
        ...user,
        password:bcrypt.hashSync(user.password, 10)
    });
}

module.exports = { 
    create
}