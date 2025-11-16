const OpenAI = require('openai');
const client = new OpenAI({ apiKey: process.env.LLM_API_KEY });

module.exports = {
  // Use chat completions for structured JSON or text outputs
  async generate(prompt, opts = {}) {
    // opts: { maxTokens, temperature, expectJson }
    const messages = [
      { role: 'system', content: opts.system || 'You are an assistant.' },
      { role: 'user', content: prompt }
    ];
    const res = await client.chat.completions.create({
      model: opts.model || 'gpt-4o-mini',
      messages,
      max_tokens: opts.maxTokens || 600,
      temperature: (typeof opts.temperature === 'number') ? opts.temperature : 0.0
    });
    const txt = res.choices && res.choices[0] && res.choices[0].message && res.choices[0].message.content;
    return txt;
  },

  // Use OpenAI embeddings API (if you prefer embeddings via API)
  async embed(text) {
    if (!client.embeddings) throw new Error('Embeddings not available in this client version');
    const r = await client.embeddings.create({
      model: 'text-embedding-3-small',
      input: text
    });
    return r.data[0].embedding;
  }
};
