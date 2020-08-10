let express = require('express');
let router = express.Router();

const usersController = require('../controllers/usersController')

const validator = require('../middlewares/validator')

const loggedMiddleware = require('../middlewares/loggedMiddleware');
const { updateProcess } = require('../controllers');

router.get('/register', usersController.register);
router.post('/register', validator.register, usersController.registerProcess);

router.get('/login', usersController.login);
router.post('/login', validator.login, usersController.loginProcess);

router.post('/', usersController.logout)

router.get('/database', loggedMiddleware, usersController.users);
router.get('/database/user-detail/:id', loggedMiddleware, usersController.usersDetail);
router.get('/database/user-detail/:id/update-rol', loggedMiddleware, usersController.usersUpdate);
router.post('/database/user-detail/:id/update-rol', loggedMiddleware, usersController.usersUpdateProcess)
router.post('/database/user-detail/:id/delete', loggedMiddleware, usersController.usersDelete);

module.exports = router;
