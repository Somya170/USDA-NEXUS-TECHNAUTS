// Qdrant small helper using @qdrant/js-client-rest
const { QdrantClient } = require('@qdrant/js-client-rest');

const client = new QdrantClient({ url: process.env.QDRANT_URL || 'http://localhost:6333' });
const COLLECTION = 'usecases';

async function ensureCollection() {
  try {
    const collections = await client.getCollections();
    const exists = collections.collections.some(c => c.name === COLLECTION);
    if (!exists) {
      await client.createCollection({
        collection_name: COLLECTION,
        vectors: { size: 1536, distance: 'Cosine' }
      });
    }
  } catch (err) {
    console.warn('Qdrant ensureCollection error', err.message);
  }
}

module.exports = {
  init: ensureCollection,

  async upsert(id, vector, payload = {}) {
    await client.upsert({
      collection_name: COLLECTION,
      points: [{ id: id.toString(), vector, payload }]
    });
  },

  async search(vector, topK = 5) {
    const res = await client.search({
      collection_name: COLLECTION,
      vector,
      limit: topK
    });
    // return array of { id, payload, score }
    return res;
  }
};
