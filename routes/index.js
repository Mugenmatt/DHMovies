let express = require('express');
let router = express.Router();

const indexController = require('../controllers/index')

/* GET home page. */
router.get('/', indexController.index);

router.get('/detail/:id', indexController.detail)

module.exports = router;
