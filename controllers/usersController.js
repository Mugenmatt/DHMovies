const DB = require('../database/models')
const sequelize = DB.sequelize;

const User = DB.User;

const bcryptJS = require('bcryptjs')

const { validationResult } = require('express-validator');

const usersController = {

    register : function(req, res) {
        res.render('register', {title : '¡Registrate!'})
    },

    registerProcess : function(req, res) {

        let errors = validationResult(req);

        if(errors.isEmpty()) {

            req.body.password = bcryptJS.hashSync(req.body.password, 10);

            delete req.body.confirmPassword;

            User.create({
                email : req.body.email,
                password : req.body.password,
                rol : req.body.rol
            })
            .then( () => {
                // res.send('SIIIIIIIII!')
                return res.redirect('/')
            })
            .catch(err => {
                console.log('-----------------------------------');
                console.log(err);
            })

        } else {
            return res.render('register', {title : '¡Registrate!', errors : errors.mapped(), dataAntesIngresada : req.body})
        }

    },

    login : function(req, res) {
        res.render('login', {title : '¡Iniciá Sesión!'})
    },

    loginProcess : function(req, res) {

        let errors = validationResult(req);

        if(errors.isEmpty()) {

            User.findOne({
                where: {
                    email : req.body.email
                }
            })
            .then( usuario => {
                if(usuario) {
                    if(bcryptJS.compareSync(req.body.password, usuario.password)) {
                        let usuarioEnSesion = usuario;
                        
                        delete usuarioEnSesion.dataValues.password;

                        req.session.usuario = usuarioEnSesion;

                        return res.redirect('/')
                    } else {
                        return res.render('login', {title : '¡Iniciá Sesión!', error: 'Los datos ingresados no coinciden'})
                    }
                }
            })

        } else {
            return res.render('login', { errors : errors.mapped(), title : '¡Iniciá Sesión!' })
        }

    }

}

module.exports = usersController;