# RAG Chatbot Backend for Docusaurus Book Site

This project provides a FastAPI backend for a Retrieval-Augmented Generation (RAG) chatbot, designed to answer questions based on the content of a Docusaurus book site. It utilizes Google Gemini for AI capabilities, Qdrant Cloud for vector storage, and Neon Serverless Postgres for metadata management, all configured to run on their respective free tiers.

## Features

-   **Chat Endpoint**: Accepts natural language queries and optional selected text to provide answers from the book content.
-   **Content Ingestion**: Recursively reads Markdown files, chunks them, embeds them, and stores them in vector and metadata databases.
-   **Health Check**: Basic endpoint to verify service operational status.
-   **CORS Support**: Configured for Docusaurus development environment (`http://localhost:3000`).

## Project Structure

```
backend-chatbot/
├── app/
│   ├── __init__.py
│   ├── main.py             # Main FastAPI application
│   ├── routes.py           # API endpoint definitions
│   ├── services.py         # Core RAG logic and Gemini integration
│   ├── models.py           # Pydantic models for request/response
│   ├── db.py               # SQLAlchemy for Neon Postgres (metadata)
│   └── vector_db.py        # Qdrant client (vector store)
├── scripts/
│   └── ingest.py           # Script for ingesting book content
├── tests/
│   └── test_chat.py        # Placeholder for tests
├── requirements.txt        # Python dependencies
├── .env.example            # Example environment variables
└── README.md
```

## Setup Instructions

Follow these steps to set up and run the RAG Chatbot Backend.

### 1. Clone the Repository (if you haven't already)

```bash
git clone <your-repository-url>
cd <your-repository-directory>/backend-chatbot
```

### 2. Set Up Environment Variables

Copy the example environment file and fill in your API keys and URLs. These services offer free tiers suitable for this project.

```bash
cp .env.example .env
```

Edit the newly created `.env` file with your credentials:

-   **`GEMINI_API_KEY`**: Obtain from [Google AI Studio](https://makersuite.google.com/)
-   **`QDRANT_URL`**: Obtain from [Qdrant Cloud](https://cloud.qdrant.io/) (Free Tier available)
-   **`QDRANT_API_KEY`**: Obtain from Qdrant Cloud
-   **`DATABASE_URL`**: Obtain from [Neon Serverless Postgres](https://neon.tech/) (Free Tier available). Example format: `postgresql://user:password@host/database_name`

Your `.env` file should look like this:

```
GEMINI_API_KEY="your_gemini_api_key_here"
QDRANT_URL="your_qdrant_url_here"
QDRANT_API_KEY="your_qdrant_api_key_here"
DATABASE_URL="postgresql://user:password@host/database_name"
```

### 3. Install Dependencies

Navigate to the `backend-chatbot` directory and install the required Python packages:

```bash
pip install -r requirements.txt
```

### 4. Run Database Migrations and Create Qdrant Collection

These will be automatically created on application startup. You can also manually run the ingestion script which initializes them.

### 5. Ingest Book Content

Before you can chat with your book, you need to ingest its content. Ensure your Docusaurus `docs` directory is located at `../docs` relative to the `backend-chatbot` folder.

```bash
python scripts/ingest.py
```

This script will recursively read all `.md` files, chunk them, create embeddings using Gemini, and store them in Qdrant and Neon Postgres.

### 6. Run the FastAPI Backend

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be accessible at `http://localhost:8000`.

## API Endpoints

-   **GET `/health`**
    -   Checks if the service is running.
    -   Response: `{"status": "ok"}`

-   **POST `/chat`**
    -   **Request Body**: `{"query": "Your question here", "selected_text": "Optional highlighted text"}`
    -   **Response**: `{"answer": "Generated answer", "sources": [{"text": "...", "source_file": "...", "chunk_id": "..."}]}`

-   **POST `/ingest`**
    -   Triggers the content ingestion process in the background.
    -   Response: `{"message": "Ingestion process started in the background."}`

## Frontend Integration (Example for Docusaurus)

To integrate this chatbot with your Docusaurus frontend, you might add a component to your `src/components` directory that interacts with these API endpoints.

(See Task 10 for the exact code snippet for `src/chatbot.js`)

## Development Notes

-   Ensure all services (Gemini, Qdrant, Neon) are configured for their free tiers to avoid costs.
-   Error handling and logging should be considered for production deployments.
-   The `../docs` path for book content is relative to the `backend-chatbot` directory. Adjust if your Docusaurus project structure is different.
