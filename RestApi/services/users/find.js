const db = require('../../models');

async function findByUsername(username){
    if(!username) throw new Error('sin nombre de user...');
    return await db.user.findOne({

        where:{
            username
        }
    });
}

async function findByUsernameID(id){
    if(!id) throw new Error('sin id de user...');
    return await db.user.findOne({

        where:{
            id
        }
    });
}


async function findAll(){
    return await db.user.findAll({
        attributes: ['id','username','tipo','created_at']
    })
}
module.exports ={
    findByUsername, findAll, findByUsernameID
}