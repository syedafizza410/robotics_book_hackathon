import cohere
import google.generativeai as genai
import os
import re
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


def filter_chunks_by_question(contexts: list, question: str) -> list:
    q = question.lower()

    if "ros" in q:
        return [
            c for c in contexts
            if "ros" in c.lower() or "robot operating system" in c.lower()
        ]

    if "control" in q or "pid" in q:
        return [c for c in contexts if "control" in c.lower() or "pid" in c.lower()]

    if "kinematics" in q:
        return [c for c in contexts if "kinematics" in c.lower()]

    return contexts


def clean_chunk_text(text: str) -> str:
    lines = text.split("\n")
    clean_lines = []

    for line in lines:
        l = line.strip()

        if (
            l.startswith("---")
            or l.startswith("#")
            or "learning outcomes" in l.lower()
            or "introduction" in l.lower()
            or "summary" in l.lower()
            or "figure" in l.lower()
        ):
            continue

        if len(l) < 40:
            continue

        clean_lines.append(l)

    cleaned = " ".join(clean_lines)
    return cleaned[:350]


def format_rag_response(contexts: list, question: str) -> str:
    filtered = filter_chunks_by_question(contexts, question)

    if not filtered:
        filtered = contexts[:1]

    response = []
    response.append(f"## 🤖 {question.capitalize()}\n")
    response.append("📘 **Relevant information from the book:**\n")

    used = 0
    for ctx in filtered:
        cleaned = clean_chunk_text(ctx)
        if cleaned:
            response.append(f"- {cleaned}")
            used += 1
        if used == 3:
            break

    response.append("\n📘 *Source: Robotics Physical AI Book (RAG fallback)*")
    return "\n".join(response)


def generate_answer_rag(contexts: list, question: str) -> str:
    return format_rag_response(contexts, question)


def handle_chat_query(query: str, selected_text: str = None):

    if selected_text and selected_text.strip():
        prompt = f"""
You are a robotics book assistant.

RULES:
- Use ONLY the selected text
- Answer clearly and briefly
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
