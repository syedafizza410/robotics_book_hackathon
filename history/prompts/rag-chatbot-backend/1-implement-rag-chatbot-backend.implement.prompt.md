---
ID: 1
TITLE: Implement RAG Chatbot Backend
STAGE: implement
DATE_ISO: 2025-12-06
SURFACE: agent
MODEL: claude-sonnet-4-5-20250929
FEATURE: rag-chatbot-backend
BRANCH: 1-rag-chatbot-backend
USER: user
COMMAND: /sp.implement
LABELS: ["implementation", "rag-chatbot"]
LINKS:
  SPEC: specs/1-rag-chatbot-backend/spec.md
  TICKET: null
  ADR: null
  PR: null
FILES_YAML:
  - backend-chatbot/requirements.txt
  - backend-chatbot/.env.example
  - backend-chatbot/app/db.py
  - backend-chatbot/app/vector_db.py
  - backend-chatbot/scripts/ingest.py
  - backend-chatbot/app/services.py
  - backend-chatbot/app/models.py
  - backend-chatbot/app/routes.py
  - backend-chatbot/app/main.py
  - backend-chatbot/README.md
TESTS_YAML: []
---
### User Prompt:
```text
IMPLEMENT NOW.

Start outputting files one by one with full path and complete, runnable code.

Begin with:
1. requirements.txt
2. .env.example
3. app/db.py
4. app/vector_db.py
5. scripts/ingest.py
6. app/services.py
7. app/models.py
8. app/routes.py
9. app/main.py
10. README.md

At the end, provide the exact JavaScript code to add/replace in src/chatbot.js so it talks to http://localhost:8000/chat

Use gemini-1.5-flash and embedding-001 only. Make sure everything works on free tiers.

Begin implementation now.
```

### Assistant Response Summary:
The RAG Chatbot Backend has been fully implemented, including all required backend files, the  setup guide, and the frontend integration snippet for . The  file was also updated to include Python-specific ignore patterns.

---
