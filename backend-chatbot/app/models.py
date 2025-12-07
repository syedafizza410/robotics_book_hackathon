from typing import List, Optional
from pydantic import BaseModel

class Source(BaseModel):
    text: str
    source_file: str
    chunk_id: str

class ChatRequest(BaseModel):
    query: str
    selected_text: Optional[str] = None

class ChatResponse(BaseModel):
    answer: str
    sources: Optional[List[Source]] = None
