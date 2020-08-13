let express = require('express');
let router = express.Router();

const indexController = require('../controllers/index')

const loggedMiddleware = require('../middlewares/loggedMiddleware')

const validator = require('../middlewares/validator')

/* GET home page. */
router.get('/', loggedMiddleware, indexController.index);

router.get('/newFilm', loggedMiddleware, indexController.newFilm);

router.post('/newFilm', loggedMiddleware, indexController.newFilmProcess);

router.get('/detail/:id', loggedMiddleware, indexController.detail)

router.get('/detail/:id/update', loggedMiddleware, indexController.update)

router.post('/detail/:id/update', loggedMiddleware, indexController.updateProcess)

router.post('/detail/:id/delete', loggedMiddleware, indexController.delete)

module.exports = router;
