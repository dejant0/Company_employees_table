var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');


router.get('/', userController.list);
router.get('/:id', userController.show);
router.post('/', userController.create);

router.delete('/:id', userController.remove);

module.exports = router;
