from fastapi import APIRouter, HTTPException, BackgroundTasks
from app.models import ChatRequest, ChatResponse, Source
from app.services import handle_chat_query, get_relevant_chunks
from scripts.ingest import ingest

router = APIRouter()

@router.get("/health")
async def health_check():
    return {"status": "ok"}

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        answer = handle_chat_query(request.query, request.selected_text)

        # Agar AI quota exceed hua, but fallback available
        if answer == "QUOTA_ERROR":
            sources = []
            if request.selected_text and request.selected_text.strip():
                # Fallback: selected text
                sources.append(Source(
                    text=request.selected_text,
                    source_file="Selected Text",
                    chunk_id="0"
                ))
            else:
                # Fallback: RAG chunks
                chunks = get_relevant_chunks(request.query)
                for i, c in enumerate(chunks):
                    sources.append(Source(
                        text=c,
                        source_file="Book Chunk",
                        chunk_id=str(i)
                    ))

            return ChatResponse(
                answer="⚠️ AI API quota exceeded. Showing relevant info instead.",
                sources=sources
            )

        # Normal answer with no quota issues
        return ChatResponse(answer=answer)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Backend error: {str(e)}")


@router.post("/ingest")
async def ingest_endpoint(background_tasks: BackgroundTasks):
    background_tasks.add_task(ingest)
    return {"message": "Ingestion process started in the background."}
