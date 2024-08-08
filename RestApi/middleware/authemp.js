const passport = require('passport');

module.exports = (req,res,next) =>{
    passport.authenticate('jwt', {session: false}, function(err,empresa,info) {
        if(err) return res.status(500).json(err);
        if(!empresa) return res.status(401).json(info);
        req.empresa = empresa;
        next();
    }) (req,res,next);
};