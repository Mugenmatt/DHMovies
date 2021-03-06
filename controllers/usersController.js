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
                return res.redirect('/users/login')
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

                        delete usuario.dataValues.password;

                        req.session.usuario = usuario;

                        res.locals.usuario = req.session.usuario;

                        if(req.body.recordame != undefined) {
                            res.cookie('recordame', usuario.email, { maxAge: 1000 * 60 * 60 * 24 } )
                        }

                        return res.redirect('/')
                    } else {
                        return res.render('login', { title : '¡Iniciá Sesión!', error: 'Usuario y/o contraseña incorrectos' })
                    }
                } else {
                    return res.render('login', { errors : errors.mapped(), title : '¡Iniciá Sesión!' })
                    
                }
            })

        } 
    },

    logout : function(req, res) {
        req.session.destroy();

        if(req.cookies.recordame) {
            res.clearCookie('recordame', { path : '/' })
        }
        
        return res.redirect('/')
    },

    users : function(req, res) {
        User.findAll()
        .then( usuarios => {
            return res.render('users', {title: 'Usuarios Cinefilos', usuarios})
        })
    },

    usersDetail : function(req, res) {
        User.findByPk(req.params.id)
        .then( usuarioDetalle => {
            return res.render('user-detail', {usuarioDetalle, title: 'Detalle del usuario cinefilo'})
        } )
    },

    usersUpdate : function(req, res) {
        let urlId = req.params.id;
        return res.render('updateRol', {urlId})

    },

    usersUpdateProcess : function( req, res ) {
        
        let rolUsuario = req.body.rol;

        rolUsuario = Number(rolUsuario)

        User.update(
            {
                rol : rolUsuario
            },
            {
                where : {
                    id : req.params.id
                }
            }
        )
        .then(() => {
            res.redirect('/users/database')
        })

    },

    usersDelete : function(req, res) {
        User.destroy(
            {
                where : {
                    id : req.params.id
                }
            }
        )
        .then(() => {
            res.redirect('/users/database')
        })
    }

}

module.exports = usersController;