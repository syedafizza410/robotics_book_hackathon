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

def generate_answer(contexts: list, question: str) -> str:
    context = "\n\n".join(contexts)
    prompt = f"""Answer using only this context:

{context}

Question: {question}
Answer:"""
    model = genai.GenerativeModel("gemini-2.0-flash")
    return model.generate_content(prompt).text

def answer_from_selected_text(selected_text: str, question: str) -> str:
    prompt = f"""Answer using ONLY this selected text:

{selected_text}

Question: {question}
Answer:"""
    model = genai.GenerativeModel("gemini-2.0-flash")
    return model.generate_content(prompt).text

def handle_chat_query(query: str, selected_text: str = None):
    if selected_text and selected_text.strip():
        return answer_from_selected_text(selected_text, query)
    else:
        contexts = get_relevant_chunks(query)
        if not contexts:
            return "Sorry, I couldn't find relevant information in the book."
        return generate_answer(contexts, query)