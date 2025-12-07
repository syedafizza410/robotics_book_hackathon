# scripts/ingest.py — 100% FINAL — NO MORE ERRORS

import os
import cohere
import uuid
from app.db import SessionLocal, Chunk, create_db_and_tables
from app.vector_db import client, COLLECTION_NAME
from qdrant_client.http.models import Distance, VectorParams
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()
co = cohere.Client(os.getenv("COHERE_API_KEY"))

def chunk_text(text, size=800):
    words = text.split()
    return [" ".join(words[i:i + size]) for i in range(0, len(words), size - 100)]

def recreate_collection_force():
    """Force delete old collection + create new 1024 dim for Cohere"""
    try:
        # Step 1: Delete collection agar exist kare (koi bhi dimension ho)
        try:
            client.delete_collection(COLLECTION_NAME)
            print(f"Old collection '{COLLECTION_NAME}' DELETED successfully!")
        except:
            print(f"No collection found or already deleted")

        # Step 2: Naya 1024 dim collection banao
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=1024, distance=Distance.COSINE),
        )
        print(f"NEW COLLECTION '{COLLECTION_NAME}' CREATED — 1024 DIM (COHERE PERFECT!)")

    except Exception as e:
        print(f"Critical error in collection setup: {e}")
        raise

def ingest():
    create_db_and_tables()
    recreate_collection_force()   # ← YEH LINE AB SAB KUCH FIX KAR DEGI

    session = SessionLocal()
    docs_dir = Path(__file__).parent.parent.parent / "docs"

    print(f"\nLoading book from: {docs_dir}\n")

    for md_file in docs_dir.rglob("*.md"):
        if md_file.name.startswith("_"): 
            continue
        print(f"Processing → {md_file.name}")
        content = md_file.read_text(encoding="utf-8")
        chunks = chunk_text(content)
        if not chunks: 
            continue

        response = co.embed(
            texts=chunks,
            model="embed-english-v3.0",
            input_type="search_document"
        )
        embeddings = response.embeddings

        for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
            point_id = str(uuid.uuid4())
            client.upsert(
                collection_name=COLLECTION_NAME,
                points=[{
                    "id": point_id,
                    "vector": embedding,
                    "payload": {"file": md_file.name, "chunk": i}
                }]
            )
            session.add(Chunk(id=point_id, text=chunk, source_file=str(md_file), chunk_id=i))

    session.commit()
    session.close()
    print("\nCOHERE + QDRANT 1024 DIM — INGESTION 100% COMPLETE!")
    print("Gemini sirf generation ke liye ready")
    print("Ab chalao → uvicorn app.main:app --reload\n")

if __name__ == "__main__":
    ingest()