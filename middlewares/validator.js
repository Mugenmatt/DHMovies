
const DB = require('../database/models')
const sequelize = DB.sequelize;

const User = DB.User;

const { check, validationResult, body } = require('express-validator');

module.exports = {
    register : [
        body('email')
        .notEmpty().withMessage('Email: No puede estar vacío').bail()
        .isEmail().withMessage('Email: Debe ser un email')
        .isLowercase().withMessage('Email: Solo se permiten minúsculas'),

        body('password')
        .notEmpty().withMessage('Contraseña: No puede estar vacía').bail()
        .isLength({ min : 3 }).withMessage('Contraseña: Debe tener mínimo 3 caracteres')
        .isLowercase().withMessage('Password: Solo se permiten minúsculas'),

        body('confirmPassword')
        .notEmpty().withMessage('Confirmación: No puede estar vacío').bail()
        .custom((valor, { req }) => req.body.password == req.body.confirmPassword).withMessage('Las contraseñas no coinciden')
    ],

    login : [
        body('email')
        .notEmpty().withMessage('Email: No puede estar vacío'),

        body('password')
        .notEmpty().withMessage('Contraseña: No puede estar vacía')
    ]
}