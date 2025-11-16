const service = require('./connector.service');

module.exports = {
  async suggest(req, res) {
    try {
      const { title = '', description = '' } = req.body;
      if (!description && !title) return res.status(400).json({ error: 'title or description required' });
      const matches = await service.getSuggestions(title, description);
      return res.json({ matches });
    } catch (err) {
      console.error('Connector suggest error', err);
      return res.status(500).json({ error: err.message });
    }
  }
};
