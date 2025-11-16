const router = require('express').Router();
const controller = require('../controllers/usecase.controller');

router.post('/', controller.createUseCase);
router.get('/:id', controller.getUseCase);

module.exports = router;
