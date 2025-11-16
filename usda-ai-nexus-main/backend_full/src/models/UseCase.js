const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UseCaseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  department: { type: String },
  owner: {
    userId: String,
    name: String,
    email: String
  },
  stage: { type: String, default: 'draft' },
  embedding_id: { type: String },
  connector_matches: [{ useCaseId: String, title: String, score: Number }],
  guardian: {
    risk_level: String,
    risk_reason: String,
    suggested_kpis: [String],
    ethics_flag: Boolean,
    ethics_notes: String,
    guardian_run_at: Date,
    short_summary: String,
    confidence: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('UseCase', UseCaseSchema);
