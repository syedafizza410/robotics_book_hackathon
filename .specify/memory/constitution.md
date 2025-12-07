<!--
Sync Impact Report:
Version change: 73e6921 Initial commit from Specify template → 1.0.0
List of modified principles: All principles modified/replaced
Added sections: RAG Chatbot Backend Principles, Governance
Removed sections: All previous book-related sections
Templates requiring updates:
- .specify/templates/plan-template.md: ⚠ pending (New component, requires review for alignment)
- .specify/templates/spec-template.md: ⚠ pending (New component, requires review for alignment)
- .specify/templates/tasks-template.md: ⚠ pending (New component, requires review for alignment)
- .specify/templates/commands/*.md: ✅ updated (Generic command files reviewed for agent-specific names)
Follow-up TODOs: None
-->
# Project Constitution

## Project Title: RAG Chatbot Backend for Docusaurus Book Site
Type: Backend Service

## Core Principles: RAG Chatbot Backend

### Principle 1: Gemini Integration
- **Name:** Google Gemini (free tier via Google AI Studio)
- **Rule:** The RAG chatbot backend MUST exclusively use Google Gemini, leveraging its free tier via Google AI Studio.
- **Rationale:** Ensures cost-free operation and adherence to specified AI service provider.

### Principle 2: Python SDK
- **Name:** google-generativeai Python SDK
- **Rule:** All interactions with Google Gemini MUST be implemented using the `google-generativeai` Python SDK.
- **Rationale:** Standardizes API communication and simplifies development with the chosen AI service.

### Principle 3: Embedding Model
- **Name:** models/embedding-001 (768 dimensions)
- **Rule:** The embedding model used for RAG MUST be `models/embedding-001` with 768 dimensions.
- **Rationale:** Ensures consistency in vector space and optimal performance with Qdrant.

### Principle 4: Generation Model
- **Name:** gemini-1.5-flash
- **Rule:** The generation model used for chatbot responses MUST be `gemini-1.5-flash`, adhering to its fast, free, and 1M tokens/day limit.
- **Rationale:** Prioritizes speed and cost-effectiveness while meeting daily usage limits.

### Principle 5: Backend Framework
- **Name:** FastAPI
- **Rule:** The RAG chatbot backend MUST be built using the FastAPI framework.
- **Rationale:** Leverages a modern, high-performance web framework suitable for API development.

### Principle 6: Vector Database
- **Name:** Qdrant Cloud Free Tier
- **Rule:** The vector database for storing embeddings MUST be Qdrant Cloud Free Tier.
- **Rationale:** Ensures a scalable and cost-free solution for vector similarity search.

### Principle 7: Metadata Database
- **Name:** Neon Serverless Postgres
- **Rule:** The metadata database for storing document information MUST be Neon Serverless Postgres.
- **Rationale:** Provides a cost-effective and serverless relational database solution.

### Principle 8: Book Content Location
- **Name:** ../docs/chapters/.md
- **Rule:** The chatbot MUST retrieve book content from the `../docs/chapters/.md` directory, relative to the backend-chatbot folder.
- **Rationale:** Defines the authoritative source for book content used in retrieval-augmented generation.

### Principle 9: Selected Text Only Mode
- **Name:** Selected Text Only Mode
- **Rule:** The chatbot MUST support a "selected text only" mode, where retrieval is bypassed if the user highlights text.
- **Rationale:** Provides flexibility for users to get direct answers without RAG if context is already provided.

### Principle 10: Code Location
- **Name:** /backend-chatbot folder
- **Rule:** All code for this RAG chatbot backend MUST reside within the `/backend-chatbot` folder.
- **Rationale:** Maintains project organization and separation of concerns within the repository.

### Principle 11: Environment Variables
- **Name:** Required Environment Variables
- **Rule:** The only environment variables required MUST be `GEMINI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`, and `DATABASE_URL`.
- **Rationale:** Simplifies deployment and configuration by minimizing necessary secrets/variables.

### Principle 12: Free Tier Operation
- **Name:** 100% Free to Run Forever
- **Rule:** The entire RAG chatbot backend solution MUST be 100% free to run forever on free tiers of all chosen services.
- **Rationale:** Primary overarching constraint ensuring long-term sustainability without operational costs.

### Principle 13: Full Working Code
- **Name:** Output Full Working Code
- **Rule:** All generated code MUST be full working code, with no placeholders.
- **Rationale:** Ensures immediate usability and reduces post-generation manual work.

## Governance

### Amendment Procedure
This constitution can be amended by consensus of the project architects. Proposed amendments must be reviewed against the core product promise and justified with clear rationale for any changes to principles or governance.

### Versioning Policy
Constitution versions will follow semantic versioning (MAJOR.MINOR.PATCH):
- **MAJOR:** Backward incompatible governance/principle removals or redefinitions.
- **MINOR:** New principle/section added or materially expanded guidance.
- **PATCH:** Clarifications, wording, typo fixes, non-semantic refinements.

### Compliance Review
Compliance with these principles will be reviewed regularly, especially during major architectural decisions, feature implementations, and deployment processes. Any deviations must be justified and approved by the project architects.

## Constitution Metadata

- **RATIFICATION_DATE:** 2025-12-06
- **LAST_AMENDED_DATE:** 2025-12-06
- **CONSTITUTION_VERSION:** 1.0.0
