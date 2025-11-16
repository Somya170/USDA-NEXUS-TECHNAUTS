const Joi = require('joi');

const guardianSchema = Joi.object({
  risk_level: Joi.string().valid('Low','Medium','High').required(),
  risk_reason: Joi.string().allow('').required(),
  suggested_kpis: Joi.array().items(Joi.string()).required(),
  ethics_flag: Joi.boolean().required(),
  ethics_notes: Joi.string().allow('').required(),
  short_summary: Joi.string().allow('').required(),
  confidence: Joi.number().min(0).max(1).required()
});

module.exports = guardianSchema;
