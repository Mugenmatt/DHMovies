const DB = require('../database/models')

const User = DB.User;

function rememberMeMiddleware(req, res, next) {

    if(req.cookies.recordame != undefined && req.session.usuario == undefined) {
        User.findOne({
            where : {
                email : req.cookies.recordame
            }
        })
        .then( usuario => {
            if(usuario) {
                req.session.usuario = usuario;
            }
        })
    }

    next()

}

module.exports = rememberMeMiddleware;