const localStrategy = require('passport-local').Strategy 
const{ _findByUsername } = require('../controllers/users'),
bcrypt = require('bcrypt');

module.exports = new localStrategy({session: false}, async (username,password,done) => {

    try {
        const user = await _findByUsername(username);

        if(!user) return done(null,false,'User o password incorrecta');
        const match = bcrypt.compareSync(password, user.password);
        if (!match) return done(null,false,'User o password incorrecta');

        return done(null,{
            username: user.username,
            id: user.id,
            tipo:user.tipo,
            created_at : user.created_at,
            updated_at : user.updated_at,
            deleted_at : user.deleted_at,
        });
    } catch(e){


    }
    
})