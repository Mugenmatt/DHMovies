let express = require('express');
let router = express.Router();
const usersController = require('../controllers/usersController')

/* GET users listing. */
router.get('/register', usersController.register);
router.post('/register', usersController.registerProcess);

router.get('/login', usersController.login);
router.post('/login', usersController.loginProcess);

module.exports = router;
