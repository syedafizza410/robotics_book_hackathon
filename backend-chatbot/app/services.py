import cohere
import google.generativeai as genai
import os
from dotenv import load_dotenv
from app.db import SessionLocal, Chunk
from app.vector_db import client, COLLECTION_NAME

load_dotenv()

co = cohere.Client(os.getenv("COHERE_API_KEY"))
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def get_query_embedding(query: str):
    response = co.embed(
        texts=[query],
        model="embed-english-v3.0",
        input_type="search_query"
    )
    return response.embeddings[0]


def get_relevant_chunks(query: str, top_k=5):
    emb = get_query_embedding(query)
    results = client.search(
        collection_name=COLLECTION_NAME,
        query_vector=emb,
        limit=top_k
    )

    ids = [r.id for r in results]

    session = SessionLocal()
    chunks = session.query(Chunk.text).filter(Chunk.id.in_(ids)).all()
    session.close()

    return [c[0] for c in chunks]

def safe_gemini_call(prompt: str):
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)

        if not response or not hasattr(response, "text") or not response.text:
            return None

        return response.text.strip()

    except Exception as e:
        if "429" in str(e) or "TooManyRequests" in str(e):
            return None
        return None

def format_rag_response(contexts: list, question: str) -> str:
    response = []
    response.append(f"## 🤖 {question}\n")
    response.append("📘 **Relevant information from the book:**\n")

    for i, ctx in enumerate(contexts[:3], start=1):
        text = ctx.strip()

        if len(text) > 500:
            text = text[:500] + "..."

        response.append(f"### 🔹 Reference {i}\n{text}\n")

    response.append(
        "💡 *This answer is shown directly from the book because the AI service is temporarily unavailable.*"
    )

    return "\n".join(response)


def generate_answer_rag(contexts: list, question: str) -> str:
    return format_rag_response(contexts, question)


def handle_chat_query(query: str, selected_text: str = None):

    if selected_text and selected_text.strip():
        prompt = f"""
You are a robotics book assistant.

RULES:
- Use ONLY the selected text
- Give a clear and concise answer
- Use bullet points if helpful
- Max 120 words

SELECTED TEXT:
{selected_text}

QUESTION:
{query}

ANSWER:
"""
        gemini_answer = safe_gemini_call(prompt)
        if gemini_answer:
            return gemini_answer

        contexts = get_relevant_chunks(query)
        if contexts:
            return generate_answer_rag(contexts, query)

        return "Sorry, no relevant information found in the book."

    contexts = get_relevant_chunks(query)
    if not contexts:
        return "Sorry, couldn't find relevant information in the book."

    prompt = f"""
You are a robotics book assistant.

RULES:
- Use ONLY the provided context
- Do NOT dump the full chapter
- Give a short, well-structured answer
- Use Markdown
- Max 150 words

CONTEXT:
{'\n\n'.join(contexts)}

QUESTION:
{query}

ANSWER:
"""
    gemini_answer = safe_gemini_call(prompt)
    if gemini_answer:
        return gemini_answer

    return generate_answer_rag(contexts, query)
