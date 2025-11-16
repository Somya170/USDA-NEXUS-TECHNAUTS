const router = require('express').Router();
const worker = require('./guardian.worker');

// Manual trigger for admin/testing
router.post('/run/:id', async (req, res) => {
  try {
    await worker.run(req.params.id);
    return res.json({ status: 'ok' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
