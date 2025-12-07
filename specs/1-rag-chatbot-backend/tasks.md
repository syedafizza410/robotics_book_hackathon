# Atomic Tasks: RAG Chatbot Backend

**Feature Branch**: `1-rag-chatbot-backend`
**Created**: 2025-12-06
**Status**: Draft
**Input**: User provided atomic task breakdown.

## Tasks *(mandatory)*

### Phase 1: Setup and Core Database Implementations

- [ ] **Task 1: Generate `requirements.txt` + `.env.example`**
  - Create `requirements.txt` with exact working packages.
  - Create `.env.example` with only `GEMINI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`, `DATABASE_URL`.

- [ ] **Task 2: Generate `app/db.py` (Postgres + Chunk model)**
  - Implement SQLAlchemy integration for Neon Serverless Postgres.
  - Define the `Chunk` model with `id`, `text`, `source_file`, `chunk_id`.

- [ ] **Task 3: Generate `app/vector_db.py` (Qdrant client)**
  - Initialize Qdrant client.
  - Implement logic to auto-create the "robotics_book" collection (768 dimensions).

### Phase 2: Ingestion Pipeline and Core Services

- [ ] **Task 4: Generate `scripts/ingest.py` (full working ingestion)**
  - Recursively read all `.md` files from `../docs`.
  - Chunk content (~800 tokens, 100 token overlap).
  - Embed each chunk using `models/embedding-001` (`task_type="RETRIEVAL_DOCUMENT"`).
  - Store vectors in Qdrant and metadata in Neon Postgres.

- [ ] **Task 5: Generate `app/services.py` (all RAG logic with Gemini)**
  - Implement `embed(text, task_type)` using Gemini.
  - Implement `search(query_vector)` to query Qdrant.
  - Implement `generate(prompt)` using `gemini-1.5-flash`.
  - Implement `handle_selected_text(selected_text, query)` for selected text mode.

### Phase 3: API Endpoints and Application Integration

- [ ] **Task 6: Generate `app/models.py` (Pydantic)**
  - Define Pydantic models for API request/response (e.g., `ChatRequest`, `ChatResponse`, `Source`).

- [ ] **Task 7: Generate `app/routes.py`**
  - Implement `POST /chat` endpoint.
  - Implement `POST /ingest` endpoint.
  - Implement `GET /health` endpoint.

- [ ] **Task 8: Generate `app/main.py`**
  - Set up FastAPI application.
  - Configure CORS for `http://localhost:3000`.
  - Include API routes.

### Phase 4: Documentation and Frontend Integration

- [ ] **Task 9: Generate `README.md` (step-by-step setup)**
  - Provide setup instructions.
  - Include environment variable configuration.
  - Add links for free API keys.

- [ ] **Task 10: Generate frontend `src/chatbot.js` modification snippet**
  - Provide exact JavaScript code for frontend integration.

## Dependencies *(optional)*

- Tasks are ordered sequentially as specified by the user. Each task is dependent on the completion of the preceding ones.

## Acceptance Criteria *(mandatory)*

- All generated code must be fully functional and adhere to the project constitution.
- `requirements.txt` must list all necessary packages for the backend to run.
- `.env.example` must contain the four required environment variables.
- `app/db.py` and `app/vector_db.py` must correctly initialize and interact with their respective databases.
- `scripts/ingest.py` must successfully read, chunk, embed, and store book content.
- `app/services.py` must implement all RAG logic as specified.
- `app/models.py` must define correct Pydantic models for API data.
- `app/routes.py` must expose the `/chat`, `/ingest`, and `/health` endpoints with correct logic.
- `app/main.py` must correctly set up the FastAPI app with CORS and route inclusion.
- `README.md` must provide clear and complete setup instructions.
- Frontend snippet must be accurate and functional for integration.