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
    results = client.search(collection_name=COLLECTION_NAME, query_vector=emb, limit=top_k)
    ids = [r.id for r in results]
    session = SessionLocal()
    chunks = session.query(Chunk.text).filter(Chunk.id.in_(ids)).all()
    session.close()
    return [c[0] for c in chunks]

def safe_gemini_call(prompt: str):
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)

        if not response or not hasattr(response, "text") or response.text is None:
            return None

        return response.text

    except Exception as e:
        if "429" in str(e) or "TooManyRequests" in str(e):
            return None 
        return None  

def generate_answer_rag(contexts: list, question: str) -> str:
    context = "\n\n".join(contexts)
    return f"Based on the book content:\n{context}\nAnswer: {question}"

def handle_chat_query(query: str, selected_text: str = None):
    if selected_text and selected_text.strip():
        prompt = f"Answer using ONLY this selected text:\n\n{selected_text}\n\nQuestion: {query}\nAnswer:"
        gemini_answer = safe_gemini_call(prompt)
        if gemini_answer:
            return gemini_answer

        contexts = get_relevant_chunks(query)
        if contexts:
            return generate_answer_rag(contexts, query)
        return "Sorry, no relevant info found in the book."

    contexts = get_relevant_chunks(query)
    if not contexts:
        return "Sorry, couldn't find relevant info in the book."

    prompt = f"Answer using only this context:\n\n{'\n\n'.join(contexts)}\n\nQuestion: {query}\nAnswer:"
    gemini_answer = safe_gemini_call(prompt)
    if gemini_answer:
        return gemini_answer

    return generate_answer_rag(contexts, query)
