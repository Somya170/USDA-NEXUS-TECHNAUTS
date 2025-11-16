# USDA-NEXUS Backend (Agentic AI)
This backend provides Connector and Guardian agents for the USDA-NEXUS frontend.
- Express server
- MongoDB (Mongoose)
- Qdrant (vector store) integration helper
- OpenAI client wrapper
- BullMQ job queue + worker for Guardian

## Quickstart
1. Copy `.env.example` to `.env` and fill values
2. Install: `npm install`
3. Start MongoDB, Qdrant, Redis
4. Start server: `npm start`
5. Start worker (optional if running same process): `node src/jobs/guardianJob.js`
