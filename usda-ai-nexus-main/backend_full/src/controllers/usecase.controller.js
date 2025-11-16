const UseCase = require('../models/UseCase');
const AuditLog = require('../models/AuditLog');
const { triggerGuardian } = require('../jobs/guardianJob');

module.exports = {
  async createUseCase(req, res) {
    try {
      const payload = req.body;
      const uc = new UseCase(payload);
      const saved = await uc.save();

      await AuditLog.create({
        useCaseId: saved._id,
        action: 'created',
        meta: { title: saved.title }
      });

      // enqueue guardian job
      triggerGuardian(saved._id.toString());

      return res.status(201).json(saved);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  },

  async getUseCase(req, res) {
    try {
      const uc = await UseCase.findById(req.params.id);
      if (!uc) return res.status(404).json({ error: 'Not found' });
      return res.json(uc);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
