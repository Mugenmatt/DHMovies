const DB = require('../database/models')
const sequelize = DB.sequelize;

const User = DB.User;

function adminMiddleware(req, res, next) {

    // if(req.session.usuario.rol !== 0) {
        return next()
    // }

    // return res.redirect('/')

}

module.exports = adminMiddleware;