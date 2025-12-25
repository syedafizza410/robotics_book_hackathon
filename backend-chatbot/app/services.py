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

    except Exception:
        return None


def filter_chunks_by_question(contexts: list, question: str) -> list:
    q = question.lower()

    if "ros" in q:
        return [c for c in contexts if "ros" in c.lower()]

    if "control" in q or "pid" in q:
        return [c for c in contexts if "control" in c.lower()]

    if "kinematics" in q:
        return [c for c in contexts if "kinematics" in c.lower()]

    return contexts


def extract_sentences(text: str, max_sentences=2):
    text = re.sub(r"---.*?---", "", text, flags=re.DOTALL)
    text = re.sub(r"#.*", "", text)
    text = re.sub(r"\s+", " ", text).strip()

    sentences = re.split(r"(?<=[.!?])\s+", text)

    good = [
        s for s in sentences
        if len(s) > 40
        and not s.lower().startswith("learning outcomes")
        and not s.lower().startswith("figure")
    ]

    return good[:max_sentences]


def format_rag_response(contexts: list, question: str) -> str:
    filtered = filter_chunks_by_question(contexts, question)
    if not filtered:
        filtered = contexts[:1]

    bullets = []

    for ctx in filtered:
        sentences = extract_sentences(ctx)
        for s in sentences:
            bullets.append(s)
        if len(bullets) >= 3:
            break

    if not bullets and contexts:
        bullets.append(contexts[0][:200])

    response = []
    response.append(f"## 🤖 {question.capitalize()}\n")
    response.append("📘 **Relevant information from the book:**\n")

    for b in bullets[:3]:
        response.append(f"- {b}")

    response.append("\n📘 *Source: Robotics Physical AI Book (RAG fallback)*")
    return "\n".join(response)


def generate_answer_rag(contexts: list, question: str) -> str:
    return format_rag_response(contexts, question)


def handle_chat_query(query: str, selected_text: str = None):

    if selected_text and selected_text.strip():
        prompt = f"""
Use ONLY the selected text.
Answer clearly and briefly.

TEXT:
{selected_text}

QUESTION:
{query}
"""
        gemini_answer = safe_gemini_call(prompt)
        if gemini_answer:
            return gemini_answer

        contexts = get_relevant_chunks(query)
        return generate_answer_rag(contexts, query)

    contexts = get_relevant_chunks(query)
    if not contexts:
        return "Sorry, couldn't find relevant information in the book."

    prompt = f"""
Use ONLY the context below.
Answer clearly (max 150 words).

CONTEXT:
{'\n\n'.join(contexts)}

QUESTION:
{query}
"""
    gemini_answer = safe_gemini_call(prompt)
    if gemini_answer:
        return gemini_answer

    return generate_answer_rag(contexts, query)
