let express = require('express');
let router = express.Router();

const usersController = require('../controllers/usersController')

const validator = require('../middlewares/validator')

const admin = require('../middlewares/admin')

/* GET users listing. */
router.get('/register', usersController.register);
router.post('/register', validator.register, usersController.registerProcess);

router.get('/login', usersController.login);
router.post('/login', validator.login, usersController.loginProcess);

router.post('/', usersController.logout)

module.exports = router;
