let express = require('express');
let router = express.Router();

const indexController = require('../controllers/index')

const admin = require('../middlewares/admin')

/* GET home page. */
router.get('/', indexController.index);

router.get('/newFilm',indexController.newFilm);

router.post('/newFilm', indexController.newFilmProcess);

router.get('/detail/:id',indexController.detail)

router.get('/detail/:id/update', indexController.update)

router.post('/detail/:id/update', indexController.updateProcess)

router.post('/detail/:id/delete', indexController.delete)

module.exports = router;
