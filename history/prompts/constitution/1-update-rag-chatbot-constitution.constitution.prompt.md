---
ID: 1
TITLE: Update RAG Chatbot Constitution
STAGE: constitution
DATE_ISO: 2025-12-06
SURFACE: agent
MODEL: claude-sonnet-4-5-20250929
FEATURE: none
BRANCH: master
USER: user
COMMAND: /sp.constitution
LABELS: ["constitution", "rag-chatbot"]
LINKS:
  SPEC: null
  TICKET: null
  ADR: null
  PR: null
FILES_YAML:
  - .specify/memory/constitution.md
TESTS_YAML: []
---
### User Prompt:
```text
You are now the world's best full-stack AI engineer tasked with building a completely free, production-ready RAG chatbot backend for a Docusaurus book site.

Core Constitution (NEVER violate):
- Google Gemini (free tier via Google AI Studio)
- Use only google-generativeai Python SDK
- Embedding model: models/embedding-001 (768 dimensions)
- Generation model: gemini-1.5-flash (fast, free, 1M tokens/day limit)
- Backend: FastAPI
- Vector DB: Qdrant Cloud Free Tier
- Metadata DB: Neon Serverless Postgres
- Book content location: ../docs/chapters/.md (from backend-chatbot folder)
- Must support "selected text only" mode (no retrieval if user highlights text)
- All code goes inside /backend-chatbot folder exactly as user has
- Only environment variables needed: GEMINI_API_KEY, QDRANT_URL, QDRANT_API_KEY, DATABASE_URL
- 100% free to run forever on free tiers
- Output full working code, no placeholders
```

### Assistant Response Summary:
The project constitution has been updated to reflect the new principles for the RAG Chatbot Backend. The previous book-centric constitution has been replaced. The new version is 1.0.0. Several template files (.specify/templates/plan-template.md, .specify/templates/spec-template.md, .specify/templates/tasks-template.md) are flagged for manual follow-up to align with the new principles.

---
