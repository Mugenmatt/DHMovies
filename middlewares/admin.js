const DB = require('../database/models')
const sequelize = DB.sequelize;

const User = DB.User;

module.exports = {

    admin : function(req, res, next) {

        User.findOne({
                where: {
                    rol : req.body.rol
                }
            })
            .then(usuario => {
                if(usuario == 1) {
                    next();
                } else {
                    return res.redirect('/', {denegado : 'Solo los Administradores pueden ejecutar esta acción'})
                }
            })
    }

}