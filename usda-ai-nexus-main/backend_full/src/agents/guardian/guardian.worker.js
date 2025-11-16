const llm = require('../utils/llmClient');
const buildPrompt = require('./guardian.prompt');
const UseCase = require('../../models/UseCase');
const AuditLog = require('../../models/AuditLog');
const guardianSchema = require('../utils/schemaValidator');

async function safeParseJson(text) {
  try {
    // Some LLMs wrap JSON in markdown; attempt to extract {...}
    const first = text.indexOf('{');
    const last = text.lastIndexOf('}');
    const sub = (first !== -1 && last !== -1) ? text.slice(first, last+1) : text;
    return JSON.parse(sub);
  } catch (err) {
    throw new Error('Failed to parse JSON from model output: ' + err.message);
  }
}

module.exports = {
  async run(useCaseId) {
    const uc = await UseCase.findById(useCaseId);
    if (!uc) throw new Error('UseCase not found: ' + useCaseId);

    const prompt = buildPrompt(uc);

    // ask LLM for a JSON response (deterministic temperature)
    let respText;
    try {
      respText = await llm.generate(prompt, { maxTokens: 400, temperature: 0.0 });
    } catch (err) {
      await AuditLog.create({ useCaseId, action: 'guardian_failure', meta: { error: err.message }});
      throw err;
    }

    let parsed;
    try {
      parsed = await safeParseJson(respText);
    } catch (err) {
      await AuditLog.create({ useCaseId, action: 'guardian_parse_failed', meta: { raw: respText }});
      throw err;
    }

    // validate schema
    const { error } = guardianSchema.validate(parsed);
    if (error) {
      await AuditLog.create({ useCaseId, action: 'guardian_schema_invalid', meta: { error: error.message, parsed }});
      // mark for human review by setting a flag
      uc.guardian = { risk_level: 'Medium', risk_reason: 'Failed automated validation', suggested_kpis: [], ethics_flag: true, ethics_notes: error.message, short_summary: '', confidence: 0 };
      uc.guardian.guardian_run_at = new Date();
      await uc.save();
      return;
    }

    // save results to use case and audit log
    uc.guardian = {
      risk_level: parsed.risk_level,
      risk_reason: parsed.risk_reason,
      suggested_kpis: parsed.suggested_kpis,
      ethics_flag: parsed.ethics_flag,
      ethics_notes: parsed.ethics_notes,
      short_summary: parsed.short_summary,
      confidence: parsed.confidence,
      guardian_run_at: new Date()
    };
    await uc.save();

    await AuditLog.create({
      useCaseId,
      action: 'guardian_complete',
      meta: { parsed }
    });
  }
};
