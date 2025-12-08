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

        if "quota exceeded" in answer.lower():
            return ChatResponse(
                answer="⚠️ API quota exceeded. Please try again after daily reset."
            )

        return ChatResponse(answer=answer)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Backend error: {str(e)}")

@router.post("/ingest")
async def ingest_endpoint(background_tasks: BackgroundTasks):
    background_tasks.add_task(ingest)
    return {"message": "Ingestion process started in the background."}
