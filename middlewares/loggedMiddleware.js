// const DB = require('../database/models')
// const sequelize = DB.sequelize;

// const User = DB.User;

module.exports = function(req,res,next) {

    res.locals.usuario = false;

    if(req.session.usuario != undefined) {

        res.locals.usuario = req.session.usuario;

    }
        return next();
}