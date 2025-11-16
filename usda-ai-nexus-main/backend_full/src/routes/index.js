const router = require('express').Router();

router.use('/usecases', require('./usecase.routes'));
router.use('/connector', require('../agents/connector/connector.routes'));
router.use('/guardian', require('../agents/guardian/guardian.routes'));

module.exports = router;
