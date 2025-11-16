# USDA NEXUS

# Table of contents
  1.	Project overview
  2.	Directory structure (final)
  3.	Requirements (software)
  4.	Environment variables (.env)
  5.	Install & Run — All Commands (one block)
  6.	Service setup (systemd)
  7.	Nginx reverse-proxy config (for production / local reverse)
  8.	Qdrant setup & collection init (curl)
  9.	PostgreSQL sample schema + migration guidance (optional future migration)
  10.	API endpoints & testing (curl)
  11.	Troubleshooting checklist


# 1. Project overview
This repo implements the USDA Nexus agentic system:
  •	Connector Agent: semantic deduplication via embeddings + Qdrant
  •	Guardian Agent: governance analysis via LLM (risk, ethics, KPIs)
  •	Backend: Node.js + Express + Mongoose (MongoDB)
  •	Frontend: Vite + React (your uploaded project)
  •	Vector DB: Qdrant (local binary)
  •	Queue: BullMQ + Redis
  •	LLM: OpenAI (or other LLMs via llmClien


# 2. Directory Strucutre
USDA-NEXUS-AGENTIC/

│

├── README.md

│

├── backend_full/

│   ├── package.json

│   ├── package-lock.json

│   ├── .env

│   ├── .env.example

│   │

│   ├── src/

│   │   ├── server.js

│   │

│   │   ├── config/

│   │   │   ├── db.js

│   │   │   ├── qdrant.js

│   │   │   ├── redis.js

│   │   │   └── openai.js
│   │


│   │   ├── controllers/

│   │   │   ├── usecase.controller.js

│   │   │   ├── connector.controller.js

│   │   │   └── guardian.controller.js


│   │
│   │   ├── routes/

│   │   │   ├── index.js

│   │   │   ├── usecase.routes.js

│   │   │   ├── connector.routes.js

│   │   │   └── guardian.routes.js


│   │
│   │   ├── models/

│   │   │   ├── UseCase.js

│   │   │   ├── AuditLog.js

│   │   │   └── EmbeddingCache.js


│   │
│   │   ├── agents/

│   │   │   ├── connector/

│   │   │   │   ├── connector.service.js

│   │   │   │   ├── connector.worker.js

│   │   │   │   └── connector.utils.js


│   │   │   │
│   │   │   ├── guardian/

│   │   │   │   ├── guardian.worker.js

│   │   │   │   ├── guardian.prompt.js

│   │   │   │   └── guardian.utils.js


│   │   │   │
│   │   │   └── utils/

│   │   │       ├── llmClient.js

│   │   │       ├── vectorDB.js

│   │   │       ├── embeddingClient.js

│   │   │       ├── schemaValidator.js

│   │   │       └── logger.js


│   │
│   │   ├── jobs/

│   │   │   ├── queue.js

│   │   │   ├── guardianJob.js

│   │   │   ├── connectorJob.js

│   │   │   └── processors/

│   │   │       ├── guardian.processor.js

│   │   │       └── connector.processor.js


│   │
│   │   ├── middlewares/

│   │   │   ├── errorHandler.js

│   │   │   ├── validateRequest.js

│   │   │   └── requestLogger.js


│   │
│   │   ├── utils/

│   │   │   ├── tokenHelper.js

│   │   │   ├── response.js

│   │   │   ├── constants.js

│   │   │   └── rateLimiter.js


│   │
│   │   ├── logs/

│   │   │   ├── guardian.log

│   │   │   ├── connector.log

│   │   │   └── system.log


│   │
│   │   └── tests/

│   │       ├── usecase.test.js

│   │       ├── connector.test.js

│   │       ├── guardian.test.js

│   │       └── utils.test.js


│

│

└── usda-ai-nexus-main/

    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    │
    ├── public/
    │   └── favicon.ico
    │
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   │
    │   ├── api/
    │   │   ├── index.js
    │   │   ├── usecase.api.js
    │   │   ├── guardian.api.js
    │   │   └── connector.api.js
    │   │
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── NotFound.jsx
    │   │   ├── Loader.jsx
    │   │   └── ConnectorSuggestionPanel.jsx
    │   │
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── UseCaseList.jsx
    │   │   ├── AddUseCase.jsx
    │   │   ├── UseCaseDetails.jsx
    │   │   └── ReviewGuardianReport.jsx
    │   │
    │   ├── context/
    │   │   ├── AppContext.jsx
    │   │   └── AuthContext.jsx
    │   │
    │   ├── utils/
    │   │   ├── format.js
    │   │   ├── constants.js
    │   │   └── http.js
    │   │
    │   ├── styles/
    │   │   ├── global.css
    │   │   └── components.css
    │
    └── tests/
        ├── AddUseCase.test.jsx
        ├── ConnectorPanel.test.jsx
        └── GuardianReport.test.jsx


# 3. Requirements (install these locally)
Install the following on your development machine:
  •	Node.js v18+ (recommended)
  •	npm (comes with Node)
  •	MongoDB (Community Server)
  •	Redis (latest stable)
  •	Qdrant local (binary)
  •	curl (for testing)
  •	Nginx (optional for production / reverse proxy)
  •	(Optional) PostgreSQL if you plan to migrate later


# 4. Environment variables (backend/.env)
Copy .env.example to .env and fill values:
# backend/.env
MONGO_URL=mongodb://localhost:27017/usda_nexus
LLM_API_KEY=YOUR_OPENAI_API_KEY
QDRANT_URL=http://localhost:6333
REDIS_URL=redis://localhost:6379
PORT=5000


# 5. INSTALL & RUN — All commands (single block)
Open separate terminals as indicated below. Copy-paste the whole block into a single terminal to see the commands, then run each in its own terminal as labeled.
# ---------- Terminal A: Start MongoDB ----------
# (Use the method for your OS)
# macOS Homebrew:
brew services start mongodb-community
# OR manually:
mongod --dbpath /path/to/your/db

# ---------- Terminal B: Start Redis ----------
redis-server

# ---------- Terminal C: Start Qdrant ----------
# If you installed qdrant binary:
qdrant
# If qdrant in background this will run and bind to :6333

# ---------- Terminal D: Start backend server ----------
cd /path/to/USDA-NEXUS-AGENTIC/backend
npm install
# copy .env.example -> .env and fill values before start
npm start
# Server will run at http://localhost:5000

# ---------- Terminal E: Start Guardian Worker ----------
cd /path/to/USDA-NEXUS-AGENTIC/backend
# either run worker file (this processes the bull queue)
node src/jobs/guardianJob.js

# ---------- Terminal F: Start Frontend (Vite) ----------
cd /path/to/USDA-NEXUS-AGENTIC/frontend
npm install
npm run dev

# Frontend usually served on http://localhost:5173 (Vite default)
Single-copy block (for reference)
mongod
redis-server
qdrant
cd backend && npm install && npm start
cd backend && node src/jobs/guardianJob.js
cd frontend && npm install && npm run dev


# 6. Optional: systemd service examples
If you want background services on Linux (systemd), create the following unit files (example names). Save to /etc/systemd/system/ with the contents shown, then systemctl daemon-reload and systemctl start backend.service.
backend.service
[Unit]
Description=USDA Nexus Backend
After=network.target mongodb.service redis.service

[Service]
Type=simple
User=your_user
WorkingDirectory=/path/to/USDA-NEXUS-AGENTIC/backend
EnvironmentFile=/path/to/USDA-NEXUS-AGENTIC/backend/.env
ExecStart=/usr/bin/node src/server.js
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
guardian-worker.service
[Unit]
Description=USDA Nexus Guardian Worker
After=network.target redis.service mongodb.service

[Service]
Type=simple
User=your_user
WorkingDirectory=/path/to/USDA-NEXUS-AGENTIC/backend
EnvironmentFile=/path/to/USDA-NEXUS-AGENTIC/backend/.env
ExecStart=/usr/bin/node src/jobs/guardianJob.js
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target

# Commands
sudo systemctl daemon-reload
sudo systemctl enable backend.service guardian-worker.service
sudo systemctl start backend.service guardian-worker.service
sudo journalctl -u backend.service -f


# 7. Nginx reverse-proxy config (example)
Save as /etc/nginx/sites-available/usda-nexus.conf and symlink to sites-enabled (Ubuntu).
server {
    listen 80;
    server_name your.domain.example  # or use localhost for local reverse

    location / {
        # Serve Vite static in production (if you build frontend)
        # root /path/to/frontend/dist;
        # try_files $uri $uri/ /index.html;
        proxy_pass http://localhost:5173;   # dev Vite server
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

Enable & reload
sudo ln -s /etc/nginx/sites-available/usda-nexus.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx


# 8. Qdrant — initialize collection (curl)
If Qdrant is running but you want to create a collection manually:
curl -X PUT "http://localhost:6333/collections/usecases" \
  -H "Content-Type: application/json" \
  -d '{
        "vectors": {
          "size": 1536,
          "distance": "Cosine"
        }
      }'
   
Verify:
curl http://localhost:6333/collections


# 9. PostgreSQL sample & migration notes (optional)
Why included: your backend currently uses MongoDB. If you decide to migrate to PostgreSQL later, here is a sample schema and guidance.
Sample SQL (create DB + table)
-- Connect to postgres and run these
CREATE DATABASE usda_nexus;

\c usda_nexus;

-- basic usecases table
CREATE TABLE usecases (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  department TEXT,
  owner_userid TEXT,
  owner_name TEXT,
  owner_email TEXT,
  stage TEXT DEFAULT 'draft',
  embedding_id TEXT,
  connector_matches JSONB,
  guardian JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- audit logs
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  usecase_id INTEGER,
  action TEXT,
  meta JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

Migration approach (high-level)
  1.	Add PostgreSQL client (e.g. pg, or use ORM like Prisma/TypeORM/Knex).
  2.	Create new DB models and repository layer.
  3.	Run dual-write for a period (write to Mongo + Postgres) to sync.
  4.	Migrate data: export from Mongo to JSON, transform into SQL inserts.
  5.	Switch read paths gradually and monitor.
  6.	Remove Mongo once stable.
I can provide a Prisma schema + migration script if you want to commit to full migration.


# 10. API endpoints & testing
Key endpoints (backend)
•	POST /api/usecases — create use case (body: JSON, saves to DB, enqueues Guardian)
•	GET /api/usecases/:id — fetch use case
•	POST /api/connector/suggest — { title, description } → returns matches
•	POST /api/guardian/run/:id — manual trigger for guardian worker (admin/test)

Test connector (curl)
curl -X POST http://localhost:5000/api/connector/suggest \
-H "Content-Type: application/json" \
-d '{"title":"Soil Monitoring", "description":"Model to detect soil moisture and nutrients"}'
Test create use case (curl)
curl -X POST http://localhost:5000/api/usecases \
-H "Content-Type: application/json" \
-d '{
  "title":"Yield Prediction POC",
  "description":"Use satellite imagery and farmer records to predict yield",
  "department":"Agriculture",
  "owner": {"userId":"u1", "name":"Rohit Manna", "email":"rohit@example.com"}
}'

Manual guardian run
curl -X POST http://localhost:5000/api/guardian/run/<USECASE_ID>


# 11. Troubleshooting checklist
•	Backend throws DB connect errors:
  o	Verify MONGO_URL is correct and Mongo is running.
  o	Check mongod logs for startup errors.
  
•	Guardian jobs are not running:
  o	Ensure node src/jobs/guardianJob.js is running.
  o	Check Redis (redis-cli ping) and connection in .env.
  o	Check worker logs for errors and check AuditLog entries in Mongo.
  
•	Connector returns empty results:
  o	Confirm Qdrant is running and collection exists.
  o	Confirm embeddings are being created (embedding API key valid).
  o	Check save flow: usecases should be upserted to vector DB after save.
  
•	LLM errors or rate limits:
  o	Check LLM_API_KEY, usage quotas, and error messages returned from OpenAI.

