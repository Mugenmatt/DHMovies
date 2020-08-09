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

        

    }

}

module.exports = usersController;