from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router
from app.db import create_db_and_tables
from app.vector_db import create_qdrant_collection

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://robotics-book-hackathon-5zn2.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.on_event("startup")
async def startup_event():
    create_db_and_tables()
    create_qdrant_collection()