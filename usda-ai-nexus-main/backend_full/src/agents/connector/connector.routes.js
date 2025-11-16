const router = require('express').Router();
const controller = require('./connector.controller');

router.post('/suggest', controller.suggest);

module.exports = router;
