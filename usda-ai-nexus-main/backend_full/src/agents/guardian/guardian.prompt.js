module.exports = function buildGuardianPrompt(usecase) {
  return `
You are an AI governance assistant. Read the project and produce ONLY valid JSON matching this schema:
{
  "risk_level": "Low|Medium|High",
  "risk_reason": "string",
  "suggested_kpis": ["string"],
  "ethics_flag": true|false,
  "ethics_notes": "string",
  "short_summary": "string",
  "confidence": 0.00
}

Project Title: ${usecase.title || ''}
Description: ${usecase.description || ''}
Department: ${usecase.department || ''}
Owner: ${usecase.owner ? usecase.owner.name + ' <' + (usecase.owner.email||'') + '>' : ''}
`;
};
