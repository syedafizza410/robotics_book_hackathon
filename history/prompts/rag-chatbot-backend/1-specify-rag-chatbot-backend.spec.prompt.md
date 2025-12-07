---
ID: 1
TITLE: Specify RAG Chatbot Backend
STAGE: spec
DATE_ISO: 2025-12-06
SURFACE: agent
MODEL: claude-sonnet-4-5-20250929
FEATURE: rag-chatbot-backend
BRANCH: 1-rag-chatbot-backend
USER: user
COMMAND: /sp.specify
LABELS: ["specification", "rag-chatbot"]
LINKS:
  SPEC: specs/1-rag-chatbot-backend/spec.md
  TICKET: null
  ADR: null
  PR: null
FILES_YAML:
  - specs/1-rag-chatbot-backend/spec.md
  - specs/1-rag-chatbot-backend/checklists/requirements.md
TESTS_YAML: []
---
### User Prompt:
```text
Specify the complete project:

Folder: /backend-chatbot (create everything here)

Required Files & Structure:
backend-chatbot/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── routes.py
│   ├── services.py
│   ├── models.py
│   ├── db.py
│   └── vector_db.py
├── scripts/ingest.py
├── tests/test_chat.py
├── requirements.txt
├── .env.example
└── README.md

API Endpoints:
- POST /chat → {query: str, selected_text?: str} → {answer: str, sources?: array}
- POST /ingest → trigger book ingestion
- GET /health → {\"status\": \"ok\"}

RAG Rules:
- If selected_text exists → answer ONLY using that text
- Else → embed query → search Qdrant → get top 5 chunks → augment prompt → Gemini

Ingestion:
- Recursively read all .md files from ../docs
- Chunk: ~800 tokens, 100 token overlap
- Embed each chunk with embedding-001 + task_type=\"RETRIEVAL_DOCUMENT\"\n- Store vector in Qdrant collection \"robotics_book\" (size 768)\n- Store metadata (text, source file, chunk_id) in Neon Postgres

CORS: Allow http://localhost:3000 (Docusaurus dev)
```

### Assistant Response Summary:
The RAG Chatbot Backend feature specification has been created and validated. A new branch  was created, and the specification is located at . All items in the associated quality checklist passed. The feature is now ready for the planning phase.

---
