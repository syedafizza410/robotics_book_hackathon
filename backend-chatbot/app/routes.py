from fastapi import APIRouter, HTTPException, BackgroundTasks
from app.models import ChatRequest, ChatResponse
from app.services import handle_chat_query
from scripts.ingest import ingest

router = APIRouter()

@router.get("/health")
async def health_check():
    return {"status": "ok"}

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        answer = handle_chat_query(request.query, request.selected_text)
        return ChatResponse(answer=answer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ingest")
async def ingest_endpoint(background_tasks: BackgroundTasks):
    background_tasks.add_task(ingest)
    return {"message": "Ingestion process started in the background."}
