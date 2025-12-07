# Implementation Plan: RAG Chatbot Backend

**Feature Branch**: `1-rag-chatbot-backend`
**Created**: 2025-12-06
**Status**: Draft
**Input**: User provided execution plan.

## Technical Context *(mandatory)*

The RAG Chatbot Backend will be a FastAPI application responsible for handling chat queries and book content ingestion. It will integrate with Google Gemini for AI capabilities, Qdrant Cloud for vector storage, and Neon Serverless Postgres for metadata management. All components will adhere to free tier usage to ensure zero operational cost.

Key components:
- **FastAPI**: Main web framework for API endpoints.
- **Google Gemini (gemini-1.5-flash)**: For generating chat responses.
- **Google Gemini (models/embedding-001)**: For creating text embeddings (768 dimensions).
- **Qdrant Cloud**: Vector database for storing and searching book chunk embeddings.
- **Neon Serverless Postgres**: Relational database for storing book chunk metadata.
- **Python SDK (google-generativeai)**: Interface with Gemini.

## Constitution Check *(mandatory)*

This plan adheres to all principles outlined in the `.specify/memory/constitution.md`:

- **Principle 1: Gemini Integration**: The plan explicitly uses Google Gemini via Google AI Studio.
- **Principle 2: Python SDK**: The plan mandates the use of `google-generativeai` Python SDK.
- **Principle 3: Embedding Model**: Specifies `models/embedding-001` with 768 dimensions.
- **Principle 4: Generation Model**: Specifies `gemini-1.5-flash`.
- **Principle 5: Backend Framework**: Confirms FastAPI as the backend framework.
- **Principle 6: Vector Database**: Utilizes Qdrant Cloud Free Tier.
- **Principle 7: Metadata Database**: Utilizes Neon Serverless Postgres.
- **Principle 8: Book Content Location**: Confirms ingestion from `../docs/chapters/.md`.
- **Principle 9: Selected Text Only Mode**: Explicitly included in the `/chat` endpoint logic.
- **Principle 10: Code Location**: All code will be placed in the `/backend-chatbot` folder.
- **Principle 11: Environment Variables**: Only the four specified environment variables (`GEMINI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`, `DATABASE_URL`) are required.
- **Principle 12: Free Tier Operation**: All chosen services and operations are within free tiers.
- **Principle 13: Full Working Code**: The output will be full working code.

## Execution Plan *(mandatory)*

This plan follows the exact order provided by the user:

### Phase 1: Setup and Core Database Implementations

1.  **Create `requirements.txt`**: Define all necessary Python packages with exact working versions.
2.  **Create `.env.example`**: Generate an example environment file with placeholders for `GEMINI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`, `DATABASE_URL`.
3.  **Implement `db.py`**: Set up SQLAlchemy for Neon Serverless Postgres, including the definition for the `chunks` table to store metadata (text, source file, chunk_id, etc.).
4.  **Implement `vector_db.py`**: Initialize Qdrant client and implement logic to automatically create the "robotics_book" collection with 768 dimensions if it doesn't exist.

### Phase 2: Ingestion Pipeline and Core Services

5.  **Implement `scripts/ingest.py`**: Develop the full ingestion pipeline:
    -   Recursively read all `.md` files from `../docs`.
    -   Chunk content (~800 tokens, 100 token overlap).
    -   Embed each chunk using `models/embedding-001` with `task_type="RETRIEVAL_DOCUMENT"`.
    -   Store vectors in Qdrant and metadata in Neon Postgres.
6.  **Implement `services.py`**: Create core service functions:
    -   `embed(text, task_type)`: Handles text embedding using Gemini.
    -   `search(query_vector)`: Searches Qdrant for top 5 relevant chunks.
    -   `generate(prompt)`: Generates responses using `gemini-1.5-flash`.
    -   `handle_selected_text(selected_text, query)`: Logic for answering using only selected text.

### Phase 3: API Endpoints and Application Integration

7.  **Implement `models.py`**: Define Pydantic models for API request and response validation (e.g., `ChatRequest`, `ChatResponse`, `Source`).
8.  **Implement `routes.py`**: Define FastAPI routes:
    -   `POST /chat` endpoint integrating `services.py` functions.
    -   `POST /ingest` endpoint to trigger the ingestion script.
    -   `GET /health` endpoint for status checks.
9.  **Implement `main.py`**: Set up the main FastAPI application:
    -   Include CORS middleware for `http://localhost:3000`.
    -   Include the defined routes.

### Phase 4: Documentation and Frontend Integration

10. **Add `README.md`**: Provide comprehensive setup instructions for the backend, including environment variable configuration and links to obtain free API keys for Gemini, Qdrant, and Neon Postgres.
11. **Frontend Integration Code**: Provide exact JavaScript code to paste into frontend `src/chatbot.js` for interacting with the backend API.

## Architecture Decisions *(optional)*

- No major architectural decisions beyond the constitution and specified components are required at this stage. The choices for databases, AI models, and framework are already defined.

## Data Management and Migration *(optional)*

-   **BookChunk Table**: Will be created in Neon Postgres. Schema will include `id`, `text`, `source_file`, `chunk_id`. `id` will serve as the primary key and link to Qdrant vector.
-   **Data Ingestion**: Initial ingestion handled by `scripts/ingest.py`. Updates will require re-running the script.

## Operational Readiness *(optional)*

-   **Health Check**: `/health` endpoint for basic operational monitoring.
-   **Environment Variables**: `GEMINI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`, `DATABASE_URL` for configuration.

## Risk Analysis and Mitigation *(optional)*

-   **API Key Expiration/Rate Limits**: Document best practices for managing API keys and handling rate limit errors.
-   **Database Unavailability**: Implement robust error handling and logging for Qdrant and Neon Postgres connection issues.
-   **Malformed Content**: Implement error handling in ingestion script for invalid Markdown.

## Evaluation and Validation *(mandatory)*

-   **Unit Tests**: Create `tests/test_chat.py` to cover `services.py` and `routes.py` logic.
-   **Integration Tests**: Verify successful ingestion and chat interactions end-to-end.
-   **Performance Testing**: Ensure `SC-001` and `SC-004` (response times) are met.
-   **Cost Validation**: Regularly verify that all services remain within their free tiers.