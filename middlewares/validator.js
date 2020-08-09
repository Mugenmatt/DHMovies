const path = require('path');
const { check, validationResult, body } = require('express-validator');

const DB = require('../database/models')
const sequelize = DB.sequelize;

const User = DB.User;

module.exports = {
    register : [
        body('email')
        .notEmpty().withMessage('Email: No puede estar vacío').bail()
        .isEmail().withMessage('Email: Debe ser un email'),

        body('password')
        .notEmpty().withMessage('Contraseña: No puede estar vacía').bail()
        .isLength({ min : 3 }).withMessage('Contraseña: Debe tener mínimo 3 caracteres'),

        body('confirmPassword')
        .notEmpty().withMessage('Confirmación: No puede estar vacío').bail()
        .custom((valor, { req }) => req.body.password == req.body.confirmPassword).withMessage('Las contraseñas no coinciden')
    ],

    login : [
        body('email')
        .notEmpty().withMessage('Email: No puede estar vacío'),

        body('password')
        .notEmpty().withMessage('Contraseña: No puede estar vacía').bail()
        .custom(function(valor, { req }) {
            User.findOne({
                where: {
                    email : req.body.email
                }
            })
            .then( usuario => {
                if(usuario) {
                    let comparacionPass = bcryptJS.compareSync(req.body.password, usuario.password);
                    if(comparacionPass) {
                        return true;
                    } else {
                        return false
                    }
                }
            })
        }).withMessage('Los datos no coinciden')
    ]
}