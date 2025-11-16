const llm = require('../utils/llmClient');
const vectorDB = require('../utils/vectorDB');

// Creates embedding and searches vector DB
module.exports = {
  async createEmbedding(text) {
    // prefer API embeddings when available
    try {
      const emb = await llm.embed(text);
      return emb;
    } catch (err) {
      // fallback to asking the LLM to output a JSON vector (not ideal) - left as fallback
      throw new Error('Embedding API not available: ' + err.message);
    }
  },

  async getSuggestions(title, description, topK = 5, threshold = 0.65) {
    const text = `${title}\n${description}`;
    const vector = await this.createEmbedding(text);
    const results = await vectorDB.search(vector, topK);
    // Qdrant client returns items with payload and score, adapt if necessary
    return results.filter(r => typeof r.score === 'number' ? r.score >= threshold : true)
                  .slice(0, topK)
                  .map(r => ({
                    useCaseId: r.id,
                    title: r.payload && r.payload.title,
                    score: r.score
                  }));
  }
};
