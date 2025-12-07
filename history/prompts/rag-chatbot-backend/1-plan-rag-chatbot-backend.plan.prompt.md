---
ID: 1
TITLE: Plan RAG Chatbot Backend
STAGE: plan
DATE_ISO: 2025-12-06
SURFACE: agent
MODEL: claude-sonnet-4-5-20250929
FEATURE: rag-chatbot-backend
BRANCH: 1-rag-chatbot-backend
USER: user
COMMAND: /sp.plan
LABELS: ["planning", "rag-chatbot"]
LINKS:
  SPEC: specs/1-rag-chatbot-backend/spec.md
  TICKET: null
  ADR: null
  PR: null
FILES_YAML:
  - specs/1-rag-chatbot-backend/plan.md
TESTS_YAML: []
---
### User Prompt:
```text
Execution Plan (follow this exact order):

1. Create requirements.txt with exact working packages
2. Create .env.example with only 4 required keys
3. Implement db.py → SQLAlchemy + Neon Postgres + chunks table
4. Implement vector_db.py → Qdrant client + auto-create collection (768 dim)
5. Implement scripts/ingest.py → full ingestion pipeline using Gemini embeddings
6. Implement services.py → embed(), search(), generate(), handle selected_text
7. Implement models.py → Pydantic request/response models
8. Implement routes.py → /chat, /ingest, /health
9. Implement main.py → FastAPI app + CORS + router include
10. Add README.md with exact setup steps + free API key links
11. Finally: give exact code to paste in frontend src/chatbot.js
```

### Assistant Response Summary:
The implementation plan for the RAG Chatbot Backend has been created and documented in . The plan outlines the development in four phases: Setup and Core Database Implementations, Ingestion Pipeline and Core Services, API Endpoints and Application Integration, and Documentation and Frontend Integration. All steps adhere to the project constitution, ensuring free-tier operation and the use of specified technologies.

---
